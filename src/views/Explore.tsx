import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

const Explore: React.FC = () => {
  const medias = [];

  return (
    <Box>
      <Helmet>
        <title>Explore | Elacity Media</title>
      </Helmet>
      {JSON.stringify(medias)}
    </Box>
  );
};

export default Explore;
