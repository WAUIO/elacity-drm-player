import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { StaticBlock } from '../../types';
import { BtnNext } from '../Buttons';

interface StaticProps extends StaticBlock {}

const StaticWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '80%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const Static = ({ input, button }: StaticProps) => (
  <StaticWrapper>
    {input}
    {button && <BtnNext {...button} />}
  </StaticWrapper>
);

export default Static;
