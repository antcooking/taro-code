import { Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './stepper.less'

export default function stepper(props: {
  value: number
  onChange: (e: any) => void
}) { 
  const { value, onChange } = props
  const [_value, setValue] = useState<number>(0)

  useEffect(function () { 
    setValue(value)
  }, [value])

  const _onChange = useCallback(function (e) { 
    setValue(Number(e.target.value))
  }, [])

  const add = useCallback(function () { 
    setValue(_value + 1)
    onChange(_value + 1)
  }, [_value])

  const dele = useCallback(function () { 
    setValue(_value - 1)
    onChange(_value - 1)
  }, [_value])

  const _onBlur = function () { 
    onChange(_value)
  }

  return (<div className="components-stepper">
    <div className="action-btn btn-prev" onMouseDown={dele}>
      <MinusOutlined />
    </div>
    <Input
      className="stepper-input"
      type="number"
      value={_value}
      onChange={_onChange}
      onBlur={_onBlur}
    />
    <div className="action-btn btn-next" onClick={add}>
      <PlusOutlined />
    </div>
  </div>
  )
}