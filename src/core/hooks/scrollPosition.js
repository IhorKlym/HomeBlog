// @flow
import { useRef, useLayoutEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

function getScrollPosition({ element = null, useWindow = false }: { element?: any, useWindow: ?boolean }) {
  if (!isBrowser) return { left: 0, top: 0 };

  const target = element ? element.current : document.body;
  const position = target && target.getBoundingClientRect();

  return useWindow
    ? { left: window.scrollX, top: window.scrollY }
    : { left: position ? position.left : 0, top: position ? position.top : 0 };
}

export function useScrollPosition(effect: (any) => any, deps: ?any[] = [], element: ?any = null, useWindow: ?boolean = false, wait: ?number = 0) {
  const position = useRef<any>(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
}

export default { useScrollPosition };
