import { Iinit } from './types';
import { baseComponents } from '../config/baseComponents'

const init: Iinit = {
  type: 'phone',
  featurePannel: {},
  componentsPannel: [
    {
      name: '基础组件',
      data: baseComponents
    }
  ],
  phoneConfig: {
    width: 375,
    minHeight: 667,
    scale: 1,
  },
  desktopConfig: {
    width: 1920,
    height: 1080,
    scale: 1,
  },
  render: {
    histroyIndex: 0,
    mode: 'edite',
    data: {
      title: '',
      state: {},
      data: [],
      props: {
        style: {
          fontSize: 14,
          lineHeight: '30px',
        },
      }
    },
    dataHistory: [],
  },
};

export default init;
