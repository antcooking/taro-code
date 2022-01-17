import * as Antd from 'antd';
import ColorPicker from './colorPicker';
import ImageUpload from './imageUpload';

const { TextArea } = Antd.Input;
const { Group } = Antd.Radio;

export default {
	ColorPicker,
	ImageUpload,
	TextArea,
	RadioGroup: Group,
	...Antd,
};
