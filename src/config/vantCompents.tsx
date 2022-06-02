export const VantComponents = [
	{
		type: 'vantui.Button',
		name: '按钮',
		hasNoChildren: true,
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_13_37/44.png',
		props: {
			style: {},
			children: ['点击按钮'],
			type: 'primary',
		},
		featurePannel: {
			baseSetting: [
				{
					name: '按钮-属性设置',
					data: [
						{
							name: '类名(class)',
							controller: 'Input',
							actionType: 'className',
						},
						{
							name: '按钮标题',
							controller: 'Input',
							actionType: 'children',
						},
						{
							name: '按钮类型',
							controller: 'RadioGroup',
							actionType: 'type',
							options: [
								{
									label: '默认',
									value: 'default',
								},
								{
									label: '主要按钮',
									value: 'primary',
								},
								{
									label: '信息按钮',
									value: 'info',
								},
								{
									label: '警告按钮',
									value: 'warning',
								},
								{
									label: '危险',
									value: 'danger',
								},
							],
						},
					],
				},
				{
					name: '样式设置',
					data: [
						{
							name: '上间距',
							controller: 'InputNumber',
							actionType: 'style.marginTop',
							min: 0,
							max: 40,
							unit: 'px',
						},
						{
							name: '下间距',
							controller: 'InputNumber',
							actionType: 'style.marginBottom',
							min: 0,
							max: 40,
							unit: 'px',
						},
						{
							name: '左间距',
							controller: 'InputNumber',
							actionType: 'style.marginLeft',
							min: 0,
							max: 40,
							unit: 'px',
						},
						{
							name: '右间距',
							controller: 'InputNumber',
							actionType: 'style.marginRight',
							min: 0,
							max: 40,
							unit: 'px',
						},
						{
							name: '宽度',
							controller: 'InputNumber',
							actionType: 'style.width',
							min: 0,
							max: 750,
							unit: 'px',
						},
						{
							name: '高度',
							controller: 'InputNumber',
							actionType: 'style.height',
							min: 0,
							max: 550,
							unit: 'px',
						},
					],
				},
			],
		},
	},
	{
		type: 'vantui.Card',
		hasNoChildren: true,
		name: '商品',
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_14_29/402.png',
		props: {
			style: {},
			num: '2',
			tag: '标签',
			price: '10.00',
			desc: '描述信息',
			title: '商品标题',
			thumb: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_14_29/402.png',
		},
		featurePannel: {
			baseSetting: [
				{
					name: '商品-属性设置',
					data: [
						{
							name: '类名(class)',
							controller: 'Input',
							actionType: 'className',
						},
						{
							name: '商品标题',
							controller: 'Input',
							actionType: 'title',
						},
						{
							name: '商品图片',
							controller: 'ImageUpload',
							actionType: 'thumb',
						},
						{
							name: '商品价格',
							controller: 'Input',
							actionType: 'price',
						},
						{
							name: '商品标签',
							controller: 'Input',
							actionType: 'tag',
						},
						{
							name: '数量',
							controller: 'InputNumber',
							actionType: 'num',
						},
						{
							name: '描述信息',
							controller: 'TextArea',
							actionType: 'desc',
						},
					],
				},
			],
		},
	},
	{
		type: 'vantui.Area',
		hasNoChildren: true,
		name: '地区',
		icon: 'https://file-mg.dian.so/v/taowu/2022/05/26/18_13_08/371.png',
		props: {
			style: {},
			value: '110101',
			areaList: {
				province_list: {
					110000: '北京市',
					120000: '天津市',
				},
				city_list: {
					110100: '北京市',
					120100: '天津市',
				},
				county_list: {
					110101: '东城区',
					110102: '西城区',
				},
			},
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
							max: 40,
							unit: 'px',
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
							max: 40,
							unit: 'px',
						},
						{
							name: '下间距',
							controller: 'InputNumber',
							actionType: 'style.marginBottom',
							min: 0,
							max: 40,
							unit: 'px',
						},
					],
				},
			],
		},
	},
];
