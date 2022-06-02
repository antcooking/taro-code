import { useCallback, useContext } from 'react';
import { dragContext } from '../../utils/drag';
import './index.less';

export default function MouseMark(): JSX.Element {
	const { dragData, setDragData } = useContext(dragContext);
	const { left, top, show, icon } = dragData.mouseMark || {};

	const onDrag = useCallback(
		function () {
			requestIdleCallback(() => {
				setDragData({
					// @ts-ignore
					mouseMark: {
						...dragData.mouseMark,
						show: false,
					},
				});
			});
		},
		[dragData.mouseMark, setDragData]
	);

	if (show) {
		return (
			<div draggable className="drag-mouse-mark" style={{ left, top }} onDragStart={onDrag}>
				<img src={icon || ''} />
			</div>
		);
	} else return <></>;
}
