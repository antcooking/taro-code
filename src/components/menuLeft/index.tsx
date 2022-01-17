import { useContext, useCallback } from 'react';
import { Tabs } from 'antd';
import { dragContext } from '../../utils/drag';
import './index.less';
import context from '../../store/context';
import deepCopy from '../../utils/deepcopy';

const TabPane = Tabs.TabPane;
const preCls = 'cookCode-menu-left';

export default function MenuLeft() {
	const { setDragData, dragData } = useContext(dragContext);
	const {
		dispatch,
		state: { componentsPannel },
	} = useContext(context);

	const DragStart = useCallback(
		function (e, item) {
			e.stopPropagation();
			const actionData = deepCopy(item);
			actionData.id = new Date().getTime();
			delete actionData.featurePannel;
			setDragData({
				actionData,
			});
			dispatch({
				type: 'featurePannel-update',
				payload: {
					activePath: [],
					type: '',
				},
			});
		},
		[dragData, setDragData]
	);

	const onDragEnd = function () {
		setDragData();
	};

	return (
		<div className={`${preCls}`}>
			<Tabs tabPosition="left">
				{componentsPannel.map((item: any, index) => (
					<TabPane tab={item['name']} key={`componentsPannel${index}`}>
						<div className={`${preCls}-compbox`}>
							{item.data.map((it: any, inx: number) => (
								<div
									key={`componentsPannelXX${inx}`}
									className={`${preCls}-common-component`}
									draggable
									onDragStart={(e) => DragStart(e, it)}
									onDragEnd={onDragEnd}
								>
									<img src={it.icon} draggable={false} />
									<div className="text">{it.name}</div>
								</div>
							))}
						</div>
					</TabPane>
				))}
			</Tabs>
		</div>
	);
}
