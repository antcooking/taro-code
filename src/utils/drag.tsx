import React, { createContext, useState, useCallback } from 'react';

interface Idata {
	targetId?: number;
	actionData?: Record<string, any> | null;
	targetPath?: number[];
}
export type Icontext = {
	dragData: Idata;
	setDragData: (data: Idata) => void;
};

const dragContext = createContext<Icontext>({} as Icontext);

const Provider_ = dragContext.Provider;

function DragProvider(props: { children: React.ReactNode | JSX.Element }): JSX.Element {
	const [dragData, setDragData_] = useState<Idata>({
		targetId: -1,
		actionData: null,
		targetPath: [],
	});

	const setDragData = useCallback(
		function (data) {
			setDragData_({
				...dragData,
				...data,
			});
		},
		[dragData, setDragData_]
	);

	console.info(dragData, 'dragData');

	return <Provider_ value={{ dragData, setDragData }}>{props.children}</Provider_>;
}

export { DragProvider, dragContext };
