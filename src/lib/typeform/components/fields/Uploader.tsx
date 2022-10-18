import React from 'react';
import { Uploader, InlineUploaderProps } from '@elacity-js/uikit';
import { UploaderBlock } from '../../types';

export interface UploaderCardProps extends InlineUploaderProps {
  helpText?: string | React.ReactNode;
  caption?: string | React.ReactNode;
}

const UploaderCard = ({ input: { indicator, title, caption, maxSize, ...props } }: UploaderBlock) => (
  <Uploader.Inline
    maxSize={maxSize || 2 * 1024 * 1024 * 1024}
    supportedFileDescription=".MP4, .MPEG are supported, up to 2Gb"
    accept={{
      'video/*': ['.mp4', '.mpeg'],
    }}
    {...props}
  />
);

export default UploaderCard;
