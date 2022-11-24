/* eslint-disable no-redeclare */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
import React from 'react';
import { get } from 'lodash';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { isMobile as _isMobile } from '@elacity-js/lib';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useFormUI from '../hooks/useFormUI';
import { Block } from '../types';
import Transition from './Transition';
import { BlocGuessable } from './blocs';

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
  const { errors } = useFormikContext();
  const { currentStep } = useFormUI();
  const isMobile = _isMobile();

  const bl = React.useMemo(() => (currentStep?.blocks || []).length || 1, [currentStep?.blocks]);

  const blocks = React.useMemo(
    () => (!isMobile
      ? currentStep.blocks || []
      : (currentStep.blocks || [])
        .sort(
          (a: Block, b: Block) => parseInt(a.key.split('.').pop(), 10) - parseInt(b.key.split('.').pop(), 10)
        )),
    [currentStep?.blocks, stepIndex]
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
                <BlocGuessable key={block.key} {...block} padding={2} />
              ))}
            </Box>
          </Transition>
        </GridItem>
      )}

      {!isMobile && blocks.map((block: Block) => (
        <GridItem key={block.key} item xs={12} sm={12 / bl} md={12 / bl}>
          <Transition animation={block?.animation}>
            <Box>
              <BlocGuessable key={block.key} {...block} />
            </Box>
          </Transition>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Blocks;
