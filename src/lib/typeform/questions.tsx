import React from 'react';
import { FormikProps } from 'formik';
import { FileRejection } from 'react-dropzone';
import {
  styled, Theme, alpha,
} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
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
import { FormStep, MintForm } from './types';

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    width: 180,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
export default ({ values, errors, setFieldValue, setErrors, isSubmitting }: FormikProps<MintForm>) => [
  {
    id: 1,
    isFirstStep: true,
    blocks: [{
      key: '$.b.1.1',
      animation: {
        type: 'fade',
      },
      content: {
        type: 'static',
        input: <Img alt="ela" src={images[1]} />,
      },
    },
    {
      key: '$.b.1.2',
      animation: {
        type: 'fade',
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
          withIndicator: true,
        },
      },
    }],
  },
  {
    id: 2,
    blocks: [
      {
        key: '$.b.2.1',
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[2]} />,
        },
      },
      {
        key: '$.b.2.2',
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
              },
            ],
            fieldName: 'operator',
            value: values.operator,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('operator', e.target.value),
            error: errors.operator,
          },
          button: {
            text: 'OK',
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
        key: '$.b.3.2',
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
              },
            ],
            fieldName: 'contentType',
            value: values.contentType,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('contentType', e.target.value),
            error: errors.contentType,
          },
          button: {
            text: 'OK',
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      },
      {
        key: '$.b.3.1',
        animation: {
          type: 'fade',
        },
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
        key: '$.b.4.1',
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[4]} />,
        },
      },
      {
        key: '$.b.4.2',
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
              },
            ],
            fieldName: 'accessMethod',
            value: values.accessMethod,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('accessMethod', e.target.value),
            error: errors.accessMethod,
          },
          button: {
            text: 'OK',
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
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[5]} />,
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
            type: 'number',
            title: 'How much do you want to get paid per sale?',
            placeholder: 'Price per sale',
            inputProps: {
              style: {
                fontSize: 28,
              },
            },
            startAdornment: (
              <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: 26 } }}>ELA</InputAdornment>
            ),
            fieldName: 'pricePerSale',
            value: values.pricePerSale,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement>
            ) => setFieldValue('pricePerSale', e.target.value),
            error: errors.pricePerSale,
          },
          button: {
            text: 'OK',
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
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[6]} />,
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
            placeholder: 'Choose as many as you like',
            title: 'Who do you need to distribute royalties to?',
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
              },
            ],
            fieldName: 'parties',
            value: values.parties,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('parties', e.target.value),
            error: errors.parties,
          },
          button: {
            text: 'OK',
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
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[7]} />,
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
            sx: {
              border: (t: Theme) => `1px dashed ${t.palette.primary.main}`,
              bgcolor: (t: Theme) => alpha(t.palette.primary.light, 0.1),
            },
            fieldName: 'assetFile',
            initialValue: values.assetFile || null,
            onDropped: (value: File) => setFieldValue('assetFile', value),
            onRejected: (rejection: FileRejection[]) => {
              setErrors({ assetFile: rejection.map((r) => r.errors[0].message).join(', ') });
            },
            error: errors.assetFile,
          },
          button: {
            text: 'Continue',
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
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[8]} />,
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
            maxSize: 10 * 1024 * 1024,
            supportedFileDescription: 'Choose file or drag image here, up to 10Mb',
            accept: {
              'image/*': ['.png', '.jpg', '.jpeg', '.bmp'],
            },
            sx: {
              border: (t: Theme) => `1px dashed ${t.palette.primary.main}`,
              bgcolor: (t: Theme) => alpha(t.palette.primary.light, 0.1),
            },
            fieldName: 'assetThumbnail',
            initialValue: values.assetThumbnail || null,
            onDropped: (value: File) => setFieldValue('assetThumbnail', value),
            onRejected: (rejection: FileRejection[]) => {
              setErrors({ assetThumbnail: rejection.map((r) => r.errors[0].message).join(', ') });
            },
            error: errors.assetThumbnail,
          },
          button: {
            text: 'Continue',
            withIndicator: true,
          },
        },
      }],
  },
  {
    id: 9,
    blocks: [
      {
        key: '$.b.9.1',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'text',
          input: {
            indicator: 6,
            required: true,
            fullWidth: true,
            caption: <Img style={{ width: '30%' }} alt="ela" src={images[9]} />,
            type: 'text',
            title: 'What is the title of your asset?',
            placeholder: 'Type the title here',
            inputProps: {
              style: {
                fontSize: 28,
              },
            },
            fieldName: 'title',
            value: values.title,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('title', e.target.value),
            error: errors.title,
          },
          button: {
            text: 'OK',
            withIndicator: true,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      }],
  },
  {
    id: 10,
    blocks: [
      {
        key: '$.b.10.2',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'text',
          input: {
            indicator: 7,
            required: true,
            fullWidth: true,
            multiline: true,
            helpText: '<span>Shift ⇧</span> + <span>Enter ↵</span> to make a line break',
            type: 'text',
            title: 'What is the description of your asset?',
            placeholder: 'Type in the description here',
            inputProps: {
              style: {
                fontSize: 28,
                marginTop: 20,
              },
            },
            fieldName: 'description',
            value: values.description,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('description', e.target.value),
            error: errors.description,
          },
          button: {
            text: 'OK',
            withIndicator: true,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      },
      {
        key: '$.b.10.1',
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" style={{ width: '65%' }} src={images[10]} />,
        },
      },
    ],
  },
  {
    id: 11,
    blocks: [
      {
        key: '$.b.11.2',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'text',
          input: {
            type: 'number',
            indicator: 8,
            required: true,
            fullWidth: true,
            title: 'Nice! How many copies do you need?',
            placeholder: 'Number of copies',
            inputProps: {
              style: {
                fontSize: 28,
              },
            },
            fieldName: 'copiesNumber',
            value: values.copiesNumber,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement>
            ) => setFieldValue('copiesNumber', parseInt(e.target.value, 10)),
            error: errors.copiesNumber,
          },
          button: {
            text: 'OK',
            withIndicator: true,
            props: {
              endIcon: <CheckIcon />,
            },
          },
        },
      },
      {
        key: '$.b.11.1',
        animation: {
          type: 'fade',
        },
        content: {
          type: 'static',
          input: <Img alt="ela" src={images[11]} />,
        },
      },
    ],
  },
  {
    id: 12,
    isLastStep: true,
    blocks: [
      {
        key: '$.b.12.1',
        animation: {
          type: 'slide',
        },
        content: {
          type: 'text',
          input: {
            sx: {
              display: 'none',
            },
            fullWidth: true,
            caption: <Img style={{ width: '50%' }} alt="ela" src={images[1]} />,
            title: 'Great, please overview and click Mint to release your DRM-protected assets into Web3!',
          },
          button: {
            text: 'Submit',
            withIndicator: 'press <span>Ctrl + Enter ↵ </span>',
            props: {
              type: 'submit',
              endIcon: <CheckIcon />,
              ...(isSubmitting && {
                disabled: true,
                startIcon: <CircularProgress sx={{ fontSize: '1rem' }} />,
              }),
            },
          },
        },
      }],
  },
] as FormStep[];
