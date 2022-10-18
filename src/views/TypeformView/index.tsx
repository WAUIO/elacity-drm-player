/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  styled, Theme, lighten,
} from '@mui/material/styles';
import Typeform from 'src/lib/typeform';
import Title from 'src/lib/typeform/components/Title';
import CheckIcon from '@mui/icons-material/Check';
import { img1 } from './constants';

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 180,
    height: 'auto',
  },
}));

/**
 * Specify all steps used by the form
 * fully customizable
 */
const TypeformView = () => (
  <Typeform
    steps={[
      {
        id: 1,
        isFirstStep: true,
        blocks: [{
          key: '$.b.1',
          content: {
            type: 'static',
            input: <Img alt="ela" src={img1} />,
          },
        },
        {
          key: '$.b.2',
          animation: {
            type: 'slide',
          },
          content: {
            type: 'static',
            input: <Title>" Hello, let's mint a DRM-protected NFT asset!</Title>,
            button: {
              text: 'Hello! OK',
              stepId: 1,
              withIndicator: true,
            },
          },
        }],
      },
      {
        id: 2,
        blocks: [
          {
            key: '$.b.3',
            content: {
              type: 'static',
              input: <Img alt="ela" src={img1} />,
            },
          },
          {
            key: '$.b.4',
            animation: {
              type: 'slide',
            },
            content: {
              type: 'select-card',
              input: {
                indicator: 1,
                title: 'Which one below describes you best? This question is required.',
              },
              button: {
                text: 'OK',
                stepId: 2,
                props: {
                  endIcon: <CheckIcon />,
                },
              },
            },
          }],
      },
      {
        id: 3,
        blocks: [
          {
            key: '$.b.7.1',
            content: {
              type: 'static',
              input: <Img alt="ela" src={img1} />,
            },
          },
          {
            key: '$.b.7.2',
            animation: {
              type: 'slide',
            },
            content: {
              type: 'uploader',
              input: {
                indicator: 1,
                title: 'Alright! Let\'s get your asset uploaded to the SmartWeb!',
                caption: '[User select/drag n drop file]',
                onDropped: () => {},
                sx: {
                  border: (t: Theme) => `1px dashed ${t.palette.primary.main}`,
                  bgcolor: (t: Theme) => lighten(t.palette.primary.light, 0.9),
                },
              },
              button: {
                text: 'Continue',
                stepId: 3,
                withIndicator: true,
              },
            },
          }],
      },
      {
        id: 4,
        blocks: [
          {
            key: '$.b.8.1',
            content: {
              type: 'static',
              input: <Img alt="ela" src={img1} />,
            },
          },
          {
            key: '$.b.8.2',
            animation: {
              type: 'slide',
            },
            content: {
              type: 'uploader',
              input: {
                indicator: 1,
                title: 'Please add a thumbnail image.',
                caption: '[User adds thumbnail image]',
                onDropped: () => {},
                maxSize: 10 * 1024 * 1024,
                supportedFileDescription: 'Choose file or drag image here, up to 10Mb',
                accept: {
                  'image/*': ['.png', '.jpg', '.jpeg', '.bmp'],
                },
                sx: {
                  border: (t: Theme) => `1px dashed ${t.palette.primary.main}`,
                  bgcolor: (t: Theme) => lighten(t.palette.primary.light, 0.9),
                },
              },
              button: {
                text: 'Continue',
                stepId: 4,
                withIndicator: true,
              },
            },
          }],
      },
    ]}
  />
);

export default TypeformView;
