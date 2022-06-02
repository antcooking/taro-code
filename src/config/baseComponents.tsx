export const baseComponents = [
	{
		type: 'div',
		name: '容器',
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_16_49/241.png',
		props: {
			style: {
				minHeight: 60,
				padding: 60,
				width: 750,
			},
			children: [],
		},
		featurePannel: {
			baseSetting: [
				{
					name: '样式设置',
					data: [
						{
							name: '类名(class)',
							controller: 'Input',
							actionType: 'className',
						},
						{
							name: '内边距',
							controller: 'InputNumber',
							actionType: 'style.padding',
							min: 0,
							max: 160,
						},
						{
							name: '背景颜色',
							controller: 'ColorPicker',
							actionType: 'style.backgroundColor',
						},
						{
							name: '上间距',
							controller: 'InputNumber',
							actionType: 'style.marginTop',
							min: 0,
							max: 160,
						},
						{
							name: '下间距',
							controller: 'InputNumber',
							actionType: 'style.marginBottom',
							min: 0,
							max: 160,
						},
						{
							name: '左间距',
							controller: 'InputNumber',
							actionType: 'style.marginLeft',
							min: 0,
							max: 160,
						},
						{
							name: '右间距',
							controller: 'InputNumber',
							actionType: 'style.marginRight',
							min: 0,
							max: 160,
						},
						{
							name: '宽度',
							controller: 'InputNumber',
							actionType: 'style.width',
							min: 0,
							max: 750,
						},
						{
							name: '高度',
							controller: 'InputNumber',
							actionType: 'style.height',
							min: 0,
							max: 550,
						},
					],
				},
			],
		},
	},
	{
		type: 'span',
		name: '文本',
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_16_02/46.png',
		props: {
			style: {
				display: 'block',
				lineHeight: 1.5,
				fontSize: 28,
			},
			children: '文本输入',
		},
		hasNoChildren: true,
		featurePannel: {
			baseSetting: [
				{
					name: '属性设置',
					data: [
						{
							name: '类名(class)',
							controller: 'Input',
							actionType: 'className',
						},
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
							controller: 'InputNumber',
							actionType: 'style.fontSize',
							min: 24,
							max: 48,
						},
						{
							name: '行高',
							controller: 'InputNumber',
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
									label: '小粗',
									value: 500,
								},
								{
									label: '大粗',
									value: 700,
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
							controller: 'InputNumber',
							actionType: 'style.marginLeft',
							min: 0,
							max: 60,
						},
						{
							name: '右间距',
							controller: 'InputNumber',
							actionType: 'style.marginRight',
							min: 0,
							max: 60,
						},
						{
							name: '上间距',
							controller: 'InputNumber',
							actionType: 'style.marginTop',
							min: 0,
							max: 60,
						},
						{
							name: '下间距',
							controller: 'InputNumber',
							actionType: 'style.marginBottom',
							min: 0,
							max: 60,
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
			src: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_15_23/33.png',
			style: {
				display: 'block',
				width: 600,
			},
		},
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_15_23/33.png',
		hasNoChildren: true,
		featurePannel: {
			baseSetting: [
				{
					name: '属性设置',
					data: [
						{
							name: '类名(class)',
							controller: 'Input',
							actionType: 'className',
						},
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
							controller: 'InputNumber',
							actionType: 'style.width',
							max: 750,
							min: 60,
						},
						{
							name: '高度',
							controller: 'InputNumber',
							actionType: 'style.height',
							max: 750,
							min: 60,
						},
						{
							name: '圆角',
							controller: 'InputNumber',
							actionType: 'style.borderRadius',
						},
					],
				},
			],
		},
	},
];
