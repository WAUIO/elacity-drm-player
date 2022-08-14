import { useEffect } from 'react';

export interface KeepRatioOptions {
  ratio: number;
  el: HTMLElement;
}

export const useKeepRatio = (o: KeepRatioOptions) => {
  useEffect(() => {
    const { ratio, el } = o;
    const resizeElement = () => {
      if (!el) {
        return;
      }

      const width = el.offsetWidth;
      const height = width / ratio;
      el.style.height = `${height}px`;
    };

    resizeElement();

    el?.addEventListener('load', resizeElement);
    window.addEventListener('resize', resizeElement);
    return () => {
      window.removeEventListener('resize', resizeElement);
      el?.removeEventListener('load', resizeElement);
    };
  }, []);
};
