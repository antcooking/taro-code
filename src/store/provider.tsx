import React, { useReducer } from 'react';
import context from './context';
import init from './init';
import { IReducer } from './types';
import combineReducers from './combineReducers';
import componentsPannel from './reducers/componentsPannel';
import dataReducer from './reducers/dataReducer';
import featureReducer from './reducers/featureReducer';

const Provider_ = context.Provider;

export function Provider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const reducers: IReducer = combineReducers([componentsPannel, dataReducer, featureReducer]);

	const [state, dispatch] = useReducer<IReducer>(reducers, init);

	// console.info(state.render.data, 'state');

	return <Provider_ value={{ state: state, dispatch }}>{props.children}</Provider_>;
}
