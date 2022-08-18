/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import dashjs from 'dashjs';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useKeepRatio } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const protData = {
  'com.widevine.alpha': {
    serverURL: 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
  },
  'com.microsoft.playready': {
    serverURL: 'https://drm-playready-licensing.axtest.net/AcquireLicense',
  },
};

const PlayerContainer = styled(Box)(({ theme }) => ({
  display: 'contents',
  margin: theme.spacing(2, 'auto', 1),
  width: '100%',
  maxWidth: 620,
  minHeight: 320,
  maxHeight: 600,
  '& video': {
    margin: theme.spacing(0, 'auto'),
    width: '100%',
  },
}));

interface DashPlayerProps {
  source: string;
  autoplay?: boolean;
}

const DashPlayer = ({ source, autoplay }: DashPlayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  useKeepRatio({ ratio: 16 / 9, el: ref.current });

  React.useEffect(() => {
    // see also https://github.com/sanjuc/clear-key/blob/master/script/main.js
    const player = dashjs.MediaPlayer().create();
    // player.setProtectionData(protData);
    player.initialize(videoRef.current, source, autoplay);
  });

  return (
    <PlayerContainer ref={ref}>
      <video ref={videoRef} controls />
    </PlayerContainer>
  );
};

DashPlayer.defaultProps = {
  autoplay: true,
};

export default DashPlayer;
