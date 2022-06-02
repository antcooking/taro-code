import { useState, useContext, useCallback, useEffect } from 'react';
import { Tabs, Button, Input, Form, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import context from '../../store/context';
import {
	featureComponents,
	defaultComponentsInfo,
	defaultAttrItem,
	defaultBaseSettingItem,
} from '../../config/featureComponents';
import { DeleteOutlined, PlusOutlined, EditFilled } from '@ant-design/icons';
import ImageUpload from '../../components/featurePanel/com/imageUpload';
import GroupInput from '../../components/featurePanel/com/groupInput';
import Antd from '../../components/featurePanel/com/index';
import './index.less';

const preCls = 'components-manage';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

export default function ComponentsManage() {
	const [activeKey, setActiveKey] = useState('1');
	const [isEdit, setEdit] = useState(false);
	const [componentState, setComponentState] = useState<any>(defaultComponentsInfo);
	const [editIndex, setEditIndex] = useState<any>();

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

	const dataByController = useCallback(
		function (controller: string) {
			let res;
			featureComponents.map((ff) => {
				if (ff.key === controller) {
					res = ff.props;
				}
			});
			return res;
		},
		[featureComponents]
	);

	const setComponentInfo = useCallback(
		function (key: string, value: string) {
			setComponentState({
				...componentState,
				[key]: value,
			});
		},
		[componentState]
	);

	const changeAttr = function (value: any, index: number, nextIndex: number, key: string) {
		componentState.featurePannel.baseSetting[index].data[nextIndex][key] = value;
		setComponentState({
			...componentState,
		});
	};

	const changeProps = useCallback(
		function (value: any, key: string) {
			if (!key.includes('.')) {
				componentState.props[key] = value;
			} else {
				let target = componentState.props;
				const data = key.split('.');
				data.forEach((dd, index) => {
					if (index < data.length - 1) {
						target = target[dd] || {};
					} else if (index === data.length - 1) {
						target[dd] = value;
					}
				});
			}

			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const addComp = useCallback(function () {
		setEdit(true);
	}, []);

	const toEditComponent = useCallback(
		function () {
			// @ts-ignore
			const res = componentsPannel[Number(activeKey)].data[editIndex];
			res.iframeName = res.type.split('.')[0];
			res.compName = res.type.split('.')[1];

			setComponentState(res);

			setEdit(true);
		},
		[componentsPannel, editIndex, activeKey]
	);

	const addAttr = useCallback(
		function (index: number) {
			componentState.featurePannel.baseSetting[index].data.push({ ...defaultAttrItem });
			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const addGroup = useCallback(
		function () {
			componentState.featurePannel.baseSetting.push(defaultBaseSettingItem);
			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const deleteAttr = useCallback(
		function (index: number, deleteIndex: number) {
			componentState.featurePannel.baseSetting[index].data.splice(deleteIndex, 1);
			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const deleteGroup = useCallback(
		function (deleteIndex: number) {
			componentState.featurePannel.baseSetting.splice(deleteIndex);
			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const deleteComponent = useCallback(
		function () {
			//@ts-ignore
			componentsPannel[Number(activeKey)].data.splice(editIndex, 1);
			console.info(componentsPannel, 'componentsPannel', Number(activeKey), editIndex);
			dispatch({
				type: 'components-pannel',
				payload: componentsPannel,
			});

			localStorage.setItem('COMP_PANNEL', JSON.stringify(componentsPannel));
		},
		[componentsPannel, dispatch, editIndex]
	);

	const changeGroupName = useCallback(
		function (e: any, index: number) {
			componentState.featurePannel.baseSetting[index].name = e.target.value;
			setComponentState({
				...componentState,
			});
		},
		[componentState]
	);

	const findValueByActionType = useCallback(
		function (key: string) {
			let res: any;
			if (!key.includes('.')) {
				res = componentState.props[key];
			} else {
				res = componentState.props;
				const data = key.split('.');
				data.forEach((dd, index) => {
					if (index < data.length - 1) {
						res = res[dd] || {};
					} else if (index === data.length - 1) {
						res = res[dd];
					}
				});
			}

			return res;
		},
		[componentState]
	);

	const handleOk = useCallback(
		function () {
			setEdit(false);
			componentState.type = componentState.iframeName + '.' + componentState.compName;
			if (editIndex === undefined) {
				//@ts-ignore
				componentsPannel[Number(activeKey)].data.push(componentState);
			} else {
				//@ts-ignore
				componentsPannel[Number(activeKey)].data[editIndex] = componentState;
			}
			dispatch({
				type: 'components-pannel',
				payload: componentsPannel,
			});
			localStorage.setItem('COMP_PANNEL', JSON.stringify(componentsPannel));
		},
		[componentState, componentsPannel]
	);

	return (
		<div className={`${preCls}-container`}>
			<div className="footer-btns">
				{!isEdit ? (
					<Link to={'/edite'}>
						<Button>返回</Button>
					</Link>
				) : (
					<>
						<Button style={{ marginRight: 14 }} onClick={() => setEdit(false)}>
							取消
						</Button>
						<Button type="primary" onClick={handleOk}>
							确定
						</Button>
					</>
				)}
			</div>
			{!isEdit ? (
				<Tabs activeKey={activeKey} onChange={(v) => setActiveKey(v)}>
					{componentsPannel.map((item: any, index) => (
						<TabPane tab={item['name']} key={`${index}`}>
							<div className={`${preCls}-compbox`}>
								{item.data.map((it: any, inx: number) => (
									<div
										key={`componentsPannelXX${inx}`}
										className={`${preCls}-common-component`}
										onMouseMove={() => setEditIndex(inx)}
										onMouseLeave={() => {
											if (!isEdit) {
												setTimeout(() => {
													setEditIndex(undefined);
												}, 2000);
											}
										}}
									>
										<img src={it.icon} draggable={false} />
										<div className="text">{it.name}</div>
										{inx === editIndex ? (
											<EditFilled className="edit-comp" onClick={toEditComponent} />
										) : (
											''
										)}
										{inx === editIndex ? (
											<DeleteOutlined className="delete-comp" onClick={deleteComponent} />
										) : (
											''
										)}
									</div>
								))}
								<div className={`${preCls}-common-component`} onClick={addComp}>
									<PlusOutlined style={{ fontSize: '20px', marginBottom: 4 }} />
									<div className="text">新增组件</div>
								</div>
							</div>
						</TabPane>
					))}
				</Tabs>
			) : (
				<div className="featureComponents-container">
					<div className="featureComponents-container-title">
						<span>组件操作</span>
					</div>
					<div
						className="operate-components-row"
						style={{ borderTop: '1px solid #d0cccc', paddingTop: 20, paddingBottom: 70 }}
					>
						<FormItem label="组件名称" style={{ width: '45%' }}>
							<Input
								placeholder="请输入组件名称"
								value={componentState.name}
								onChange={(e: any) => setComponentInfo('name', e.target.value)}
							/>
						</FormItem>
						<FormItem label="组件库" style={{ width: '45%', marginLeft: 20 }}>
							<Select
								placeholder="请选择组件库"
								value={componentState.iframeName}
								onChange={(e: any) => setComponentInfo('iframeName', e)}
							>
								{
									// @ts-ignore
									window.inner_iframe.map((item, index) => (
										<Option key={`inner_iframe${index}`} value={item.name}>
											{item.name}
										</Option>
									))
								}
							</Select>
						</FormItem>
						<FormItem label="组件" style={{ width: '45%' }}>
							<Select
								value={componentState.compName}
								placeholder="请选择组件库"
								onChange={(e: any) => setComponentInfo('compName', e)}
							>
								{
									// @ts-ignore
									(findIndex(componentState.iframeName) || []).map((item: any, index: number) => (
										<Option key={`inner_iframe${index}`} value={item}>
											{item}
										</Option>
									))
								}
							</Select>
						</FormItem>
						<FormItem label="组件图标" style={{ width: '45%', marginLeft: 20 }}>
							<ImageUpload
								value={componentState.icon}
								onChange={(v: any) => setComponentInfo('icon', v)}
							/>
						</FormItem>
						<FormItem label="指定子组件" style={{ width: '45%' }}>
							<GroupInput
								value={componentState.exceptChildren}
								onChange={(v: any) => setComponentInfo('exceptChildren', v)}
							/>
						</FormItem>
					</div>
					<div style={{ borderTop: '1px solid #d0cccc' }}>
						{componentState.featurePannel.baseSetting.map((item: any, index: number) => (
							<div className="attr-container" key={`arrt-container${index}`}>
								<FormItem label={`属性分组(${index + 1})`} style={{ width: '100%' }}>
									<Input
										placeholder="请输入属性分组名称"
										value={item.name}
										style={{ width: 250, marginRight: 20 }}
										onChange={(e) => changeGroupName(e, index)}
										allowClear
									/>
									<DeleteOutlined onClick={() => deleteGroup(index)} />
								</FormItem>
								{item.data.map((dd: any, inx: number) => (
									<div key={`featureComponents-item$#${inx + 1}`}>
										<div className="operate-components-row">
											<Input
												className="attr-item"
												placeholder="请输入属性名称"
												value={dd.name}
												onChange={(e) => changeAttr(e.target.value, index, inx, 'name')}
												style={{ width: 130 }}
											/>
											<Input
												className="attr-item"
												placeholder="请输入属性字段名称"
												value={dd.actionType}
												onChange={(e) => changeAttr(e.target.value, index, inx, 'actionType')}
												style={{ width: 170 }}
											/>
											<Input
												className="attr-item"
												placeholder="请输入属性默认值"
												value={findValueByActionType(dd.actionType)}
												onChange={(e: any) => {
													if (!dd.actionType) return message.error('请先输入字段名称');
													changeProps(e.target.value, dd.actionType);
												}}
												style={{ width: 170 }}
											/>
											<Select
												className="attr-item"
												placeholder="请选择属性类型"
												style={{ width: 220 }}
												onChange={(value) => changeAttr(value, index, inx, 'controller')}
												value={dd.controller}
											>
												{featureComponents.map((it, index) => (
													<Option value={it.key} key={`Optionindex${index}`}>
														{it.name}
													</Option>
												))}
											</Select>

											<DeleteOutlined onClick={() => deleteAttr(index, inx)} />
										</div>
										<div className="operate-components-row">
											{(dataByController(dd.controller) || []).map((pp: any, i: number) => {
												// @ts-ignore
												const Comp = Antd[pp.type];
												const props = {
													value: dd[pp.fieldName],
													onChange: (e: any) => {
														let value = e;
														if (['Input', 'RadioGroup', 'TextArea'].includes(pp.type)) {
															value = e.target.value;
														}
														changeAttr(value, index, inx, pp.fieldName);
													},
												};

												return (
													<FormItem
														label={pp.label}
														style={{ marginLeft: 10 }}
														key={`attr-item-${i}`}
													>
														<Comp {...props} />
													</FormItem>
												);
											})}
										</div>
									</div>
								))}
								<div className="add-attr-btn-wrapper">
									<Button className="add-attr-btn" onClick={() => addAttr(index)}>
										新增属性
									</Button>
								</div>
							</div>
						))}
					</div>
					<div className="add-group-btn-wrapper">
						<Button className="add-group-btn" onClick={addGroup}>
							新增属性分组
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

function findIndex(name: any) {
	let res;
	// @ts-ignore
	window.inner_iframe.map((item) => {
		if (item.name === name) {
			res = item.data;
		}
	});

	return res;
}
