import { Icontext } from '../../store/types';
import './index.less'

const preCls = 'cookCode-dataRender';

export default function (con: Icontext): JSX.Element {
  const { state: { render }, dispatch } = con
  const data = render.data?.data || []

  return <div className="cookCode-dataRender">
    {data.map((item: any, index: number) => (
      <div
        {...item} key={`${preCls}-item${index}`}
      >
        <item.type {...item} className={`${preCls}-common-desc`}>
        {item.type}({index})
        </item.type>
      </div>
    ))}
  </div>
}