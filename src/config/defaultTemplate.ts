import { stringfirstToBig } from '../utils/common'

type Iparams = {
  reactApi: Array<string>
  imports: string
  states: Record<string, any>
  functions: string
  pageName?: string
  jsx: string
  mockData: string
}

export function getDefaultPage(params: Iparams) {
  const {
    pageName = 'default',
    jsx,
    // reactApi,
    states = '',
    imports = '',
    functions = '',
    mockData = ''
  } = params

  return `
  import { useState, useCallback } from 'react';
  ${imports}
  ${mockData}

  function ${stringfirstToBig(pageName)}() {
    const [state, changeState] = useState(${JSON.stringify(states).replace('["', '[').replace('"]', ']')})

    const setState = useCallback(function(stateNext) {

      
      changeState({ 
        ...state, 
        ...stateNext
       })
    }, [state])

    ${functions}

    return (
      <View className="pages-${pageName}-index">${jsx}
      </View>
    )
  }
  `
}

