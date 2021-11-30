import React, { useCallback, useContext } from 'react';
import context from '../../store/context';
import { useDrag } from 'react-dnd';
import deepCopy from '../../utils/deepcopy';

export default function Box(params: {
  data: any,
  children: React.ReactNode
  className: string
  key: string
}) {
  const { data, children, className } = params
  const { dispatch, state } = useContext(context)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        commonAction(item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const commonAction = useCallback(function (item) {
    const data = deepCopy(state.render.data.data)
    item.id = new Date().getTime()
    data.push(item)
    dispatch({
      type: 'data-update',
      payload: {
        data
      }
    })
  }, [])

  const opacity = isDragging ? 1 : 0.7;

  return (<div
    ref={drag}
    role="Box"
    style={{ opacity }}
    className={className}
  >
    {children}
  </div>);
};
