import { useContext, useMemo } from 'react';
import context from '../../store/context';
import DataRender from '../dataRender';
import './index.less';

const preCls = 'cookCode-container';
const VIEW_SCALE = 0.66

export default function Container() {

  const { state, dispatch } = useContext(context)

  const phoneStyle = useMemo(function () {
    const scaleLast = VIEW_SCALE * state.phoneConfig.scale
    return {
      style: {
        width: state.phoneConfig.width,
        height: state.phoneConfig.height,
        transform: `scale(${scaleLast})`
      }
    }
  }, [state])

  return (
    <div className={`${preCls}`}>
      <div className={`${preCls}-main`}>
        <div
          className={`${preCls}-phone`}
          role={'Dustbin'}
          {...phoneStyle}
        >
          {DataRender({ state, dispatch })}
        </div>
      </div>
    </div>
  );
}
