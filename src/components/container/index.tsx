import { useCallback, useContext, useMemo } from 'react';
import context from '../../store/context';
import DataRender from '../dataRender';
import { Button } from 'antd'
import './index.less';

const preCls = 'cookCode-container';
const VIEW_SCALE = 0.9

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

  const saveDraft = function () { 
    localStorage.setItem('DRAFT_DATA', JSON.stringify(state.render.data.data))
  }

  const switchMode = useCallback(function () { 
    dispatch({
      type: 'config-mode',
    })
  }, [dispatch])

  const setMainActive = function () { 
    dispatch({
      type: 'featurePannel-update',
      payload: {
        config: {
          avtivePath: null,
          renderData: null,
        }
      }
    }) 
  }

  return (
    <div className={`${preCls}`}>
      <div className={`${preCls}-main`} onClick={setMainActive}>
        <div
          className={`${preCls}-phone`}
          {...phoneStyle}
        >
          {DataRender({ state, dispatch })}
        </div>
      </div>
      <div className={`${preCls}-button-groups`}>
       <Button
          className='button-item'
          onClick={switchMode}
        >
          预览
        </Button>
        <Button
          className='button-item'
          onClick={saveDraft}
        >
          保存草稿
        </Button>
        </div>
    </div>
  );
}
