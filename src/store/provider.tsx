import React, { useReducer } from 'react';
import context from './context';
import init from './init';
import { IReducer } from './types';
import deepCopy from '../utils/deepcopy';
import combineReducers from './combineReducers';
import configReducer from './reducers/configReducer';
import dataReducer from './reducers/dataReducer';
import featureReducer from './reducers/featureReducer';

const Provider_ = context.Provider;

export function Provider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const reducers: IReducer = combineReducers([configReducer, dataReducer, featureReducer]);

	const [state, dispatch] = useReducer<IReducer>(reducers, init);

	// console.info(state);

	return <Provider_ value={{ state: deepCopy(state), dispatch }}>{props.children}</Provider_>;
}
