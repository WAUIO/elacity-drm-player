import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

const useMounted = (): MutableRefObject<boolean> => {
  const mounted = useRef<boolean>(true);

  useEffect(
    () => (): void => {
      mounted.current = false;
    },
    []
  );

  return mounted;
};

export default useMounted;
