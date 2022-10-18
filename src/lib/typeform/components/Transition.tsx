import React from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade, { FadeProps } from '@mui/material/Fade';
import Grow, { GrowProps } from '@mui/material/Grow';
import { Animation } from '../types';

interface AnimationProps {
    animation?: Animation;
    children: React.ReactElement;
}

const Transition = ({ children, animation }: AnimationProps) => {
  let transition = children;

  switch (animation?.type) {
  case 'slide':
    transition = (
      <Slide
        direction="up"
        timeout={1000 * 1}
        in {...animation?.props as SlideProps}
      >
        {children}
      </Slide>
    );
    break;
  case 'fade':
    transition = (
      <Fade
        timeout={1000 * 1}
        in mountOnEnter unmountOnExit {...animation?.props as FadeProps}
      >
        {children}
      </Fade>
    );
    break;
  case 'grow':
    transition = (
      <Grow
        timeout={1000 * 2}
        in {...animation?.props as GrowProps}
      >
        {children}
      </Grow>
    );
    break;
  default:
    transition = children;
    break;
  }

  return transition;
};

export default Transition;
