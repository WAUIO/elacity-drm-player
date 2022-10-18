import React from 'react';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Uploader, InlineUploaderProps } from '@elacity-js/uikit';
import { UploaderBlock } from '../../types';
import { BtnNext } from '../Buttons';
import Title from '../Title';

export interface UploaderCardProps extends InlineUploaderProps {
  helpText?: string | React.ReactNode;
  caption?: string | React.ReactNode;
}

const UploaderCard = ({ input: { indicator, title, helptext, caption, maxSize, ...props }, button }: UploaderBlock) => (
  <Box>
    <Title indicator={indicator}>{title}</Title>
    {
      caption && (
        <Typography variant="body2">
          {caption}
        </Typography>
      )
    }
    <Uploader.Inline
      maxSize={maxSize || 2 * 1024 * 1024 * 1024}
      supportedFileDescription=".MP4, .MPEG are supported, up to 2Gb"
      accept={{
        'video/*': ['.mp4', '.mpeg'],
      }}
      {...props}
    />
    {
      helptext && (
        <Typography variant="caption" sx={{ color: (t: Theme) => t.palette.error.main }}>
          {helptext}
        </Typography>
      )
    }
    {button && <BtnNext {...button} />}
  </Box>
);

export default UploaderCard;
