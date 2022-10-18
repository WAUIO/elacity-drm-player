import React from 'react';
import Box from '@mui/material/Box';
import { SelectCardBlock } from '../../types';
import { BtnNext } from '../Buttons';
import Title from '../Title';

interface CardSelectProps extends SelectCardBlock {}

const CardSelect = ({ input, button }: CardSelectProps) => (
  <Box>
    <Title indicator={input.indicator}>{input.title}</Title>

    {button && <BtnNext {...button} />}
  </Box>
);

export default CardSelect;
