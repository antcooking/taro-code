import { useContext } from 'react'
import { Tabs } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import deepCopy from '../../utils/deepcopy';
import context from '../../store/context';
import './index.less';

const TabPane = Tabs.TabPane;

const preCls = 'cookCode-menu-left';

const baseList = [
	{
		type: 'div',
		style: {
			minHeight: 60,
			width: '100%',
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

	const { dispatch, state } = useContext(context)

  const commonAction = function (item:any) {
    const data = state.render.data.data
    item.id = new Date().getTime()
    data.push(item)
    dispatch({
      type: 'data-update',
      payload: {
        data
      }
    })
  }

	return <div className={`${preCls}`}>
		<Tabs tabPosition="left">
			<TabPane tab="基础组件" key="1">
				<div className={`${preCls}-compbox`}>
					{baseList.map((item, index) => (
						<div
							className={`${preCls}-common-component`}
							key={item.type + index}
						>
							{item.type}
							<PlusSquareOutlined 
								className={`${preCls}-canvas-add`}
								onClick={() => commonAction(item)}
							/>
						</div>
					))}
				</div>
			</TabPane>
		</Tabs>
	</div>
}
