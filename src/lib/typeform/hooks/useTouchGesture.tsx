import { useEffect, useState } from 'react';
// import useFormUI from './useFormUI';

const useTouchGesture = () => {
  const [touchstartX, setTouchstartX] = useState<number>();
  const [touchendX, setTouchendX] = useState<number>();
  const [touchstartY, setTouchstartY] = useState<number>();
  const [touchendY, setTouchendY] = useState<number>();

  // const { currentStep, setCurrentStep } = useFormUI();

  const handleGesture = () => {
    if (touchendX < touchstartX) {
      console.log('Swiped Left');
    }

    if (touchendX > touchstartX) {
      console.log('Swiped Right');
    }

    if (touchendY < touchstartY) {
      console.log('Swiped Up');
    }

    if (touchendY > touchstartY) {
      console.log('Swiped Down');
    }

    if (touchendY === touchstartY) {
      console.log('Tap');
    }
  };

  const handleTouchStart = (e) => {
    setTouchstartX(e.changedTouches[0].screenX);
    setTouchstartY(e.changedTouches[0].screenY);
  };

  const handleTouchEnd = (e) => {
    setTouchendX(e.changedTouches[0].screenX);
    setTouchendY(e.changedTouches[0].screenY);
    handleGesture();
  };

  useEffect(() => {
    document.body.addEventListener('touchstart', handleTouchStart, false);
    document.body.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      document.body.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
};

export default useTouchGesture;
