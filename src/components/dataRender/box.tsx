import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function Box(props: {
	index: number;
	item: any;
	children: React.ReactNode;
	moveBoxAction: any;
	_key: string;
}) {
	const ref = useRef<any>(null);
	const [{ handlerId }, drop] = useDrop({
		accept: 'renderBox',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: any, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = props.index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset: any = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			props.moveBoxAction(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'renderBox',
		item: () => {
			return { id: props.item.id, index: props.index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

	return (
		<div 
      ref={ref} 
      key={props.item.id}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
			{props.children}
		</div>
	);
}
