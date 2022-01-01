import { useContext } from 'react'
import context from '../../store/context';
import './index.less';

const preCls = 'cookCode-feature-pannel';

export default function MenuLeft() {

	const { dispatch, state } = useContext(context)

  const commonAction = function (item:any) {
    const data = state.render.data.data
    item.id = new Date().getTime()
    data.push(item)
    dispatch({
      type: 'data-update',
      payload: {
        data
      }
    })
  }

	return <div className={`${preCls}`}>

	</div>
}
