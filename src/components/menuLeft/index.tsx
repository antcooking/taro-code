import DragBox from '../dragBox';
import { Tabs } from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;

const preCls = 'cookCode-menu-left';

const baseList = [
	{
		type: 'div',
		style: {
			border: '1px solid #333',
			height: 60,
			width: 240,
		}
	},
	{
		type: 'text',
	},
	{
		type: 'image',
	},
]

export default function MenuLeft() {

	return <div className={`${preCls}`}>
		<Tabs tabPosition="left">
			<TabPane tab="基础组件" key="1">
				<div className={`${preCls}-compbox`}>
					{baseList.map((item, index) => (
						<DragBox
							className={`${preCls}-common-component`}
							data={item}
							key={item.type + index}
						>
							{item.type}
						</DragBox>
					))}
				</div>
			</TabPane>
		</Tabs>
	</div>;
}
