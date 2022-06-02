export function stringfirstToBig(str: string) { 
  return str.substring(0,1).toLocaleUpperCase() + str.substring(1)
}

export function stringfirstToSmall(str: string) { 
  return str.substring(0,1).toLocaleLowerCase() + str.substring(1)
}