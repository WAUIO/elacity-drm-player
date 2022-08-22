/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@mui/material';
import MediaCard from 'src/components/Media/MediaCard';
import useMediaLoader from 'src/hooks/useMediaLoader';

const Explore: React.FC = () => {
  const result = useMediaLoader('getAssets', [0, Infinity]);

  console.log({ result });

  return (
    <Box>
      <Helmet>
        <title>Explore | Elacity Media</title>
      </Helmet>

      <Box>
        <Grid container spacing={1}>
          {
            result.items.map((item, index) => (
              <Grid key={index + 1} item xs={6} sm={4} md={3} xl={2}>
                <MediaCard {...item} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default Explore;
