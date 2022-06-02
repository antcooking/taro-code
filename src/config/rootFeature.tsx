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
					name: '类名(class)',
					controller: 'Input',
					actionType: 'className',
				},
				{
					name: '背景颜色',
					controller: 'ColorPicker',
					actionType: 'style.backgroundColor',
				},
				{
					name: '上边距',
					controller: 'InputNumber',
					actionType: 'style.paddingTop',
					min: 0,
					max: 60,
				},
				{
					name: '下边距',
					controller: 'InputNumber',
					actionType: 'style.paddingBottom',
					min: 0,
					max: 60,
				},
				{
					name: '左边距',
					controller: 'InputNumber',
					actionType: 'style.paddingLeft',
					min: 0,
					max: 60,
				},
				{
					name: '右边距',
					controller: 'InputNumber',
					actionType: 'style.paddingRight',
					min: 0,
					max: 60,
				},
			],
		},
	],
};
