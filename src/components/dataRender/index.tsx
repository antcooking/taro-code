import { isValidElement, useCallback, useContext, useEffect } from 'react';
import { Icontext } from '../../store/types';
import { dragContext } from '../../utils/drag';
import type { Icontext as IDragContext } from '../../utils/drag';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import deepCopy from '../../utils/deepcopy';
import { useThrottle } from '../../utils/hooks';
import classNames from 'classnames';
import getComponent from '../../utils/getComponent';
import './index.less';
const preCls = 'cookCode-dataRender';

export default function (con: Icontext): JSX.Element {
	const {
		state: { render },
		dispatch,
	} = con;
	const { setDragData, dragData } = useContext(dragContext);

	const data = render.data?.data || [];
	const previewing = render.mode === 'preview';

	useEffect(function () {
		const draftData: any = localStorage.getItem('DRAFT_DATA');
		if (draftData) {
			dispatch({
				type: 'data-update',
				payload: {
					data: JSON.parse(draftData).data,
					props: JSON.parse(draftData).props,
				},
			});
		}
	}, []);

	const commonAction = useCallback(
		function (item: any, index?: number) {
			const data = con.state.render.data.data;
			if (dragData.removePath) {
				const target = getTarget(data, dragData.removePath);
				if (Array.isArray(target)) {
					target.splice(dragData.removeIndex as number, 1);
				} else {
					if (!target.props?.['children']) target.props.children = [];
					target.props.children.splice(dragData.removeIndex, 1);
				}
			}
			index === undefined ? data.push(item) : data.splice(index, 0, item);
			dispatch({
				type: 'data-update',
				payload: {
					data,
				},
			});
		},
		[con, dragData.removeIndex]
	);

	const onDrop = useCallback(
		function () {
			if (previewing) return;
			if (dragData.actionData && dragData.targetPath?.length === 1 && dragData.insertIndex !== -1) {
				const t = dragData.actionData;
				commonAction(t, dragData.insertIndex as number);
				setDragData();
			} else {
				const t = dragData.actionData;
				commonAction(t);
				setDragData();
			}
		},
		[dragData.actionData, previewing, commonAction, dragData.insertIndex, dragData.targetPath]
	);

	const onDragOver = useCallback(function (e) {
		e.preventDefault();
	}, []);

	const previewStyle = !previewing ? { paddingBottom: 100 } : {};

	return (
		<div
			className="cookCode-dataRender"
			id="renderContainer"
			onDrop={onDrop}
			onDragOver={onDragOver}
			style={{
				...render.data.props.style,
				...previewStyle,
			}}
		>
			<DeepRender
				data={data}
				path={[-1]}
				con={con}
				dragCon={{
					setDragData,
					dragData,
				}}
			/>
		</div>
	);
}

function DeepRender(params: {
	data: Array<any>;
	path: Array<number>;
	dragCon: IDragContext;
	con: Icontext;
}): any {
	const { data, path, dragCon, con } = params;
	const { setDragData, dragData } = dragCon;

	const { state, dispatch } = con;
	const { mode } = state.render;
	const featurePannel = state?.featurePannel || {};

	const previewing = mode === 'preview';

	const onDragOver = useThrottle(
		function (index: number, e: any, item: any) {
			e.stopPropagation();
			e.preventDefault();
			if (previewing) return;
			if (item.id === -999) return;
			if (dragData.actionData?.['id'] === item.id) return;
			const rect = document.getElementById(`data-item${item.id}`)?.getBoundingClientRect();
			const itemRectTop = rect?.top;
			const itemRectHeight = rect?.height;
			const res: any = {};
			if (itemRectTop === undefined || itemRectHeight === undefined) return;
			const dis = Math.abs(e.clientY - itemRectTop);
			const dis_ = Math.abs(e.clientY - itemRectTop - itemRectHeight);
			if (dis < 10 && dis > 0) {
				res.insertIndex = index;
				res.targetId = item.parent ? item.parent.id : -1;
				res.targetPath = item.parent ? path : [-1];
			} else if (dis_ < 14) {
				res.insertIndex = index + 1;
				res.targetId = item.parent ? item.parent.id : -1;
				res.targetPath = item.parent ? path : [-1];
			} else {
				if (item.hasNoChildren) return;
				res.insertIndex = item.props.children.length;
				res.targetId = item.id;
				res.targetPath = path.concat(index);
			}
			setDragData(res);
		},
		30,
		[dragData]
	);

	const setActive = useCallback(
		function (e: any, item: any, index: number | null) {
			if (previewing) return;
			if (e) e.stopPropagation();
			const { renderData } = state.featurePannel || {};
			if (index === null) {
				dispatch({
					type: 'featurePannel-update',
					payload: {
						type: '',
						activePath: [],
						activeId: undefined,
					},
				});
			} else {
				const activeDom = document.getElementById(`data-item${item.id}`);
				dispatch({
					type: 'featurePannel-update',
					payload: {
						type: renderData && renderData.id === item.id ? '' : item.type,
						activePath: renderData && renderData.id === item.id ? [] : path.concat(index),
						activeId: item.id,
						display: getStyle(activeDom, 'display'),
					},
				});
			}
		},
		[state.featurePannel, previewing]
	);

	const onDrop = useCallback(
		function (e: any) {
			if (previewing) return;
			e.stopPropagation();
			if (!dragData.actionData) return;
			let origin = state.render.data.data;
			const target = getTarget(origin, dragData.targetPath);

			if (typeof target === 'string' || !target) return;

			if (!target.hasNoChildren) {
				if (dragData.removePath) {
					const target = getTarget(origin, dragData.removePath);
					if (Array.isArray(target)) {
						target.splice(dragData.removeIndex as number, 1);
					} else {
						if (!target.props?.['children']) target.props.children = [];
						target.props.children.splice(dragData.removeIndex, 1);
					}
				}
				const _data = dragData.actionData;
				if (_data) {
					if (target) _data['parent'] = deepCopy(target);
					if (Array.isArray(target)) {
						target.splice(dragData.insertIndex as number, 0, dragData.actionData);
					} else {
						if (!target.props?.['children']) target.props.children = [];
						target.props.children.splice(dragData.insertIndex, 0, dragData.actionData);
					}

					dispatch({
						type: 'data-update',
						payload: {
							data: origin,
						},
					});

					setDragData();
				}
			}
		},
		[dragData, state.render.data.data, dispatch]
	);

	const deleteChildren = useCallback(function (item: any) {
		const propsNew: any = {};
		Object.keys(item).map((key) => {
			if (key !== 'children') {
				propsNew[key] = item[key];
			}
		});

		return propsNew;
	}, []);

	const onmouseDown = useCallback(
		function (e, item, index) {
			e.stopPropagation();
			const actionData = deepCopy(item);

			document.onmousemove = function (ev) {
				ev.stopPropagation();
				if (dragData.mouseMark?.show) return;
				setDragData({
					actionData,
					removePath: path,
					removeIndex: index,
					mouseMark: {
						icon: item.icon,
						left: e.clientX,
						top: e.clientY,
						show: true,
					},
				});
				dispatch({
					type: 'featurePannel-update',
					payload: {
						activePath: [],
						acttiveId: undefined,
						type: '',
					},
				});
				document.onmousemove = null;
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

	const itemRender = function (item: any, index: number, proxyMargin?: string) {
		let style_dl: any = {};
		if (proxyMargin && item.props.style) {
			Object.keys(item.props.style).forEach((key) => {
				if (!key.includes('margin')) style_dl[key] = item.props.style[key];
			});
		}
		const ItemRender = getComponent(item.type);
		const style = proxyMargin ? style_dl : item.props.style;
		const style_ = {
			...style,
		};

		if (item.id === dragData.targetId) {
			style_.border = '4px solid #3a2291';
		}

		if (item.parent && item.parent.id === dragData.targetId && index === dragData.insertIndex) {
			style_.borderTop = '4px solid #3a2291';
		}

		if (
			!item.parent &&
			dragData.targetPath?.length === 1 &&
			index === dragData.insertIndex &&
			dragData.actionData
		) {
			style_.borderTop = '4px solid #3a2291';
		}

		return (
			<ItemRender
				{...deleteChildren(item.props)}
				style={style_}
				key={`${preCls}-item${index}#${item.id || -1}`}
				className={
					classNames({
						[`${preCls}-common-desc`]: mode === 'edite',
						[`${preCls}-common-desc-active`]:
							featurePannel['activeId'] &&
							mode === 'edite' &&
							featurePannel['activeId'] === item.id,
					}) + ` ${item.props.className || ''}`
				}
				id={`data-item${item.id}`}
				onDrop={onDrop}
				onDragOver={(e: any) => onDragOver(index, e, item)}
				onClick={(e: any) => setActive(e, item, index)}
				onMouseDown={function (e: any) {
					onmouseDown(e, item, index);
				}}
			>
				{!item.props.children || item.props.children.length === 0 ? undefined : (
					<DeepRender
						data={item.props.children}
						path={path.concat(index)}
						dragCon={dragCon}
						con={con}
					/>
				)}
			</ItemRender>
		);
	};

	const deleteItem = useCallback(
		function (tPath: number[], e: any) {
			e.stopPropagation();
			let origin: any = state.render.data.data;
			let target: any = origin;
			if (tPath.length === 2 && tPath[1] !== undefined) {
				target.splice(tPath[1], 1);
			} else if (tPath.length > 2) {
				const tp = tPath.slice(1);
				tp.forEach((item, index) => {
					if (index < tp.length - 1) {
						if (index === 0) {
							target = target[item];
						} else {
							target = target.props['children'][item];
						}
					}
				});
				target.props.children.splice(tp[tp.length - 1], 1);
			}

			setActive(e, null, null);

			dispatch({
				type: 'data-update',
				payload: {
					data: origin,
				},
			});
		},
		[state.render.data.data]
	);

	const sortItem = function (tPath: number[], sortIndex: number, e: any, item: any) {
		e.stopPropagation();
		if (previewing) return;
		let origin: any = state.render.data.data;
		let target: any = origin;
		if (tPath.length === 2 && tPath[1] !== undefined) {
			if (sortIndex < 0 || sortIndex > target.length - 1) return;
			const temp = target[tPath[1]];
			target[tPath[1]] = target[sortIndex];
			target[sortIndex] = temp;
		} else if (tPath.length > 2) {
			const tp = tPath.slice(1);
			tp.forEach((item, index) => {
				if (index < tp.length - 1) {
					if (index === 0) {
						target = target[item];
					} else {
						target = target.props?.['children'][item];
					}
				}
			});
			if (sortIndex < 0 || sortIndex > target.props.children.length - 1) return;
			const temp = target.props.children[tp[tp.length - 1] as any];

			target.props.children[tp[tp.length - 1] as any] = target.props.children[sortIndex];
			target.props.children[sortIndex] = temp;
		}

		setActive(e, item, sortIndex);

		dispatch({
			type: 'data-update',
			payload: {
				data: origin,
			},
		});
	};

	if (!data) return '';
	if (typeof data === 'string' || isValidElement(data)) return data;

	return (
		<>
			{data.map((item: any, index: number) => {
				if (typeof item !== 'string') {
					return (
						<>
							{featurePannel['activePath'] &&
							featurePannel['activePath'].join(',') === path.concat(index).join(',') ? (
								<div
									key={`${preCls}-wrapper${index}${item.dragTime}`}
									className={`${preCls}-wrapper`}
									style={{
										marginTop: item.props?.style?.marginTop,
										marginLeft: item.props?.style?.marginLeft,
										marginRight: item.props?.style?.marginRight,
										marginBottom: item.props?.style?.marginBottom,
										display: featurePannel['display'],
									}}
								>
									<div className={`${preCls}-tools`}>
										<ArrowUpOutlined
											style={{ fontSize: 24 }}
											onClick={(e) => sortItem(path.concat(index), index - 1, e, item)}
										/>
										<ArrowDownOutlined
											style={{ fontSize: 24 }}
											onClick={(e) => sortItem(path.concat(index), index + 1, e, item)}
										/>
										<DeleteOutlined
											style={{ fontSize: 24 }}
											onClick={(e) => deleteItem(path.concat(index), e)}
										/>
									</div>
									{itemRender(item, index, 'proxyMargin')}
								</div>
							) : (
								itemRender(item, index)
							)}
						</>
					);
				} else return item;
			})}
		</>
	);
}
// @ts-ignore
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		//@ts-ignore
		return getComputedStyle(obj, false)[attr];
	}
}

function getTarget(data: any, targetKeys: any) {
	let origin = data;
	let target: any = origin;

	if (targetKeys.length === 1 && targetKeys[0] === -1) {
		target = target;
	} else {
		targetKeys.forEach((t: any, index: number) => {
			if (t !== -1 && index > 0) {
				if (index === 1) {
					target = target[t];
				} else if (target.props.children) {
					target = target.props.children[t];
				}
			}
		});
	}

	return target;
}
