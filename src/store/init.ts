import { Iinit } from './types';

const init: Iinit = {
  mode: 'edite',
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
    data: {
      title: '',
      data: [],
      style: {
        fontSize: 14,
        lineHeight: '30px',
      },
    },
    dataHistory: [],
  },
};

export default init;
