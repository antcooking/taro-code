export const rootFeature = {
	baseSetting: [
		{
			name: '页面设置',
			data: [
				{
					name: '页面标题',
					controller: 'Input',
					actionType: 'title',
				},
				{
					name: '背景颜色',
					controller: 'ColorPicker',
					actionType: 'style.backgroundColor',
				},
				{
					name: '上边距',
					controller: 'Slider',
					actionType: 'style.paddingTop',
					min: 0,
					max: 20,
				},
				{
					name: '下边距',
					controller: 'Slider',
					actionType: 'style.paddingBottom',
					min: 0,
					max: 20,
				},
				{
					name: '左边距',
					controller: 'Slider',
					actionType: 'style.paddingLeft',
					min: 0,
					max: 20,
				},
				{
					name: '右边距',
					controller: 'Slider',
					actionType: 'style.paddingRight',
					min: 0,
					max: 20,
				},
			],
		},
	],
};
