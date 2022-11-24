import React, { CSSProperties } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { StaticBlock } from '../../types';
import { BtnNext } from '../Buttons';

interface StaticProps extends StaticBlock {}

const StaticWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'maxWidth',
})<BoxProps & {maxWidth?: CSSProperties['maxWidth']}>(({ theme, maxWidth }) => ({
  maxWidth: maxWidth || '80%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const Static = ({ input, button, maxWidth }: StaticProps) => (
  <StaticWrapper maxWidth={maxWidth}>
    {input}
    {button && <BtnNext {...button} />}
  </StaticWrapper>
);

export default Static;
