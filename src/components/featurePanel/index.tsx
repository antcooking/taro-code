import { Form, Tabs, Upload } from 'antd';
import Antd from './com/index';
import { useCallback, useContext, useEffect, useState } from 'react';
import context from '../../store/context';
import './index.less';
import deepCopy from '../../utils/deepcopy';
import { rootFeature } from '../../config/rootFeature';
import { render } from '@tarojs/taro';

const preCls = 'cookCode-feature-pannel';
const FormItem = Form.Item;
const { TabPane } = Tabs;

export default function MenuLeft() {
	const {
		state: {
			featurePannel,
			componentsPannel,
			render: { data, mode },
		},
		dispatch,
	} = useContext(context);
	let target: any = data;

	const [_featurePannel, setFeaturePannel] = useState<any>(rootFeature);

	useEffect(
		function () {
			if (featurePannel?.['activePath']?.length > 1) {
				let componentsAll: any[] = [];
				componentsPannel.forEach((item: any) => {
					componentsAll = componentsAll.concat(item.data);
				});
				const res = componentsAll.find((item) => item.type === featurePannel['type']);

				if (res) setFeaturePannel(res.featurePannel);
			} else {
				setFeaturePannel(rootFeature);
			}
		},
		[featurePannel, componentsPannel]
	);

	if (featurePannel?.['activePath']?.length > 0 && target) {
		if (featurePannel?.['activePath']?.length === 1) {
			target = target;
		} else if (featurePannel?.['activePath']?.length > 1) {
			featurePannel?.['activePath'].forEach((t: any, index: number) => {
				if (t !== -1 && index > 0) {
					if (index === 1) {
						target = target.data[t];
					} else if (target.props.children) {
						target = target.props.children[t];
					}
				}
			});
		}
	}

	const findProps = useCallback(
		function (actionType: string) {
			if (!actionType.includes('.')) {
				return target.props[actionType];
			} else {
				let res: any = target.props;
				actionType.split('.').forEach((ac) => {
					res = res[ac];
				});

				return res;
			}
		},
		[target]
	);

	const commonOnChange = useCallback(
		function (e: any, actionType: string, type: string, unit: string) {
			const __data = deepCopy(data);
			let __target: any = __data;
			if (featurePannel?.['activePath']?.length === 1) {
				__target = __target;
			} else if (featurePannel?.['activePath']?.length > 1) {
				featurePannel?.['activePath'].forEach((t: any, index: number) => {
					if (t !== -1 && index > 0) {
						if (index === 1) {
							__target = __target.data[t];
						} else if (__target.props.children) {
							__target = __target.props.children[t];
						}
					}
				});
			}

			if (!actionType.includes('.')) {
				if (['Input', 'RadioGroup', 'TextArea'].includes(type)) {
					__target.props[actionType] = e.target.value;
				} else {
					__target.props[actionType] = e;
				}
			} else {
				const actionTypeArr: any = actionType.split('.');
				actionTypeArr.forEach((ac: any, index: number) => {
					if (index < actionTypeArr.length - 1 && index !== 0) {
						if (!__target[ac]) __target[ac] = {};
						__target = __target[ac];
					} else if (index === 0) {
						__target = __target.props[ac];
					}
				});

				__target[actionTypeArr[actionTypeArr.length - 1]] = [
					'Input',
					'RadioGroup',
					'TextArea',
				].includes(type)
					? e.target.value
					: e;

				if (unit) {
					__target[actionTypeArr[actionTypeArr.length - 1]] += unit;
				}
			}
			dispatch({
				type: 'data-update',
				payload: {
					data: __data.data,
					props: __data.props,
				},
			});
		},
		[data, dispatch, featurePannel]
	);

	return (
		<div className={`${preCls}`} style={mode === 'preview' ? { width: 0 } : {}}>
			<Upload />
			<Tabs defaultActiveKey="1">
				<TabPane tab="基础设置" key="1">
					{(_featurePannel?.baseSetting || []).map((item: any, index: number) => (
						<div className="featurePannel-item" key={`featurePannel-item-${index}`}>
							<div className="featurePannel-item-title">{item.name}</div>
							{item.data.map((it: any, ind: number) => {
								// @ts-ignore
								const Controller = Antd[it.controller];
								let value = findProps(it.actionType);
								if (typeof value === 'string' && value.includes(it.unit)) {
									value = Number(value.replace(it.unit, ''));
								}
								let ControllerProps: any = {
									value,
									onChange: (e: any) => commonOnChange(e, it.actionType, it.controller, it.unit),
								};
								if (it.controller === 'Slider') {
									ControllerProps.max = it.max;
									ControllerProps.min = it.min;
									ControllerProps.step = it.step;
								}
								if (it.controller === 'RadioGroup') {
									ControllerProps.options = it.options;
									ControllerProps.optionType = it.optionType;
								}
								return (
									<FormItem label={it.name} key={`featurePannel-formitem${ind}`}>
										<Controller {...ControllerProps} />
									</FormItem>
								);
							})}
						</div>
					))}
				</TabPane>
				<TabPane tab="数据设置" key="4">
					数据设置
				</TabPane>
				<TabPane tab="事件设置" key="2">
					事件设置
				</TabPane>
			</Tabs>
		</div>
	);
}
