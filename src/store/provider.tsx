import React, { useCallback, useReducer } from 'react';
import context from './context';
import init from './init';
import  { Iinit, IrData } from './types';

const Provider_ = context.Provider;
const RENDER_DATA_LIMIT = 30;
let LAST_DATA: unknown;

type Iaction = {
	type: 'data' | 'config';
	payload: Record<string, unknown>;
};

type IReducer = React.Reducer<Iinit, Iaction>;

export function Provider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const reducers: IReducer = useCallback(function (state: Iinit, action: Iaction): Iinit {
		const { type, payload } = action;
		switch (type) {
			default:
				return state;
			case 'data':
				const _data = state.renderData;
				let length = _data?.length || 0;
				const updateData: IrData = {
					data: {
						...state?.renderData?.data,
						...payload,
					},
				};
				if (_data) {
					_data.next = updateData;
					updateData.prev = _data;
					length++;
				} else if (!_data) {
					LAST_DATA = updateData;
					length = 1;
				}

				if (length > RENDER_DATA_LIMIT && LAST_DATA) {
					length--;
					// @ts-ignore
					if(LAST_DATA.prev) LAST_DATA.prev.next = undefined;
				}

				updateData.length = length;

				return {
					...state,
					renderData: updateData,
				};

			case 'config':
				if (state.type === 'phone') {
					return {
						...state,
						phoneConfig: {
							...state.phoneConfig,
							...payload,
						},
					};
				} else {
					return {
						...state,
						desktopConfig: {
							...state.desktopConfig,
							...payload,
						},
					};
				}
		}
	}, []);

	const [state, dispatch] = useReducer<IReducer>(reducers, init);

	return (
		<div>
			<Provider_ value={{ state, dispatch }}>{props.children}</Provider_>
		</div>
	);
}
