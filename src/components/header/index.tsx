import './index.less'

const preCls = 'cookCode-header'

export default function Header() {
  return <div className={`${preCls}`}>
    <div className={`${preCls}-title`}>CookCode</div>
  </div>
}