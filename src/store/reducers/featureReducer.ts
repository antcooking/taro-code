import { Iinit, Iaction, IReducer } from '../types';

const reducers: IReducer = function (state: Iinit, action: Iaction): Iinit {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };

    case 'featurePannel-update':
      return {
        ...state,
        // @ts-ignore
        featurePannel: {
          ...state.featurePannel,
          ...payload,
        },
      };
  }
}

export default reducers