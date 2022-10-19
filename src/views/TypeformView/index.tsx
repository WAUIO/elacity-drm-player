/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import Typeform from 'src/lib/typeform';

/**
 * Specify all steps used by the form
 * fully customizable
 */
const TypeformView = () => (
  <Box sx={{ height: 'calc(100vh - 136px)' }}>
    <Helmet>
      <title>Submission Form | Elacity Media</title>
    </Helmet>
    <Typeform />
  </Box>
);

export default TypeformView;
