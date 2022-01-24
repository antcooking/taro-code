import { Iinit, Iaction, IReducer } from '../types';

const reducers: IReducer = function (state: Iinit, action: Iaction): any {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
    
    case 'data-update':
      const originRender = state.render;

      if (payload?.['mode']) { 
        originRender.mode = payload['mode']
        delete payload['mode']
      }

      originRender.data = {
        ...originRender.data,
        ...payload,
      };

      return {
        ...state,
        render: originRender,
      };
  }
}

export default reducers