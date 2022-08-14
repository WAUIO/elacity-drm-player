/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@mui/material';
import MediaCard from 'src/components/Media/MediaCard';

const Explore: React.FC = () => {
  const medias = (new Array(12)).fill(0);

  return (
    <Box>
      <Helmet>
        <title>Explore | Elacity Media</title>
      </Helmet>

      <Box>
        <Grid container spacing={1}>
          {
            medias.map((v, index) => (
              <Grid key={index + v} item xs={6} sm={4} md={3} xl={2}>
                <MediaCard />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default Explore;
