import { useContext, useMemo } from 'react';
import context from '../../store/context';
import DataRender from '../dataRender';
import { ExpandOutlined, CompressOutlined, SaveOutlined } from '@ant-design/icons';
import './index.less';
import { message } from 'antd';

const preCls = 'cookCode-container';
const VIEW_SCALE = 1;

export default function Container() {
	const { state, dispatch } = useContext(context);

	const phoneStyle = useMemo(
		function () {
			const scaleLast = VIEW_SCALE * state.phoneConfig.scale;
			return {
				style: {
					width: state.phoneConfig.width,
					minHeight: state.phoneConfig.minHeight,
					transform: `scale(${scaleLast})`,
				},
			};
		},
		[state]
	);

	const saveDraft = function () {
		localStorage.setItem('DRAFT_DATA', JSON.stringify(state.render.data));
		message.success('保存成功');
	};

	const switchMode = function () {
		const mode = state.render.mode === 'edite' ? 'preview' : 'edite';
		if (mode) {
			setMainActive();
		}
		dispatch({
			type: 'data-update',
			payload: {
				mode,
			},
		});
	};

	const setMainActive = function (e?: any) {
		if (e) e.stopPropagation();
		dispatch({
			type: 'featurePannel-update',
			payload: {
				activePath: [],
				type: '',
			},
		});
	};

	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-main`} onClick={setMainActive}>
				<div className={`${preCls}-phone`} {...phoneStyle}>
					{DataRender({ state, dispatch })}
				</div>
			</div>
			<div className={`${preCls}-button-groups`}>
				<div className="button-item" onClick={switchMode}>
					{state.render.mode === 'edite' ? <ExpandOutlined /> : <CompressOutlined />}
				</div>
				<div className="button-item" onClick={saveDraft}>
					<SaveOutlined />
				</div>
			</div>
		</div>
	);
}
