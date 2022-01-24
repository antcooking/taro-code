const pxProps = [
  {
    type: 'InputNumber',
    label: '最小值',
    fieldName: 'min'
  },
  {
    type: 'InputNumber',
    label: '最大值',
    fieldName: 'max'
  },
  {
    type: 'Input',
    label: '单位(非必填)',
    fieldName: 'unit'
  }
]

export const featureComponents = [
  {
    name: '文本输入框(Input)',
    key: 'Input',
  },
  {
    name: '数字输入框(InputNumber)',
    key: 'InputNumber',
    props: pxProps
  },
  {
    name: '滑动选择(Slider)',
    key: 'Slider',
    props: pxProps
  },
  {
    name: '开关(Switch)',
    key: 'Switch',
  },
  {
    name: '取色面板(ColorPicker)',
    key: 'ColorPicker',
  },
  {
    name: '图片上传(ImageUpload)',
    key: 'ImageUpload',
    props: [
      {
        type: 'Switch',
        label: '开启截图',
        fieldName: 'crop'
      },
      {
        type: 'InputNumber',
        label: '截图宽高比例',
        fieldName: 'aspect',
        ifShow: ['crop', true],
      },
    ]
  },
  {
    name: '单选框(RadioGroup)',
    key: 'RadioGroup',
  },
]

export const defaultBaseSettingItem = {
  name: '',
  data: [
    {
      name: '',
      controller: undefined,
      actionType: '',
    },
  ],
}

export const defaultAttrItem = {
  name: '',
  controller: undefined,
  actionType: '',
}

export const defaultComponentsInfo = {
  name: '',
  icon: '',
  type: '',
  props: {
    style: {},
    children: [],
  },
  featurePannel: {
    baseSetting: [
      {
        name: '',
        data: [
          {
            name: '',
            controller: undefined,
            actionType: '',
          },
        ],
      },
    ],
  },
}