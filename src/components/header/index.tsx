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
	const { dispatch, state } = useContext(context);

	const scaleBig = useCallback(
		function () {
			const {
				phoneConfig: { scale },
			} = state;
			dispatch({
				type: 'config',
				payload: {
					scale: scale + 0.1,
				},
			});
		},
		[state]
	);

	const scaleminus = useCallback(
		function () {
			const {
				phoneConfig: { scale },
			} = state;
			dispatch({
				type: 'config',
				payload: {
					scale: scale - 0.1,
				},
			});
		},
		[state]
	);

	const goNext = useCallback(function () {
		dispatch({ type: 'data-next' });
	}, []);

	const goprev = useCallback(function () {
		dispatch({ type: 'data-prev' });
	}, []);

	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-title`}>CookCode</div>
			<div
				className={`${preCls}-tools`}
				style={state.render.mode === 'preview' ? { display: 'none' } : {}}
			>
				<LeftCircleOutlined className={`${preCls}-goprev`} onClick={goprev} />
				<RightCircleOutlined className={`${preCls}-gonext`} onClick={goNext} />
			</div>
		</div>
	);
}
