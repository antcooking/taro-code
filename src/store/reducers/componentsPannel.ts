import { Iinit, Iaction, IReducer } from '../types';

const reducers: IReducer = function (state: Iinit, action: Iaction): Iinit {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };

    case 'components-pannel':

      state.componentsPannel = payload as any

      return { ...state };
  }
}

export default reducers