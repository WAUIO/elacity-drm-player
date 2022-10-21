/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import Typeform from 'src/lib/typeform';
import { ClassicUploader } from 'src/lib/uploader';
import useHandler from './handler';
import './overrides.css';

/**
 * Specify all steps used by the form
 * fully customizable
 */
const TypeformView = () => {
  const { handlePayload } = useHandler({
    uploader: new ClassicUploader(process.env.REACT_APP_BACKEND_URL),
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>Submission Form | Elacity Media</title>
      </Helmet>
      <Box>
        <Typeform handle={handlePayload} />
      </Box>
    </Box>
  );
};

export default TypeformView;
