import { isValidElement, useCallback, useContext, useEffect } from 'react';
import { Icontext } from '../../store/types';
import { dragContext } from '../../utils/drag';
import type { Icontext as IDragContext } from '../../utils/drag';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import deepCopy from '../../utils/deepcopy';
import classNames from 'classnames';
import './index.less';

const preCls = 'cookCode-dataRender';
const placeholderElementStyle = {
	padding: 4,
	marginBottom: 4,
	marginTop: 4,
};

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

	const commonAction = function (item: any) {
		const data = con.state.render.data.data;
		data.push(item);
		dispatch({
			type: 'data-update',
			payload: {
				data,
			},
		});
	};

	const onDrop = useCallback(
		function () {
			if (previewing) return;
			if (dragData.actionData) {
				const t = dragData.actionData;
				commonAction(t);
				setDragData();
			}
		},
		[dragData.actionData, previewing]
	);

	const onDragOver = useCallback(function (e) {
		e.preventDefault();
	}, []);

	const insertPlaceholder = function (dd: any) {
		let item = [...dd];
		if (!dragData.targetId) return item;
		if (
			dragData.actionData &&
			dragData.targetId === -1 &&
			dragData.targetPath?.length === 1 &&
			dragData.insertIndex !== -1
		) {
			if (item) {
				item.splice(dragData.insertIndex as number, 0, {
					id: -999,
					type: 'div',
					props: {
						children: [dragData.actionData?.['name'] + '占位中...'],
						style: placeholderElementStyle,
					},
				});
			}
		}

		return item;
	};

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
			{deepRender({
				data: insertPlaceholder(data),
				path: [-1],
				con,
				dragCon: {
					setDragData,
					dragData,
				},
			})}
		</div>
	);
}

function deepRender(params: {
	data: Array<any>;
	path: Array<number>;
	dragCon: IDragContext;
	con: Icontext;
}) {
	const { data, path, dragCon, con } = params;
	const { setDragData, dragData } = dragCon;

	const { state, dispatch } = con;
	const { mode } = state.render;
	const previewing = mode === 'preview';

	const onDragOver = function (index: number, e: any, item: any) {
		e.stopPropagation();
		e.preventDefault();
		if (previewing) return;
		if (item.id === -999) return;
		if (dragData.actionData?.['id'] === item.id) return;
		const rect = document
			.getElementById(`data-item${path.concat(index).join(',')}`)
			?.getBoundingClientRect();
		const itemRectTop = rect?.top;
		const itemRectHeight = rect?.height;
		const res: any = {};
		if (itemRectTop && e.clientY - itemRectTop < 14) {
			res.insertIndex = index;
			res.targetId = item.parent ? item.parent.id : -1;
			res.targetPath = item.parent ? path : [-1];
		} else if (itemRectHeight && itemRectTop && e.clientY > itemRectTop + itemRectHeight - 14) {
			res.insertIndex = index + 1;
			res.targetId = item.parent ? item.parent.id : -1;
			res.targetPath = item.parent ? path : [-1];
		} else {
			res.insertIndex = 0;
			res.targetId = item.id;
			res.targetPath = path.concat(index);
		}
		// console.info(res, 'res');
		setDragData(res);
	};

	const setActive = function (e: any, item: any, index: number | null) {
		if (previewing) return;
		if (e) e.stopPropagation();
		const { renderData } = state.featurePannel || {};
		if (index === null) {
			dispatch({
				type: 'featurePannel-update',
				payload: {
					type: '',
					activePath: [],
				},
			});
		} else {
			dispatch({
				type: 'featurePannel-update',
				payload: {
					type: renderData && renderData.id === item.id ? '' : item.type,
					activePath: renderData && renderData.id === item.id ? [] : path.concat(index),
				},
			});
		}
	};

	const featurePannel = state?.featurePannel || {};

	const onDrop = function (e: any) {
		if (previewing) return;
		e.stopPropagation();
		if (!dragData.actionData) return;
		let targetKeys = dragData.targetPath as Array<number>;
		let origin = state.render.data.data;
		let target: any = origin;

		if (targetKeys.length === 1 && targetKeys[0] === -1) {
			target = target;
		} else {
			targetKeys.forEach((t, index) => {
				if (t !== -1 && index > 0) {
					if (index === 1) {
						target = target[t];
					} else if (target.props.children) {
						target = target.props.children[t];
					}
				}
			});
		}

		if (typeof target === 'string' || !target) return;

		if (!target.hasNoChildren) {
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
	};

	const onDragStart = function (index: number, e: any, item: any) {
		e.stopPropagation();
		if (previewing) return;
		setTimeout(() => {
			setDragData({
				actionData: item,
			});
			dispatch({
				type: 'featurePannel-update',
				payload: {
					activePath: [],
					type: '',
				},
			});
			let targetKeys = path;
			let origin = state.render.data.data;
			let target: any = origin;
			targetKeys.forEach((t, index) => {
				if (t !== -1 && index > 0) {
					if (index === 1) {
						target = target[t];
					} else if (target.props.children) {
						target = target.props.children[t];
					}
				}
			});

			if (Array.isArray(target)) {
				target.splice(index, 1);
			} else {
				target.props.children.splice(index, 1);
			}

			dispatch({
				type: 'data-update',
				payload: {
					data: origin,
				},
			});
		}, 33);
	};

	const insertPlaceholder = function (item: any) {
		if (typeof item.props.children === 'string') return item.props.children;
		if (!item.props.children) item.props.children = [];
		const res = [...item.props.children];
		if (item && item.id === dragData.targetId && dragData.actionData) {
			res.splice(dragData.insertIndex as number, 0, {
				id: -999,
				type: 'div',
				props: {
					children: [dragData?.actionData?.['name'] + '占位中'],
					style: placeholderElementStyle,
				},
			});
		}

		return res || null;
	};

	const deleteChildren = function (item: any) {
		const propsNew: any = {};
		Object.keys(item).map((key) => {
			if (key !== 'children') {
				propsNew[key] = item[key];
			}
		});

		return propsNew;
	};

	const itemRender = function (item: any, index: number, proxyMargin?: string) {
		let style_dl: any = {};
		if (proxyMargin && item.props.style) {
			Object.keys(item.props.style).forEach((key) => {
				if (!key.includes('margin')) style_dl[key] = item.props.style[key];
			});
		}
		return (
			<item.type
				{...deleteChildren(item.props)}
				style={proxyMargin ? style_dl : item.props.style}
				key={`${preCls}-item${index}#`}
				className={classNames({
					[`${preCls}-common-desc`]: mode === 'edite',
					[`${preCls}-common-desc-active`]:
						featurePannel['activePath'] &&
						mode === 'edite' &&
						featurePannel['activePath'].join(',') === path.concat(index).join(','),
				})}
				id={`data-item${path.concat(index).join(',')}`}
				onDrop={onDrop}
				onDragStart={(e: any) => onDragStart(index, e, item)}
				onDragOver={(e: any) => onDragOver(index, e, item)}
				onClick={(e: any) => setActive(e, item, index)}
				draggable={mode === 'edite'}
			>
				{item.hasNoChildren
					? undefined
					: deepRender({
							data: insertPlaceholder(item),
							path: path.concat(index),
							dragCon,
							con,
					  })}
			</item.type>
		);
	};

	const deleteItem = function (tPath: number[], e: any) {
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
	};

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

	if (!data) return undefined;
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
										marginTop: item.props.style.marginTop,
										marginLeft: item.props.style.marginLeft,
										marginRight: item.props.style.marginRight,
										marginBottom: item.props.style.marginBottom,
									}}
								>
									<div className={`${preCls}-tools`}>
										<ArrowUpOutlined
											onClick={(e) => sortItem(path.concat(index), index - 1, e, item)}
										/>
										<ArrowDownOutlined
											onClick={(e) => sortItem(path.concat(index), index + 1, e, item)}
										/>
										<DeleteOutlined onClick={(e) => deleteItem(path.concat(index), e)} />
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
