import { Icontext } from '../../store/types';


export default function (con: Icontext): JSX.Element {
  const { state: { render }, dispatch } = con
  const data = render.data?.data || []

  return <>
    {data.map((item: any) => (
      <item.type {...item}>
        {item.id}
      </item.type>
    ))}
  </>
}