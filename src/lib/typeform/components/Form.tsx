import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { BtnController } from './Buttons';
import Blocks from './Blocks';

const Wrapper = styled(Box)(() => ({
  // position: 'absolute',
  width: '100%',
  height: '100%',
}));

const Form = () => (
  <Wrapper>
    <Blocks />

    <BtnController />
  </Wrapper>
);

export default Form;
