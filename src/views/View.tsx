/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box, List, Container, ListItem,
} from '@mui/material';
import Player from 'src/components/Media/MediaPlayer';
import MediaItemList from 'src/components/Media/MediaItemList';
import useMediaLoader from 'src/hooks/useMediaLoader';

const Explore: React.FC = () => {
  const { id } = useParams();
  const { account } = useWeb3React();
  const result = useMediaLoader('getOwnerAssets', [account]);

  const mediaURL = React.useMemo<string>(() => {
    if (id?.startsWith('ipfs:')) {
      return `${id.replace('ipfs:', 'https://ipfs.ela.city/ipfs/')}/stream.mpd`;
    }

    return 'https://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd';
  }, [id]);

  return (
    <Box>
      <Helmet>
        <title>Play | Elacity Media</title>
      </Helmet>

      <Container maxWidth="lg">
        <Player source={mediaURL} />
        <List>
          {
            (result?.items || []).map((item, index) => (
              <ListItem key={index}>
                <MediaItemList
                  id={`ipfs:${item.mediaURL}`}
                  title={item?.name}
                  description={item?.description || ''}
                  image={item?.image || ''}
                />
              </ListItem>
            ))
          }
        </List>
      </Container>
    </Box>
  );
};

export default Explore;
