/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box, List, Container, ListItem,
} from '@mui/material';
import Player from 'src/components/Media/MediaPlayer';
import MediaItemList from 'src/components/Media/MediaItemList';

const Explore: React.FC = () => {
  const medias = (new Array(5)).fill(0);

  return (
    <Box>
      <Helmet>
        <title>Play | Elacity Media</title>
      </Helmet>

      <Container maxWidth="lg">
        <Player source="http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd" />
        <List>
          {
            medias.map((_, index) => (
              <ListItem key={index}>
                <MediaItemList id={(index + 1).toString()} />
              </ListItem>
            ))
          }
        </List>
      </Container>
    </Box>
  );
};

export default Explore;
