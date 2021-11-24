import { useContext } from 'react';
import context from '../../store/context';
import './index.less';

const preCls = 'cookCode-container';

export default function Container() {

	// const [ state, dispatch ] = useContext(context)

	console.info(useContext(context))
	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-main`}>
				<div className={`${preCls}-phone`}></div>
			</div>
		</div>
	);
}
