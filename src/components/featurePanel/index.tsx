import { Checkbox, Form, Select, Tabs, Upload } from 'antd';
import Antd from './com/index';
import { InputNumber } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import context from '../../store/context';
import './index.less';
import deepCopy from '../../utils/deepcopy';
import { rootFeature } from '../../config/rootFeature';

const preCls = 'cookCode-feature-pannel';
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Option } = Select;

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

	const setMutil = useCallback(
		function (value) {
			const __data = deepCopy(data);
			let __target: any = __data;

			featurePannel?.['activePath'].forEach((t: any, index: number) => {
				if (t !== -1 && index > 0) {
					if (index === 1) {
						__target = __target.data[t];
					} else if (__target.props.children) {
						__target = __target.props.children[t];
					}
				}
			});

			const muiltFields: string[] = [];

			{
				(_featurePannel?.baseSetting || []).map((item: any, index: number) => (
					<div className="featurePannel-item" key={`featurePannel-item#-${index}`}>
						{item.data.map((it: any) => {
							muiltFields.push(it.actionType);
						})}
					</div>
				));
			}

			__target.muilt = value;
			__target.muiltFields = muiltFields;

			dispatch({
				type: 'data-update',
				payload: {
					data: __data.data,
					props: __data.props,
				},
			});
		},
		[featurePannel, data, dispatch, _featurePannel]
	);

	const getCurrentData = () => {
		const __data = deepCopy(data);
		let __target: any = __data;

		(featurePannel?.['activePath'] || []).forEach((t: any, index: number) => {
			if (t !== -1 && index > 0) {
				if (index === 1) {
					__target = __target.data[t];
				} else if (__target.props.children) {
					__target = __target.props.children[t];
				}
			}
		});
		return __target || {};
	};

	const changeMuiltFields = useCallback(
		function (t) {
			const __data = deepCopy(data);
			let __target: any = __data;

			featurePannel?.['activePath'].forEach((t: any, index: number) => {
				if (t !== -1 && index > 0) {
					if (index === 1) {
						__target = __target.data[t];
					} else if (__target.props.children) {
						__target = __target.props.children[t];
					}
				}
			});

			if (__target.muiltFields.includes(t)) {
				__target.muiltFields.splice(__target.muiltFields.indexOf(t), 1);
			} else {
				__target.muiltFields.push(t);
			}

			dispatch({
				type: 'data-update',
				payload: {
					data: __data.data,
					props: __data.props,
				},
			});
		},
		[featurePannel, data, dispatch]
	);

	return (
		<div className={`${preCls}`} style={mode === 'preview' ? { width: 0 } : {}}>
			<Tabs defaultActiveKey="0">
				<TabPane tab="基础设置" key="0">
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
				{featurePannel?.['activePath'] && featurePannel?.['activePath'].length > 1 ? (
					<TabPane tab="数据设置" key="4">
						<div className="featurePannel-item-title">批量渲染</div>
						<InputNumber value={getCurrentData()?.muilt || 1} onChange={setMutil} />
						<div className="featurePannel-item-title" style={{ marginTop: 20 }}>
							批量遍历字段
						</div>
						{(_featurePannel?.baseSetting || []).map((item: any, index: number) => (
							<div className="featurePannel-item" key={`featurePannel-item#-${index}`}>
								{item.data.map((it: any, ind: number) => {
									return (
										<FormItem label={it.name} key={`featurePannel-formitem${ind}`}>
											<Checkbox
												checked={(getCurrentData()?.muiltFields || []).includes(it.actionType)}
												onChange={() => changeMuiltFields(it.actionType)}
											></Checkbox>
										</FormItem>
									);
								})}
							</div>
						))}
					</TabPane>
				) : (
					''
				)}
				<TabPane tab="事件设置" key="2">
					<div className="featurePannel-item">
						<div className="featurePannel-item-title">事件类型</div>
						<Select
							style={{ width: 150 }}
							placeholder="请选择事件类型"
							onChange={(e) => console.info(e)}
						>
							<Option value={1}>点击弹窗</Option>
						</Select>
					</div>
				</TabPane>
			</Tabs>
		</div>
	);
}
