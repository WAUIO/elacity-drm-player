import React from 'react';
import {
  styled, Theme, alpha,
} from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckIcon from '@mui/icons-material/Check';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PodcastsIcon from '@mui/icons-material/Podcasts';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Title from 'src/lib/typeform/components/Title';
import { images } from 'src/lib/typeform/constants';
import { FormStep } from './types';

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 180,
    height: 'auto',
  },
}));

export default [
  {
    id: 1,
    isFirstStep: true,
    blocks: [{
      key: '$.b.1',
      content: {
        type: 'static',
        input: <Img alt="ela" src={images[1]} />,
      },
    },
    {
      key: '$.b.2',
      animation: {
        type: 'slide',
      },
      content: {
        type: 'static',
        input: (
          <Title>
            <FormatQuoteIcon sx={{ color: 'primary.main' }} />
            {' '}
            Hello, let&apos;s mint a DRM-protected NFT asset!
          </Title>
        ),
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
          input: <Img alt="ela" src={images[1]} />,
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
            required: true,
            title: 'Which one below describes you best?',
            options: [
              {
                KeyPressId: 'A',
                icon: PersonOutlineOutlinedIcon,
                value: 'Independent Creator',
              },
              {
                icon: PeopleOutlineIcon,
                KeyPressId: 'B',
                value: 'Content Creator Group',
              },
              {
                icon: PodcastsIcon,
                KeyPressId: 'C',
                value: 'Content Distributor',
              }],
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
        key: '$.b.5',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'select-card',
          input: {
            indicator: 2,
            required: true,
            title: 'Amazing! What kind of Content would you like to publish?',
            options: [
              {
                KeyPressId: 'A',
                icon: ImageOutlinedIcon,
                value: 'Image',
              },
              {
                icon: VideoCameraBackOutlinedIcon,
                KeyPressId: 'B',
                value: 'Video',
              },
              {
                icon: MusicVideoOutlinedIcon,
                KeyPressId: 'C',
                value: 'Music',
              },
              {
                icon: ViewInArOutlinedIcon,
                KeyPressId: 'D',
                value: '3D Model',
              },
              {
                icon: ArticleOutlinedIcon,
                KeyPressId: 'E',
                value: 'Document',
              }],
          },
          button: {
            text: 'OK',
            stepId: 3,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      },
      {
        key: '$.b.6',
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[3]} />,
        },
      },
    ],
  },
  {
    id: 4,
    blocks: [
      {
        key: '$.b.7',
        content: {
          type: 'static',
          input: <Img style={{ width: 500, height: 'auto' }} alt="ela" src={images[4]} />,
        },
      },
      {
        key: '$.b.8',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'select-card',
          input: {
            indicator: 3,
            required: true,
            title: 'How would you like those to access your content?',
            options: [
              {
                KeyPressId: 'A',
                icon: MoneyOffOutlinedIcon,
                value: 'Free',
              },
              {
                icon: AttachMoneyOutlinedIcon,
                KeyPressId: 'B',
                value: 'Buy once, play always',
              },
              {
                icon: CurrencyExchangeOutlinedIcon,
                KeyPressId: 'C',
                value: 'Buy once, play always, resell',
              },
              {
                icon: PaidOutlinedIcon,
                KeyPressId: 'D',
                value: 'Pay Per View (PPV)',
              },
              {
                icon: AccessTimeOutlinedIcon,
                KeyPressId: 'E',
                value: 'Rental',
              }],
          },
          button: {
            text: 'OK',
            stepId: 5,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      }],
  },
  {
    id: 5,
    blocks: [
      {
        key: '$.b.5.1',
        content: {
          type: 'static',
          input: <Img style={{ width: 500, height: 'auto' }} alt="ela" src={images[4]} />,
        },
      },
      {
        key: '$.b.5.2',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'text',
          input: {
            indicator: 4,
            required: true,
            fullWidth: true,
            title: 'How much do you want to get paid per sale?',
            inputProps: {
              style: {
                fontSize: 28,
              },
            },
          },
          button: {
            text: 'OK',
            stepId: 6,
            withIndicator: true,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      }],
  },
  {
    id: 6,
    blocks: [
      {
        key: '$.b.6.1',
        content: {
          type: 'static',
          input: <Img style={{ width: 500, height: 'auto' }} alt="ela" src={images[5]} />,
        },
      },
      {
        key: '$.b.6.2',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'select-choice',
          input: {
            indicator: 5,
            required: true,
            multiple: true,
            title: 'Who do you need to distribute royalties to?',
            caption: '[User can add % too]',
            options: [
              {
                KeyPressId: 'A',
                value: 'Creator',
              },
              {
                KeyPressId: 'B',
                value: 'Publisher',
              },
              {
                KeyPressId: 'C',
                value: 'Distributor',
              },
              {
                KeyPressId: 'D',
                value: 'Investor',
              }],
          },
          button: {
            text: 'OK',
            stepId: 7,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      }],
  },
  {
    id: 7,
    blocks: [
      {
        key: '$.b.7.1',
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[6]} />,
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
            title: 'Alright! Let\'s get your asset uploaded to the SmartWeb!',
            caption: '[User select/drag n drop file]',
            onDropped: () => {},
            sx: {
              border: (t: Theme) => `1px dashed ${t.palette.primary.main}`,
              bgcolor: (t: Theme) => alpha(t.palette.primary.light, 0.1),
            },
          },
          button: {
            text: 'Continue',
            stepId: 8,
            withIndicator: true,
          },
        },
      }],
  },
  {
    id: 8,
    blocks: [
      {
        key: '$.b.8.1',
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[7]} />,
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
              bgcolor: (t: Theme) => alpha(t.palette.primary.light, 0.1),
            },
          },
          button: {
            text: 'Continue',
            stepId: 6,
            withIndicator: true,
          },
        },
      }],
  },
] as FormStep[];