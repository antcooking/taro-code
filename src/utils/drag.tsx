import React, { createContext, useState, useCallback } from 'react';
interface Idata {
	targetId?: number;
	insertIndex?: number;
	actionData?: Record<string, any>;
	removePath?: number[];
	removeIndex?: number;
	targetPath?: number[];
	mouseMark?: {
		left: number;
		top: number;
		show: boolean;
		icon?: string;
	};
}
export type Icontext = {
	dragData: Idata;
	setDragData: (data?: Idata) => void;
};

const dragContext = createContext<Icontext>({} as Icontext);

const Provider_ = dragContext.Provider;

function DragProvider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const [dragData, setDragData_] = useState<Idata>({
		targetId: -1,
		actionData: undefined,
		targetPath: [-1],
		insertIndex: -1,
	});

	const setDragData = useCallback(
		function (data) {
			if (data) {
				setDragData_({
					...dragData,
					...data,
				});
			} else {
				setDragData_({
					targetId: -1,
					actionData: undefined,
					targetPath: [-1],
					insertIndex: -1,
				});
			}
		},
		[dragData, setDragData_]
	);

	// console.info(dragData, 'dragData*************************');

	return <Provider_ value={{ dragData, setDragData }}>{props.children}</Provider_>;
}

export { DragProvider, dragContext };
