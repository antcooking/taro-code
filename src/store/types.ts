export type IrData = {
	data: any;
	prev?: IrData;
	next?: IrData;
	length?: number;
};

export type Iinit = {
	type: 'phone' | 'desktop';
	phoneConfig?: {
		width?: number;
		height?: number;
	} & Record<string, unknown>;
	desktopConfig?: {
		width?: number;
		height?: number;
	} & Record<string, unknown>;
	renderData?: IrData;
};
