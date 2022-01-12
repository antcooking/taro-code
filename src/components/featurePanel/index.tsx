import { Form, Tabs } from 'antd';
import { useContext } from 'react';
import context from '../../store/context';
import Stepper from './com/stepper';
import './index.less';

const preCls = 'cookCode-feature-pannel';
const FormItem = Form.Item;
const { TabPane } = Tabs;

export default function MenuLeft() {
	const { dispatch, state } = useContext(context);
	let currentData: any = {};

	if (state.featurePannel) {
		currentData = state.featurePannel.config['renderData'];
	} else {
		currentData = state.render.data;
	}

	const styleChange = function (key: string, value: number) {
		let origin = state.render.data.data;
		let target: any = origin;

		(state.featurePannel?.['config']?.['activePath']).forEach((t: number, index: number) => { 
			if ((t !== -1) && index > 0) { 
				if (index === 1) {
					target = target[t]
				} else if(target.children){
					target = target.children[t]
				}
			}
		})

		target.style = {
			...target.style,
			[key]: value
		}

		dispatch({
			type: 'data-update',
			payload: {
				data: origin
			}
		})
	};

	let isInlineBlock = false;

	if (
		(currentData && currentData.elementType === 'inline') ||
		!state?.featurePannel?.config?.['activePath']
	) {
		isInlineBlock = true;
	}

	return (
		<div className={`${preCls}`}>
			<Tabs defaultActiveKey="1">
				<TabPane tab="基础设置" key="1">
					{!isInlineBlock
						? [
								<FormItem label="宽度">
									<Stepper
										value={currentData?.style?.width}
										onChange={(value) => styleChange('width', value)}
									/>
								</FormItem>,
								<FormItem label="高度">
									<Stepper
										value={currentData?.style?.height}
										onChange={(value) => styleChange('height', value)}
									/>
								</FormItem>,
								<FormItem label="外间距">
									<FormItem label="上间距" style={{ marginLeft: 20 }}>
										<Stepper
											value={currentData?.style?.marginTop}
											onChange={(value) => styleChange('marginTop', value)}
										/>
									</FormItem>
									<FormItem label="右间距" style={{ marginLeft: 20 }}>
										<Stepper
											value={currentData?.style?.marginRight}
											onChange={(value) => styleChange('marginRight', value)}
										/>
									</FormItem>
									<FormItem label="下间距" style={{ marginLeft: 20 }}>
										<Stepper
											value={currentData?.style?.marginBottom}
											onChange={(value) => styleChange('marginBottom', value)}
										/>
									</FormItem>
									<FormItem label="左间距" style={{ marginLeft: 20 }}>
										<Stepper
											value={currentData?.style?.marginLeft}
											onChange={(value) => styleChange('marginLeft', value)}
										/>
									</FormItem>
								</FormItem>,
						  ]
						: ''}
					{state.featurePannel?.['config']?.['activePath'] ? (
						<FormItem label="内间距">
							<FormItem label="上间距" style={{ marginLeft: 20 }}>
								<Stepper
									value={currentData?.style?.paddingTop}
									onChange={(value) => styleChange('paddingTop', value)}
								/>
							</FormItem>
							<FormItem label="右间距" style={{ marginLeft: 20 }}>
								<Stepper
									value={currentData?.style?.paddingRight}
									onChange={(value) => styleChange('paddingRight', value)}
								/>
							</FormItem>
							<FormItem label="下间距" style={{ marginLeft: 20 }}>
								<Stepper
									value={currentData?.style?.paddingBottom}
									onChange={(value) => styleChange('paddingBottom', value)}
								/>
							</FormItem>
							<FormItem label="左间距" style={{ marginLeft: 20 }}>
								<Stepper
									value={currentData?.style?.paddingLeft}
									onChange={(value) => styleChange('paddingLeft', value)}
								/>
							</FormItem>
						</FormItem>
					) : (
						''
					)}
				</TabPane>
				<TabPane tab="事件设置" key="2">
					事件设置
				</TabPane>
				<TabPane tab="属性设置" key="3">
					属性设置
				</TabPane>
			</Tabs>
		</div>
	);
}
