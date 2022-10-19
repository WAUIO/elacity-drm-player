import {
  useEffect, useState, useCallback,
} from 'react';

const useSwipeable = () => {
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log('scrolling up');
      } else if (y < window.scrollY) {
        console.log('scrolling down');
      }
      setY(window.scrollY);
    }, [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);
};

export default useSwipeable;
