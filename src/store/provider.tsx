import React, { useCallback, useReducer } from 'react';
import context from './context';
import init from './init';
import { Iinit, Iaction, IReducer, IrData } from './types';

const Provider_ = context.Provider;
const RENDER_DATA_LIMIT = 100;

export function Provider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const reducers: IReducer = useCallback(function (state: Iinit, action: Iaction): Iinit {
		const { type, payload } = action;
		switch (type) {
			default:
				return state;
			// case 'data-next':
			case 'data-prev':
				if (state.render.dataHistory.length && state.render.histroyIndex <= state.render.dataHistory.length - 1) {
					const originRender = {
						...state.render,
						histroyIndex: state.render.histroyIndex + 1,
						data: state.render.dataHistory[state.render.histroyIndex + 1] as IrData
					};

					return {
						...state,
						render: originRender,
					};
				}

				return {
					...state,
				};

			case 'data-next':
				if (state.render.histroyIndex !== 0) {
					const originRender = {
						...state.render,
						histroyIndex: state.render.histroyIndex - 1,
						data: state.render.dataHistory[state.render.histroyIndex - 1] as IrData
					};

					return {
						...state,
						render: originRender,
					};
				}

				return {
					...state,
				};

			case 'data-update':
				const originRender = state.render;

				originRender.data = JSON.parse(JSON.stringify({
					...originRender.data,
					...payload,
				}));

				if (originRender.dataHistory.length >= RENDER_DATA_LIMIT) {
					originRender.dataHistory.splice(0, originRender.dataHistory.length - 10)
				}

				if (state.render.histroyIndex !== 0) {
					originRender.dataHistory = originRender.dataHistory.slice(state.render.histroyIndex);
					originRender.histroyIndex = 0
				}
				// @ts-ignore
				originRender.dataHistory.unshift({ ...originRender.data });

				return {
					...state,
					render: originRender,
				};

			case 'config':
				if (state.type === 'phone') {
					return {
						...state,
						phoneConfig: {
							...state.phoneConfig,
							...payload,
						} as {
							width: number;
							height: number;
							scale: number;
						} & Record<string, unknown>,
					};
				} else {
					return {
						...state,
						desktopConfig: {
							...state.desktopConfig,
							...payload,
						} as {
							width: number;
							height: number;
							scale: number;
						} & Record<string, unknown>,
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
