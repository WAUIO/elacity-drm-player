/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
import React from 'react';
import Grid from '@mui/material/Grid';
import { useSwipeable } from 'react-swipeable';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useFormUI from '../hooks/useFormUI';
import {
  QuestionInputProps,
  Block,
  SelectCardBlock,
  StaticBlock,
  UploaderBlock,
  TextInputBlock,
  SelectChoiceBlock,
} from '../types';
import Static from './fields/Static';
import CardSelect from './fields/CardSelect';
import SelectChoice from './fields/SelectChoice';
import Uploader from './fields/Uploader';
import TextInput from './fields/TextInput';
import Transition from './Transition';
import Question from './Question';
import useViewport from '../hooks/useViewport';

const GridItem = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const GridContainer = styled(Grid)(() => ({
  height: 'calc(100vh - 136px)',
}));

const Blocks = () => {
  const { currentStep, onPrevious, onNext } = useFormUI();
  const { isMobile } = useViewport();

  // Swipe action listener
  // @TODO: not yet sure if it works as expected, need to check
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onPrevious(),
    onSwipedUp: () => onNext(),
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
      const staticBlock = content as StaticBlock;
      section = (
        <Static {...staticBlock as StaticBlock} />
      );
      break;
    case 'select-card':
      const scBlock = content as SelectCardBlock;
      section = (
        <Question
          {...(scBlock.input as QuestionInputProps)}
          button={scBlock.button}
        >
          <CardSelect {...scBlock as SelectCardBlock} />
        </Question>
      );
      break;
    case 'select-choice':
      const selectBlock = content as SelectChoiceBlock;
      section = (
        <Question
          {...(selectBlock.input as QuestionInputProps)}
          button={selectBlock.button}
        >
          <SelectChoice {...selectBlock as SelectChoiceBlock} />
        </Question>
      );
      break;
    case 'text':
      const textBlock = content as TextInputBlock;
      section = (
        <Question
          {...(textBlock.input as QuestionInputProps)}
          button={textBlock.button}
        >
          <TextInput {...textBlock as TextInputBlock} />
        </Question>
      );
      break;
    case 'uploader':
      const uploaderBlock = content as UploaderBlock;
      section = (
        <Question
          {...(uploaderBlock.input as QuestionInputProps)}
          button={uploaderBlock.button}
        >
          <Uploader {...uploaderBlock as UploaderBlock} />
        </Question>
      );
      break;
    default:
      break;
    }

    return section;
  };

  // Used only one grid in mobile view
  return (
    <Transition animation={currentStep?.animation || { type: 'slide' }}>
      <GridContainer container {...swipeHandlers} spacing={1}>
        {isMobile && (
          <GridItem item xs={12}>
            {(currentStep?.blocks || []).map((block: Block) => (
              <Box display="flex" justifyContent="space-around" p={2}>
                {resolveBlockContent(block)}
              </Box>
            ))}
          </GridItem>
        )}

        {!isMobile && (currentStep?.blocks || []).map((block: Block) => (
          <GridItem key={block.key} item xs={12} sm={12} md={6}>
            <Box display="flex" justifyContent="space-around">
              {resolveBlockContent(block)}
            </Box>
          </GridItem>
        ))}
      </GridContainer>
    </Transition>
  );
};

export default Blocks;
