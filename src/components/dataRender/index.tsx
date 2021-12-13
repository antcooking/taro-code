import { useCallback } from 'react';
import { Icontext } from '../../store/types';
import deepCopy from '../../utils/deepcopy';
import Box from './box'

export default function (con: Icontext): JSX.Element {
  const { state: { render }, dispatch } = con
  const data = render.data?.data || []

  const moveBoxAction = useCallback((dragIndex, hoverIndex) => {
    const dragBox = data[dragIndex];
    const d = deepCopy(con.state.render.data)
    d.data.splice(dragIndex, 1)
    d.data.splice(hoverIndex, 0, dragBox)

    dispatch({
      type: 'data-update',
      payload: {
        ...d
      }
    })
  }, [con, dispatch]);

  return <>
    {data.map((item: any, index: number) => (
      <Box 
        _key={item.type + index}
        moveBoxAction={moveBoxAction}
        index={index}
        item={item}
        key={item.type + index}
      >
        <item.type {...item}>
          {item.id}
        </item.type>
      </Box>
    ))}
  </>
}