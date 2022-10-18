import React from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { BtnController } from './Buttons';
import Blocks from './Blocks';

const Wrapper = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
}));

const Form = () => (
  <Wrapper>
    <Helmet>
      <title>Form | Elacity Media</title>
    </Helmet>

    <Blocks />

    <BtnController />
  </Wrapper>
);

export default Form;
