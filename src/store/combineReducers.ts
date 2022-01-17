import deepCopy from '../utils/deepcopy';
import { Iaction, IReducer, Iinit } from './types';

export default function (reducers: Array<IReducer>) { 
  return function (state: Iinit, action: Iaction) { 
    let newState: Iinit = deepCopy(state)
    Object.keys(reducers).forEach(key => { 
      // @ts-ignore
      newState = reducers[key as any](state, action)
    })

    return newState
  }
}