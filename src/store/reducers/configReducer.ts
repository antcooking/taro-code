import { Iinit, Iaction, IReducer } from '../types';

const reducers: IReducer = function (state: Iinit, action: Iaction): Iinit {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };

    case 'config':
      if (state.type === 'phone') {
        return {
          ...state,
          phoneConfig: {
            ...state.phoneConfig,
            ...payload,
          } as {
            width: number;
            minHeight: number;
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
}

export default reducers