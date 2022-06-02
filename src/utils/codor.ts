import { getDefaultPage } from '../config/defaultTemplate';
import { format } from 'prettier';
import parserBabel from 'prettier/esm/parser-babel.mjs';
import transformCss from 'transform-css'

const importMap: any = {};
const defaultMap = {
	span: 'Text',
	input: 'Input',
	div: 'View',
	img: 'Image',
};

const classNameMap: any = {};

export function createCode(main: any): { jsCode: string; lessCode: string } {
	let states: any = {};
	let imports = '';
	let jsx = ``;
	let functions = ``;
	let mockData = ``;
	let cssCode = ``;  
  cssCode += `.${main.className || 'default'} ${transfromStyleObj(main.props.style)}\n`

	function deepRead(item: any, preClass?: string): any {
		if (typeof item === 'string') return item;
		getImports(item.type);
		if (item.type) {
			let res = '';
			let key = '';
			if (item.muilt) {
				key = 'data' + Date.now();
				const ps: any = {};
				item.muiltFields.forEach((key: string) => {
					ps[key] = item.props[key];
				});
				delete ps.style;
				delete ps.children;
				mockData += `const ${getComName(item.type)}Data_${key} = ${JSON.stringify(ps)}`;
				states[key] = [];
				for (let i = 0; i < item.muilt; i++) {
					states[key].push(`${getComName(item.type)}Data_${key}`);
				}
				states[key] = [`${states[key].join(',')}`];
      }

      let originClassName = item.props.className

      if (!originClassName) { 
        item.props.className = item.props.className || getDefaultClassName(item.type)
       originClassName = item.props.className
        if (preClass) { 
          item.props.className = preClass + '-' + item.props.className
          item.props.className = transformLongClassName(item.props.className, 2)
        }
      }
      
      if(Object.keys(item.props.style).length) cssCode += `.${preClass} .${item.props.className} ${transfromStyleObj(item.props.style)}\n`

			res += `\n<${getComName(item.type)} ${!key ? getAttrStr(item.props) : getAttrStrWidthState(item.props, item.muiltFields) }>`;

			if (item.props.children && Array.isArray(item.props.children)) {
				item.props.children.forEach((it: any) => {
					res += deepRead(it, item.props.className);
				});
			} else if (typeof item.props.children === 'string') {
				res += item.props.children;
			}

			res += `\n</${getComName(item.type)}>`;

			if (key) {
				res = `{
            state["${key}"].map(item => (
              ${res}
            ))
          }`;
			}
			return res;
		}
	}

	jsx = main.data
		.map((it: any) => deepRead(it, main.className || 'default'))
		.join('\n');

	Object.keys(importMap).map((key) => {
		let comps = importMap[key]
			.filter((item: any, index: number) => importMap[key].indexOf(item) === index)
			.join(',');
		if (key === 'vantui') key = '@antmjs/vantui';

		imports += `import { ${comps} } from "${key}"\n`;
	});

	const jsCode = formatCode(
		getDefaultPage({ jsx, imports, functions, states, reactApi: [], mockData })
  );
  
	return {
		jsCode,
		lessCode: transformCss(cssCode),
	};
}

function getComName(a: string) {
	if (a.includes('.')) {
		const arr = a.split('.');
		return arr[arr.length - 1];
	} else {
		// @ts-ignore
		return defaultMap[a] || a;
	}
}

function getImports(a: string) {
	if (a.includes('.')) {
		const arr = a.split('.');
		if (arr && arr[0] && arr[1]) {
			if (!importMap[arr[0]]) importMap[arr[0]] = [];

			importMap[arr[0]].push(arr[1]);
		}
	} else {
		if (!importMap['@taro/components']) importMap['@taro/components'] = [];
		// @ts-ignore
		importMap['@taro/components'].push(defaultMap[a] || a);
	}
}

function getAttrStr(props: any) {
	let attr = '';
	Object.keys(props).map((key) => {
		if (key !== 'style' && key !== 'children') {
			let value;
			if (typeof props[key] === 'string') {
				value = `"${props[key]}"`;
			} else {
				value = `{${JSON.stringify(props[key])}}`;
			}
			attr += `${key}=${value}  `;
		}
	});
	return attr;
}

function getAttrStrWidthState(props: any, fromState: string[]) {
	let attr = '';
	Object.keys(props).map((key) => {
		if (key !== 'style' && key !== 'children' && !fromState.includes(key)) {
			let value;
			if (typeof props[key] === 'string') {
				value = `"${props[key]}"`;
			} else {
				value = `{${JSON.stringify(props[key])}}`;
			}
			attr += `${key}=${value}  `;
		} else if(key !== 'style' && key !== 'children') { 
			attr += `${key}={item.${key}}  `;
		}
	});
	return attr;
}

function formatCode(codes: string) {
	try {
		return format(codes, {
			parser: 'babel',
			plugins: [parserBabel],
		});
	} catch (e) {
		console.info('error:', e);
		alert('编译错误');
		return codes;
	}
}

const withPxStyles = [
	'padding',
	'margin',
	'width',
	'height',
	'font-size',
	'left',
	'top',
	'right',
  'bottom',
  'border-radius'
];

function transfromStyleObj(styleObj: Record<string, any>) {
	let res = '{';
	for (let key in styleObj) {
		let useKey = key;
		let value = styleObj[key];
		if (/[A-Z]/.test(key)) {
			useKey = transformStyleKey(key);
		}
		if (
			withPxStyles.filter((item) => useKey.indexOf(item) === 0).length > 0 &&
			!`${value}`.includes('px')
		) {
			value = value + 'px';
		}
		res += `${useKey}: ${value};`;
	}

	if (res.length > 1) {
		return res + '}';
	}

	return '';
}

function transformStyleKey(name: string) {
	let copyName = name.toLowerCase();
	let index = 0;
	let str = '';
	while (index != name.length) {
		if (copyName[index] !== name[index]) {
			str = str + '-' + copyName[index];
		} else {
			str += copyName[index];
		}
		index++;
	}
	return str;
}

function getDefaultClassName(name: string) { 
  // @ts-ignore
  let name_ = `${defaultMap[name] || name}`.replace('.', '__').toLocaleLowerCase()
  if (classNameMap[name_] !== undefined) {
    name_ +=  classNameMap[name_] + 1
    classNameMap[name_] += 1
  } else { 
    classNameMap[name_] = 0
  }

  return name_
}


function transformLongClassName(name: string, max: number) { 
  if (!name.includes('-')) {
    return name
  } else { 
    const arr = name.split('-')
    if (arr.length < max + 1) { 
      return name
    }
    return arr.slice(arr.length - max).join('-')
  }
}
