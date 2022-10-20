/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
import React from 'react';
import { get } from 'lodash';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
// import { useSwipeable } from 'react-swipeable';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Theme, useMediaQuery } from '@mui/material';
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

const GridItem = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const GridContainer = styled(Grid)(() => ({
  height: 'calc(100vh - 136px)',
}));

interface BlocksProps {
  stepIndex: number
}

const Blocks = ({ stepIndex }: BlocksProps) => {
  const { values, errors } = useFormikContext();
  const { currentStep /* onPrevious, onNext */ } = useFormUI();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // Swipe action listener
  // @TODO: not yet sure if it works as expected, need to check
  /* const swipeHandlers = useSwipeable({
    onSwipedDown: () => onPrevious(),
    onSwipedUp: () => onNext?.({ forceValidation: false }),
    trackMouse: false,
    trackTouch: true,
    delta: 70,
  }); */

  // Resolve block content by type
  const resolveBlockContent = React.useCallback(({ content }: Block) => {
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
          error={errors[scBlock.input?.fieldName]}
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
          error={errors[selectBlock.input?.fieldName]}
          button={selectBlock.button}
        >
          <SelectChoice {...{ input: selectBlock.input } as SelectChoiceBlock} />
        </Question>
      );
      break;
    case 'text':
      const textBlock = content as TextInputBlock;
      section = (
        <Question
          {...(textBlock.input as QuestionInputProps)}
          error={errors[textBlock.input?.fieldName]}
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
          error={errors[uploaderBlock.input?.fieldName]}
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
  }, [stepIndex, values, errors]);

  const bl = (currentStep?.blocks || []).length || 1;

  const blocks = !isMobile
    ? currentStep.blocks || []
    : (currentStep.blocks || [])
      .sort(
        (a: Block, b: Block) => parseInt(a.key.split('.').pop(), 10) - parseInt(b.key.split('.').pop(), 10)
      );

  const haveError = React.useMemo(() => (currentStep.blocks || []).filter(
    (b: Block) => Boolean(errors[get(b, 'content.input.fieldName', 'none')])
  ).length > 0, [stepIndex, errors]);

  // Used only one grid in mobile view
  return (
    <GridContainer className={classNames({ 'shake-horizontal': haveError })} container spacing={1}>
      {isMobile && (
        <GridItem item xs={12}>
          <Transition animation={{ type: 'slide' }}>
            <Box>
              {blocks.map((block: Block) => (
                <Box display="flex" justifyContent="space-around" p={2}>
                  {resolveBlockContent(block)}
                </Box>
              ))}
            </Box>
          </Transition>
        </GridItem>
      )}

      {!isMobile && blocks.map((block: Block) => (
        <GridItem key={block.key} item xs={12} sm={12 / bl} md={12 / bl}>
          <Transition animation={block?.animation}>
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
