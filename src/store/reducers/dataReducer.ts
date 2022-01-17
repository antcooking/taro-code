import { Iinit, Iaction, IReducer, IrData } from '../types';

const reducers: IReducer = function (state: Iinit, action: Iaction): any {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
    case 'data-prev':
      if (state.render.dataHistory.length && state.render.histroyIndex <= state.render.dataHistory.length - 1) {
        state.render = {
          ...state.render,
          histroyIndex: state.render.histroyIndex + 1,
          data: state.render.dataHistory[state.render.histroyIndex + 1] as IrData
        };

        return {
          ...state,
        };
      }

      return {
        ...state,
      };

    case 'data-next':
      if (state.render.histroyIndex !== 0) {
        state.render = {
          ...state.render,
          histroyIndex: state.render.histroyIndex - 1,
          data: state.render.dataHistory[state.render.histroyIndex - 1] as IrData
        };

        return {
          ...state,
        };
      }

      return {
        ...state,
      };

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