import getComponent from './getComponent';

export function createCode(data: any) {
	let importStr = `import { View } from '@tarojs/components';`;
  let jsxStr = `<View className='page-container'>`;
  function run(_dataItem: any) { 
    for (let i = 0; i < _dataItem.length; i++) {
      const item = _dataItem[i];
      if (/[a-z]/.test(item.type[0])) {
        item.type = item.type.replace('div', 'View').replace('span', 'View').replace('img', 'Image');
      }
      
      if (item.type.includes('.')) { 
        const res = item.type.split('.')
        item.type = res[1]
        importStr = `import { ${res[1]} } from "${res[0]}";`
      }

      function attrRun() { 
        let attrStr = "";
      }
  
  
    }
  }
}
