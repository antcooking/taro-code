import { useState } from 'react'
import './index.less'

const preCls = 'cookCode-container'

export default function Container() {

  return <div className={`${preCls}`}>
    <div className={`${preCls}-main`}>
      <div className={`${preCls}-phone`}>

      </div>
    </div>
  </div>
}