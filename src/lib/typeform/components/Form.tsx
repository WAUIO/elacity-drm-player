import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { BtnController } from './Buttons';
import Blocks from './Blocks';

const Wrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
}));

interface FormProps {
  stepIndex: number;
}

const Form = ({ stepIndex }: FormProps) => (
  <Wrapper>
    <Blocks stepIndex={stepIndex} />

    <BtnController />
  </Wrapper>
);

export default Form;
