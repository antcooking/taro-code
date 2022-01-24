type Iparams = {
  jsxStr: string
  importStr: string
}

export const createPage = function (params: Iparams) { 
  const { jsxStr, importStr } = params
  return `
${importStr}
export function Page() { 
  return ${jsxStr}
}`
}