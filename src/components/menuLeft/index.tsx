import { useContext, useCallback } from 'react';
import { Tabs } from 'antd';
import context from '../../store/context';
import { dragContext } from '../../utils/drag';
import { baseComponents } from '../../config/baseComponents';
import './index.less';

const TabPane = Tabs.TabPane;
const preCls = 'cookCode-menu-left';

export default function MenuLeft() {
	const { setDragData, dragData } = useContext(dragContext);

	const DragStart = useCallback(
		function (e, item) {
			e.stopPropagation();
			item.id = new Date().getTime();
			setDragData({
				actionData: item,
			});
		},
		[dragData, setDragData]
	);

	return (
		<div className={`${preCls}`}>
			<Tabs tabPosition="left">
				<TabPane tab="基础组件" key="1">
					<div className={`${preCls}-compbox`}>
						{baseComponents.map((item, index) => (
							<div
								className={`${preCls}-common-component`}
								key={item.type + index}
								draggable
								onDragStart={(e) => DragStart(e, item)}
							>
								{item.icon}
								<div className="text">{item.name}</div>
							</div>
						))}
					</div>
				</TabPane>
			</Tabs>
		</div>
	);
}
