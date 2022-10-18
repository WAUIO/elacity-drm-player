/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@mui/material/Grid';
import { useSwipeable } from 'react-swipeable';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useFormUI from '../hooks/useFormUI';
import {
  Block, SelectCardBlock, StaticBlock,
} from '../types';
import Static from './fields/Static';
import CardSelect from './fields/CardSelect';
import Transition from './Transition';
import useViewport from '../hooks/useViewport';

const GridItem = styled(Grid)(() => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const GridContainer = styled(Grid)(() => ({
  height: '100%',
}));

const Blocks = () => {
  const { currentStep, setCurrentStep } = useFormUI();
  const { isMobile } = useViewport();

  // Swipe action listener
  // @TODO: not yet sure if it works as expected, need to check
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setCurrentStep(currentStep?.id + 1, 'up'),
    onSwipedUp: () => setCurrentStep(currentStep?.id - 1, 'down'),
    trackMouse: false,
    trackTouch: true,
    delta: 70,
  });

  // Resolve block content by type
  const resolveBlockContent = ({ content }: Block) => {
    const { type } = content;
    let section = null;
    switch (type) {
    case 'static':
      section = (
        <Static {...content as StaticBlock} />
      );
      break;
    case 'select-card':
      section = <CardSelect {...content as SelectCardBlock} />;
      break;
    case 'text':
      section = 'test';
      break;
    default:
      break;
    }

    return section;
  };

  // Used only one grid in mobile view
  return (
    <GridContainer container {...swipeHandlers}>
      {isMobile && (
        <GridItem item xs={12}>
          {(currentStep?.blocks || []).map((block: Block) => (
            <Transition animation={block.animation}>
              <Box display="flex" justifyContent="space-around" p={2}>
                {resolveBlockContent(block)}
              </Box>
            </Transition>
          ))}
        </GridItem>
      )}

      {!isMobile && (currentStep?.blocks || []).map((block: Block) => (
        <GridItem key={block.key} item xs={12} sm={12} md={6}>
          <Transition animation={block.animation}>
            <Box display="flex" justifyContent="space-around">
              {resolveBlockContent(block)}
            </Box>
          </Transition>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Blocks;
