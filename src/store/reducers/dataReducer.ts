import { Iinit, Iaction, IReducer, IrData } from '../types';
import deepCopy from '../../utils/deepcopy'
const RENDER_DATA_LIMIT = 100;

const reducers: IReducer = function (state: Iinit, action: Iaction): any {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
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

      originRender.data = {
        ...originRender.data,
        ...payload,
      };

      if (originRender.dataHistory.length >= RENDER_DATA_LIMIT) {
        originRender.dataHistory.splice(0, originRender.dataHistory.length - 10)
      }

      originRender.histroyIndex = 0
      // @ts-ignore
      originRender.dataHistory.unshift(deepCopy(originRender.data));

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
}

export default reducers