import { useCallback, useContext } from 'react';
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'; 
import context from '../../store/context';
import './index.less';

const preCls = 'cookCode-header';

export default function Header() {
	const  { dispatch, state } = useContext(context)

	const scaleBig = useCallback(function() {
		const { phoneConfig: { scale } } = state
		dispatch({
			type: 'config',
			payload: {
				scale: scale + 0.1
			}
		})
	}, [state])

	const scaleminus = useCallback(function() {
		const { phoneConfig: { scale } } = state
		dispatch({
			type: 'config',
			payload: {
				scale: scale - 0.1
			}
		})
	}, [state])

	const goNext = useCallback(function() {
		dispatch({ type: 'data-next' })
	}, [])

	const goprev = useCallback(function() {
		dispatch({ type: 'data-prev' })
	}, [])

	console.info(state, '((state))')


	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-title`}>CookCode</div>
			<div className={`${preCls}-tools`}>
				<LeftCircleOutlined 
					className={`${preCls}-goprev`}
					onClick={goprev}
				/>
				<RightCircleOutlined 
					className={`${preCls}-gonext`} 
					onClick={goNext}
				/>
				<PlusCircleOutlined 
					className={`${preCls}-scalebig`}
					onClick={scaleBig}
				/>
				<div className={`${preCls}-scale`}>
					{(state.phoneConfig.scale * 100).toFixed(0)}%
				</div>
				<MinusCircleOutlined  
					className={`${preCls}-scaleminus`}
					onClick={scaleminus}
				/>
			</div>
		</div>
	);
}
