type Iinit = {
  type: 'phone' | 'desktop'
  phoneConfig: {
    width: number
    height: number
  }
  renderData?: unknown
}

const init: Iinit = {
  type: 'phone',
  phoneConfig: {
    width: 263,
    height: 467
  }
}

export default init