import { useContext } from 'react';
import context from '../../store/context';
import './index.less';

const preCls = 'cookCode-header';

export default function Header() {
	const { state } = useContext(context);

	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-title`}>CookCode</div>
			<div
				className={`${preCls}-tools`}
				style={state.render.mode === 'preview' ? { display: 'none' } : {}}
			>
				{/* <LeftCircleOutlined className={`${preCls}-goprev`} onClick={goprev} />
				<RightCircleOutlined className={`${preCls}-gonext`} onClick={goNext} /> */}
			</div>
		</div>
	);
}
