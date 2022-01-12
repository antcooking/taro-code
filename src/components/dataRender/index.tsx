import { useCallback, useContext, useEffect, useState } from 'react';
import { Icontext } from '../../store/types';
import { dragContext } from '../../utils/drag';
import type { Icontext as IDragContext } from '../../utils/drag';
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import deepCopy from '../../utils/deepcopy';
import classNames from 'classnames';
import './index.less';

const preCls = 'cookCode-dataRender';

export default function (con: Icontext): JSX.Element {
	const {
		state: { render },
		dispatch,
	} = con;
	const { setDragData, dragData } = useContext(dragContext);

	const data = render.data?.data || [];

	useEffect(function () {
		const draftData = localStorage.getItem('DRAFT_DATA');
		if (draftData) {
			dispatch({
				type: 'data-update',
				payload: {
					data: JSON.parse(draftData),
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
			if (dragData.actionData) {
				commonAction(dragData.actionData);
			}
		},
		[dragData.actionData]
	);

	const onDragOver = useCallback(function (e) {
		e.preventDefault();
	}, []);

	return (
		<div
			className="cookCode-dataRender"
			id="renderContainer"
			onDrop={onDrop}
			onDragOver={onDragOver}
		>
			{deepRender({
				data: data,
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
	placeholder?: React.ReactNode;
}) {
	const { data, path, dragCon, placeholder, con } = params;
	if ((data && (data.length === 0 || !data[0]) && !!placeholder) || (!data && !!placeholder)) {
		return placeholder;
	}
	if (!data) return undefined;
	// const [placeholderDom,setPlaceholderDom] = useState<any>(null)
	const { setDragData, dragData } = dragCon;

	const { state, dispatch } = con;

	const onDragOver = function (index: number, e: any, item: any) {
		throllter(function () {
			e.stopPropagation();
			e.preventDefault();
			setDragData({
				targetId: item.id,
			});
		})();
	};

	const onDragLeave = function (index: number, e: any, item: any) {
		e.stopPropagation();
		setDragData({
			targetId: -1,
		});
	};

	const setActive = function (e: any, item: any, index: number | null) {
		if (e) e.stopPropagation();
		if (!item) {
			return dispatch({
				type: 'featurePannel-update',
				payload: {
					config: {
						renderData: {},
						activePath: null,
					},
				},
			});
		}
		// @ts-ignore
		const domInstance = document.getElementById(`data-item${path.concat(index).join(',')}`);
		if (!domInstance) return;
		item.style = {
			...item.style,
			paddingRight: item.style.paddingRight || item.style.padding || 0,
			paddingTop: item.style.paddingTop || item.style.padding || 0,
			paddingLeft: item.style.paddingLeft || item.style.padding || 0,
			paddingBottom: item.style.paddingBottom || item.style.padding || 0,
		};

		if (item.style.display !== 'inline-block') {
			item.style = {
				...item.style,
				marginTop: item.style.marginTop || item.style.margin || 0,
				marginLeft: item.style.marginLeft || item.style.margin || 0,
				marginBottom: item.style.marginBottom || item.style.margin || 0,
				marginRight: item.style.marginRight || item.style.margin || 0,
				width: domInstance?.offsetWidth,
				height: domInstance?.offsetHeight,
			};
		}

		dispatch({
			type: 'featurePannel-update',
			payload: {
				config: {
					renderData: item,
					activePath: index !== null ? path.concat(index) : null,
				},
			},
		});
	};

	const { config } = state?.featurePannel || {};

	const onDrop = function (e: any, index: number) {
		e.stopPropagation();
		setDragData({
			targetId: -1,
		});
		let targetKeys: Array<number> = path.concat(index);
		let origin = state.render.data.data;
		let target: any = origin;

		targetKeys.forEach((t, index) => {
			if (t !== -1 && index > 0) {
				// @ts-ignore
				if (index === 1) {
					if (target[t]?.['style']) {
						// @ts-ignore
						target[t].style = {
							// @ts-ignore
							...target[t].style,
							padding: 20,
						};
					}
					target = target[t];
				} else if (target.children) {
					if (target.children && target.children[t]?.['style']) {
						// @ts-ignore
						target.children[t].style = {
							// @ts-ignore
							...target.children[t].style,
							padding: 20,
						};
					}
					target = target.children[t];
				}
			}
		});

		if (!target.hasNoChildren && target.elementType !== 'inline') {
			const _data = dragData.actionData;
			if (_data?.['style'] && _data?.['style']?.['width'] === 375) {
				// @ts-ignore
				_data.style = {
					// @ts-ignore
					..._data.style,
					width: 'auto',
				};
			}

			if (_data) {
				if (target) _data['parent'] = deepCopy(target);
				if (!target?.['children']) target.children = [];
				target.children.push(_data);
				dispatch({
					type: 'data-update',
					payload: {
						data: origin,
					},
				});
			}
		}
	};

	const itemRender = function (item: any, index: number, proxyMargin?: string) {
		let style_dl: any = {};
		if (proxyMargin) {
			Object.keys(item.style).forEach((key) => {
				if (!key.includes('margin')) style_dl[key] = item.style[key];
			});
		}
		return (
			<item.type
				style={proxyMargin ? style_dl : item.style}
				key={`${preCls}-item${index}`}
				className={classNames({
					[`${preCls}-common-desc`]: true,
					[`${preCls}-common-desc-dragTarget`]: dragData.targetId === item.id,
					[`${preCls}-common-desc-active`]:
						config &&
						config['activePath'] &&
						config['activePath'].join(',') === path.concat(index).join(','),
				})}
				id={`data-item${path.concat(index).join(',')}`}
				onDragOver={(e: any) => onDragOver(index, e, item)}
				onDragLeave={(e: any) => onDragLeave(index, e, item)}
				onDrop={(e: any) => onDrop(e, index)}
				onClick={(e: any) => setActive(e, item, index)}
				{...item.props}
			>
				{item.hasNoChildren
					? undefined
					: deepRender({
							data: item.children,
							path: path.concat(index),
							dragCon,
							con,
							placeholder: item.placeholder,
					  })}
			</item.type>
		);
	};

	const getParentLayoutMode = function (parent: any, item: any) {
		if (!parent) {
			if (item.elementType === 'inline') return 'horizontal';
			return 'vertical';
		}
		const style = parent.style;
		if (style.display === 'flex' && style.flexDirection === 'column') {
			return 'vertical';
		} else if (style.display === 'flex') {
			return 'horizontal';
		} else {
			if (item.elementType === 'inline') return 'horizontal';
			return 'vertical';
		}
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
						target = target['children'][item];
					}
				}
			});
			target.children.splice(tp[tp.length - 1], 1);
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
						target = target['children'][item];
					}
				}
			});
			if (sortIndex < 0 || sortIndex > target.children.length - 1) return;
			const temp = target.children[tp[tp.length - 1] as any];

			target.children[tp[tp.length - 1] as any] = target.children[sortIndex];
			target.children[sortIndex] = temp;
		}

		setActive(e, item, sortIndex);

		dispatch({
			type: 'data-update',
			payload: {
				data: origin,
			},
		});
	};

	return (
		<>
			{data.map((item: any, index: number) => (
				<>
					{config &&
					config['activePath'] &&
					config['activePath'].join(',') === path.concat(index).join(',') ? (
						<div
							key={`${preCls}-wrapper${index}${item.dragTime}`}
							className={`${preCls}-wrapper`}
							style={
								item.elementType
									? {
											display: item.elementType,
											marginTop: item.style.marginTop,
											marginLeft: item.style.marginLeft,
											marginRight: item.style.marginRight,
											marginBottom: item.style.marginBottom,
											width: item.width,
									  }
									: {
											marginTop: item.style.marginTop,
											marginLeft: item.style.marginLeft,
											marginRight: item.style.marginRight,
											marginBottom: item.style.marginBottom,
											width: item.width,
									  }
							}
						>
							{item.elementType !== 'inline' ? (
								<div className={`${preCls}-tools`}>
									{getParentLayoutMode(item.parent, item) === 'vertical'
										? [
												<ArrowUpOutlined
													onClick={(e) => sortItem(path.concat(index), index - 1, e, item)}
												/>,
												<ArrowDownOutlined
													onClick={(e) => sortItem(path.concat(index), index + 1, e, item)}
												/>,
										  ]
										: [
												<ArrowLeftOutlined
													onClick={(e) => sortItem(path.concat(index), index - 1, e, item)}
												/>,
												<ArrowRightOutlined
													onClick={(e) => sortItem(path.concat(index), index + 1, e, item)}
												/>,
										  ]}
									<DeleteOutlined onClick={(e) => deleteItem(path.concat(index), e)} />
								</div>
							) : (
								''
							)}
							{itemRender(item, index, 'proxyMargin')}
						</div>
					) : (
						itemRender(item, index)
					)}
				</>
			))}
		</>
	);
}

function throllter(fn: any) {
	let flag = true;
	let timer: any;

	return function (...args: any) {
		if (flag) {
			fn(...args);
			flag = false;
		}

		if (!timer) {
			timer = setTimeout(() => {
				flag = true;
				timer = null;
			}, 30);
		}
	};
}
