import { Iinit } from './types';

const init: Iinit = {
	type: 'phone',
	phoneConfig: {
		width: 375,
		height: 667,
		scale: 1,
	},
	desktopConfig: {
		width: 1920,
		height: 1080,
		scale: 1,
	},
	render: {
		histroyIndex: 0,
		data: {},
		dataHistory: [],
	},
};

export default init;
