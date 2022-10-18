import React from 'react';
import Box from '@mui/material/Box';
import { StaticBlock } from '../../types';
import { BtnNext } from '../Buttons';

interface StaticProps extends StaticBlock {}

const Static = ({ input, button }: StaticProps) => (
  <Box>
    {input}
    {button && <BtnNext {...button} />}
  </Box>
);

export default Static;
