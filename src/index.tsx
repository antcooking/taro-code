import ReactDom from 'react-dom';
import App from './app';
import * as vantui from '@antmjs/vantui';
import * as TaroComponents from '@tarojs/components';
import { defineCustomElements, applyPolyfills } from '@tarojs/components/loader';
//@ts-ignore
window.inner_iframe = [
	{
		name: 'vantui',
		data: Object.keys(vantui),
	},
	{
		name: '@taro/components',
		data: Object.keys(TaroComponents),
	},
];
//@ts-ignore
window['vantui'] = vantui;
//@ts-ignore
window['@taro/components'] = TaroComponents;

// init();
applyPolyfills().then(function () {
	defineCustomElements(window);
});

ReactDom.render(<App />, document.getElementById('root'));
