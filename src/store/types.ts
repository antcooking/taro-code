import React from 'react';

export type Iaction = {
	type:
	| 'data-update'
	| 'data-prev'
	| 'data-next'
	| 'config'
	| 'setting-drawer'
	payload?: Record<string, unknown>;
};

export type IReducer = React.Reducer<Iinit, Iaction>;

export type Icontext = {
	state: Iinit;
	dispatch: React.Dispatch<Iaction>;
};

export type IrData = {
	title: string;
	data: Array<Record<string, unknown>>;
}

export type IsettingDrawerConfig = {
	with?: number
	height?: number
	className?: string
} & Record<string, unknown>

export type Iinit = {
	type: 'phone' | 'desktop';
	settingDrawer?: {
		visible: boolean;
		config: Record<string, unknown>;
	}
	phoneConfig: {
		width: number;
		height: number;
		scale: number;
	} & Record<string, unknown>;
	desktopConfig: {
		width: number;
		height: number;
		scale: number;
	} & Record<string, unknown>;
	render: {
		data: IrData;
		dataHistory: Array<IrData> | [];
		histroyIndex: number;
	};
};
