/* eslint-disable no-redeclare */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
import React from 'react';
import { get, merge } from 'lodash';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
// import { useSwipeable } from 'react-swipeable';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Theme, useMediaQuery } from '@mui/material';
import useFormUI from '../hooks/useFormUI';
import useBlockHelpers from '../hooks/useBlockHelpers';
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
  const { injectInputProps, injectUploaderProps } = useBlockHelpers();

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
      const { error: scError, ...scProps } = injectInputProps(scBlock.input?.fieldName);
      section = (
        <Question
          {...(scBlock.input as QuestionInputProps)}
          error={scError}
          button={scBlock.button}
        >
          <CardSelect {...merge(scBlock, { input: scProps }) as SelectCardBlock} />
        </Question>
      );
      break;
    case 'select-choice':
      const selectBlock = content as SelectChoiceBlock;
      const { error: selectError, ...selectProps } = injectInputProps(selectBlock.input?.fieldName);
      section = (
        <Question
          {...(selectBlock.input as QuestionInputProps)}
          error={selectError}
          button={selectBlock.button}
        >
          <SelectChoice {...({ input: selectBlock.input, ...selectProps }) as unknown as SelectChoiceBlock} />
        </Question>
      );
      break;
    case 'text':
      const textBlock = content as TextInputBlock;
      const { error: textError, ...textProps } = injectInputProps(textBlock.input?.fieldName);
      section = (
        <Question
          {...(textBlock.input as QuestionInputProps)}
          error={textError}
          button={textBlock.button}
        >
          <TextInput {...merge(textBlock, { input: textProps }) as TextInputBlock} />
        </Question>
      );
      break;
    case 'uploader':
      const uploaderBlock = content as UploaderBlock;
      const { error: uploaderError, ...uploaderProps } = injectUploaderProps(uploaderBlock.input?.fieldName);
      section = (
        <Question
          {...(uploaderBlock.input as QuestionInputProps)}
          error={uploaderError}
          button={uploaderBlock.button}
        >
          <Uploader {...merge(uploaderBlock, { input: uploaderProps }) as UploaderBlock} />
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
