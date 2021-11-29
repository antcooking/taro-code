import { Icontext } from '../../store/types'

export default function (con: Icontext): JSX.Element {
  const { render: { data: { data } } } = con.state

  return <>
    {data.map((item: any) => (
      <div>
        <item.type {...item} />
      </div>
    ))}
  </>
}