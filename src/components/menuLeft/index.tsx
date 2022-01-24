import { useContext, useCallback, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { dragContext } from '../../utils/drag';
import './index.less';
import context from '../../store/context';
import deepCopy from '../../utils/deepcopy';
import 'react-contexify/dist/ReactContexify.min.css';
import { Link } from 'react-router-dom';

const TabPane = Tabs.TabPane;
const preCls = 'cookCode-menu-left';

export default function MenuLeft() {
	const { setDragData, dragData } = useContext(dragContext);
	const [activeKey, setActiveKey] = useState('1');
	const {
		dispatch,
		state: { componentsPannel },
	} = useContext(context);

	useEffect(function () {
		const COMP_PANNEL: any = localStorage.getItem('COMP_PANNEL');
		if (COMP_PANNEL) {
			dispatch({
				type: 'components-pannel',
				payload: JSON.parse(COMP_PANNEL),
			});
		}
	}, []);

	const onmouseDown = useCallback(
		function (e, item) {
			e.stopPropagation();
			const actionData = deepCopy(item);

			document.onmousemove = function (ev) {
				ev.stopPropagation();
				if (dragData.mouseMark?.show) return;
				actionData.id = new Date().getTime();
				delete actionData.featurePannel;
				setDragData({
					actionData,
					mouseMark: {
						icon: item.icon,
						left: e.clientX,
						top: e.clientY,
						show: true,
					},
				});

				document.onmousemove = null;

				dispatch({
					type: 'featurePannel-update',
					payload: {
						activePath: [],
						type: '',
					},
				});
			};

			document.onmouseup = function () {
				document.onmousemove = null;
				setDragData({
					mouseMark: undefined,
				});
			};
		},
		[dragData, setDragData]
	);

	return (
		<div className={`${preCls}`}>
			<Tabs tabPosition="left" activeKey={activeKey} onChange={(v) => setActiveKey(v)}>
				{componentsPannel.map((item: any, index) => (
					<TabPane tab={item['name']} key={`${index}`}>
						<div className={`${preCls}-compbox`}>
							{item.data.map((it: any, inx: number) => (
								<div
									key={`componentsPannelXX${inx}`}
									className={`${preCls}-common-component`}
									draggable={false}
									onMouseDown={(e) => onmouseDown(e, it)}
								>
									<img src={it.icon} draggable={false} />
									<div className="text">{it.name}</div>
								</div>
							))}
						</div>
					</TabPane>
				))}
			</Tabs>
			<Link to="/comonents-manage">
				<svg className="manage-icon" viewBox="0 0 1024 1024" p-id="1926" width="30" height="30">
					<path
						d="M192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192z m0-64h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32H192z m0-64h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96H192a96 96 0 0 1-96-96v-192a96 96 0 0 1 96-96zM640 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32h-192z m0-64h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96h-192a96 96 0 0 1-96-96v-192a96 96 0 0 1 96-96zM602.272 266.272a32 32 0 0 0 0 45.28l112 112a32 32 0 0 0 45.28 0l112-112a32 32 0 0 0 0-45.28l-112-112a32 32 0 0 0-45.28 0l-112 112z m-45.248-45.248l112-112a96 96 0 0 1 135.776 0l112 112a96 96 0 0 1 0 135.776l-112 112a96 96 0 0 1-135.776 0l-112-112a96 96 0 0 1 0-135.776z"
						p-id="1927"
						fill="#3a2291"
					></path>
				</svg>
			</Link>
		</div>
	);
}
