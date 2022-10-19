import React from 'react';
import Box from '@mui/material/Box';
import { StaticBlock } from '../../types';
import { BtnNext } from '../Buttons';

interface StaticProps extends StaticBlock {}

const Static = ({ input, button }: StaticProps) => (
  <Box sx={{ maxWidth: '80%', height: 'auto' }}>
    {input}
    {button && <BtnNext {...button} />}
  </Box>
);

export default Static;
