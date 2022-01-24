export default function getComponent(type: string) { 
  if (type.includes('.')) { 
    let target: any = window
    type.split('.').forEach(key => { 
      target = target[key]
    })

    return target
  } else return type
}