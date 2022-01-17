import React from 'react';

export type Iaction = {
	type:
	| 'data-update'
	| 'data-prev'
	| 'data-next'
	| 'config'
	| 'setting-drawer'
	| 'featurePannel-update'
	| 'config-mode'
	| 'page-update'
	payload?: Record<string, any>;
};

export type IReducer = React.Reducer<Iinit, Iaction>;

export type Icontext = {
	state: Iinit;
	dispatch: React.Dispatch<Iaction>;
};

export type IrData = {
	title: string;
	data: Array<Record<string, any>>;
	props: {
		style: Record<string, any>;
	}
	state: Record<string, any>;
}

export type Iinit = {
	type: 'phone' | 'desktop';
	featurePannel: Record<string, any>;
	componentsPannel: Array<Record<string, any>>;
	phoneConfig: {
		width: number;
		minHeight: number;
		scale: number;
	} & Record<string, any>;
	desktopConfig: {
		width: number;
		height: number;
		scale: number;
	} & Record<string, any>;
	render: {
		data: IrData;
		dataHistory: Array<IrData> | [];
		histroyIndex: number;
		mode: 'edite' | 'preview';
	};
};
