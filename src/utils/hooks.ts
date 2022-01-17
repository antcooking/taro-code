import { useCallback, useRef, useEffect } from 'react'

function useThrottle(fn: any, delay: number, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      // @ts-ignore
      current.timer = setTimeout(() => {
         // @ts-ignore
        delete current.timer;
      }, delay);
       // @ts-ignore
      current.fn.call(this, ...args);
    }
  }, dep);
}

export { 
  useThrottle
}