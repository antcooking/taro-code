export const baseComponents = [
	{
		type: 'div',
		name: '容器',
		placeholder: null,
		icon: 'https://file-mg.dian-dev.com/c/taowu/2022/01/14/18_16_46/272.png',
		props: {
			style: {
				minHeight: 80,
				padding: 20,
			},
			children: [],
		},
		featurePannel: {
			baseSetting: [
				{
					name: '样式设置',
					data: [
						{
							name: '内边距',
							controller: 'Slider',
							actionType: 'style.padding',
							min: 0,
							max: 20,
						},
						{
							name: '背景颜色',
							controller: 'ColorPicker',
							actionType: 'style.backgroundColor',
						},
						{
							name: '上间距',
							controller: 'Slider',
							actionType: 'style.marginTop',
							min: 0,
							max: 20,
						},
						{
							name: '下间距',
							controller: 'Slider',
							actionType: 'style.marginBottom',
							min: 0,
							max: 20,
						},
					],
				},
			],
		},
	},
	{
		type: 'span',
		name: '文本',
		icon: 'https://file-mg.dian-dev.com/c/taowu/2022/01/14/18_17_37/174.png',
		props: {
			style: {
				display: 'block',
				lineHeight: 1.5,
				fontSize: 14,
			},
			children: '文本输入',
		},
		exceptChildren: null,
		featurePannel: {
			baseSetting: [
				{
					name: '属性设置',
					data: [
						{
							name: '文本内容',
							controller: 'TextArea',
							actionType: 'children',
						},
					],
				},
				{
					name: '样式设置',
					data: [
						{
							name: '字体大小',
							controller: 'Slider',
							actionType: 'style.fontSize',
							min: 12,
							max: 24,
						},
						{
							name: '行高',
							controller: 'Slider',
							actionType: 'style.lineHeight',
							min: 1,
							max: 3,
							step: 0.1,
						},
						{
							name: '字体粗细',
							controller: 'RadioGroup',
							actionType: 'style.fontWeight',
							optionType: 'button',
							options: [
								{
									label: '正常',
									value: 400,
								},
								{
									label: '加粗',
									value: 500,
								},
							],
						},
						{
							name: '对齐方式',
							controller: 'RadioGroup',
							actionType: 'style.textAlign',
							// optionType: 'button',
							options: [
								{
									label: '居左对齐',
									value: 'left',
								},
								{
									label: '居中对齐',
									value: 'center',
								},
								{
									label: '居右对齐',
									value: 'right',
								},
								{
									label: '两端对齐',
									value: 'justify',
								},
							],
						},
						{
							name: '字体颜色',
							controller: 'ColorPicker',
							actionType: 'style.color',
						},
						{
							name: '左间距',
							controller: 'Slider',
							actionType: 'style.marginLeft',
							min: 0,
							max: 20,
						},
						{
							name: '右间距',
							controller: 'Slider',
							actionType: 'style.marginRight',
							min: 0,
							max: 20,
						},
						{
							name: '上间距',
							controller: 'Slider',
							actionType: 'style.marginTop',
							min: 0,
							max: 20,
						},
						{
							name: '下间距',
							controller: 'Slider',
							actionType: 'style.marginBottom',
							min: 0,
							max: 20,
						},
					],
				},
			],
		},
	},
	{
		type: 'img',
		name: '图片',
		props: {
			src: 'data:image/png;base64,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',
			style: {
				display: 'block',
				width: '100%',
			},
		},
		icon: 'https://file-mg.dian-dev.com/c/taowu/2022/01/14/18_18_10/61.png',
		hasNoChildren: true,
		featurePannel: {
			baseSetting: [
				{
					name: '属性设置',
					data: [
						{
							name: '图片上传',
							controller: 'ImageUpload',
							actionType: 'src',
						},
					],
				},
				{
					name: '样式设置',
					data: [
						{
							name: '宽度',
							controller: 'Slider',
							actionType: 'style.width',
							max: 375,
							min: 30,
						},
						{
							name: '高度',
							controller: 'Slider',
							actionType: 'style.height',
							max: 375,
							min: 30,
						},
						{
							name: '圆角',
							controller: 'Slider',
							actionType: 'style.borderRadius',
						},
					],
				},
			],
		},
	},
];
