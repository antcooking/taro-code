import { useCallback, useContext, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button, Drawer, message, Tabs } from 'antd';
import context from '../../store/context';
import { createCode } from '../../utils/codor';
import { CopyOutlined } from '@ant-design/icons';
import './index.less';

const preCls = 'cookCode-header';
const TabPane = Tabs.TabPane;

export default function Header() {
	const { state } = useContext(context);
	const [visible, setVisible] = useState(false);
	const [jsCode, setJsCode] = useState('');
	const [lessCode, setLessCode] = useState('');
	const [defaultActiveKey, setdefaultActiveKey] = useState('1');

	const showCode = useCallback(
		function () {
			setVisible(true);
			const res = createCode(state.render.data);
			setJsCode(res.jsCode);
			setLessCode(res.lessCode);
		},
		[state.render.data]
	);

	const copyAction = useCallback(
		function () {
			copyToClipboard(defaultActiveKey === '1' ? jsCode : lessCode);
			message.success('复制成功');
		},
		[defaultActiveKey, jsCode, lessCode]
	);

	return (
		<div className={`${preCls}`}>
			<div className={`${preCls}-title`}>CookCode</div>
			<div
				className={`${preCls}-tools`}
				style={state.render.mode === 'preview' ? { display: 'none' } : {}}
			>
				<Button style={{ marginRight: 120 }} onClick={showCode}>
					输出代码
				</Button>
			</div>
			<Drawer
				className="code-drawer"
				visible={visible}
				onClose={() => setVisible(false)}
				title="输出代码"
				width={900}
			>
				<Tabs activeKey={defaultActiveKey} onChange={(key) => setdefaultActiveKey(key)}>
					<TabPane tab="js代码" key="1" />
					<TabPane tab="less代码" key="2" />
				</Tabs>
				<div className="code-box">
					<CopyOutlined onClick={copyAction} className="copyBtn" />
					<CodeEditor
						disabled
						value={defaultActiveKey === '1' ? jsCode : lessCode}
						language={defaultActiveKey === '1' ? 'jsx' : 'css'}
						placeholder="wait code"
						padding={15}
						style={{
							fontSize: 12,
							backgroundColor: '#f5f5f5',
							fontFamily:
								'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
						}}
					/>
				</div>
			</Drawer>
		</div>
	);
}

function copyToClipboard(str: string) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);

	const selection = document.getSelection();

	if (!selection) {
		return;
	}

	const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);

	if (selected) {
		selection.removeAllRanges();
		selection.addRange(selected);
	}
}
