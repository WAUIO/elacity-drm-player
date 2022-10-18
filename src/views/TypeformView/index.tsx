/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { styled } from '@mui/material/styles';
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
    ]}
  />
);

export default TypeformView;
