/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { useFormikContext } from 'formik';
import {
  Box, Grid, Typography, Button, CircularProgress, useMediaQuery,
} from '@mui/material';
import {
  styled, alpha, Theme,
} from '@mui/material/styles';
import { BoxProps } from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MintForm } from 'src/lib/typeform/types';
import {
  accessMethods, contentTypes, operators,
} from 'src/lib/typeform/questions';
import Address from 'src/components/Address';
import useFormUI from '../../../hooks/useFormUI';
import Chart from './DoughnutChart';

const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.fontSize * 0.95,
  color: theme.palette.grey[600],
  textDecoration: 'none',
}));

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'inline',
})<BoxProps & {inline?: boolean}>(({ theme, inline }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5),
  height: '100%',
  ...(inline && {
    '& > div:.inner': {
      width: 'calc(100% - 50px)',
    },
    display: 'flex',
    alignItems: 'center',
  }),
}));

const MediaViewer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxWidth: '100%',
  maxHeight: '100%',
  '& img': {
    borderRadius: theme.spacing(1.2),
    width: '100%',
    height: '100%',
  },
  '& video': {
    borderRadius: theme.spacing(1.2),
    width: '100%',
    height: '100%',
  },
}));

const Icon = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.primary.light, 0.2),
  color: theme.palette.primary.main,
  borderRadius: theme.spacing(40),
  width: theme.spacing(5),
  height: theme.spacing(5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
}));

const SummaryContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1.5, 'auto', 0),
  width: '98%',
  '& > * > .MuiGrid-item': {
    padding: theme.spacing(1, 0),
  },
  '& > .MuiGrid-container': {
    marginBottom: theme.spacing(2.5),
    '& > .MuiGrid-item': {
      paddingLeft: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(12),
    '& .MuiGrid-item': {
      width: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(5),
    '& .MuiGrid-item': {
      width: '100%',
    },
    '& .MuiGrid-container.MuiGrid-item': {
      '& .MuiGrid-item': {
        margin: theme.spacing(0, 'auto'),
        paddingLeft: theme.spacing(2),
        width: '100%',
      },
    },
  },
}));

const NestedWrapper = ({ children }) => {
  const isSmall = useMediaQuery((t: Theme) => t.breakpoints.down('sm'));

  if (isSmall) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <Grid item container spacing={2} md={3} sm={6}>
      {children}
    </Grid>
  );
};

const Summary = () => {
  const { onNext } = useFormUI();
  const { values, resetForm, isSubmitting } = useFormikContext<MintForm>();

  const handleCancel = () => {
    resetForm({});
    window.location.reload();
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <SummaryContainer>
      <Grid container spacing={2}>
        <Grid item md={8} sm={6} xs={6}>
          <Typography variant="h4" fontWeight={500}>Summary</Typography>
        </Grid>
        <Grid
          item
          md={4}
          sm={6}
          xs={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            pr: 0.5,
            '& .MuiButton-root': {
              ml: 2,
            },
          }}
        >
          <Button
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={
              isSubmitting && (
                <CircularProgress size="1rem" />
              )
            }
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6}>
          <Card inline>
            <div className="inner">
              <Title>1. User</Title>
              <Typography>{operators.find((o) => o.KeyPressId === values.operator)?.value}</Typography>
            </div>
            <Icon>
              <PersonOutlineIcon />
            </Icon>
          </Card>
        </Grid>

        <Grid item md={3} sm={6}>
          <Card inline>
            <div className="inner">
              <Title>2. Publish Content</Title>
              <Typography>{contentTypes.find((c) => c.KeyPressId === values.contentType)?.value}</Typography>
            </div>
            <Icon>
              <CropOriginalIcon />
            </Icon>
          </Card>
        </Grid>

        <Grid item md={3} sm={6}>
          <Card inline>
            <div className="inner">
              <Title>3. Content Access To</Title>
              <Typography>{accessMethods.find((c) => c.KeyPressId === values.accessMethod)?.value}</Typography>
            </div>
            <Icon>
              <AttachMoneyIcon />
            </Icon>
          </Card>
        </Grid>

        <Grid item md={3} sm={6}>
          <Card inline>
            <div className="inner">
              <Title>4. Cost Per Sale</Title>
              <Typography>{values.pricePerSale}</Typography>
            </div>
            <Icon>
              <AttachMoneyIcon />
            </Icon>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <NestedWrapper>
          <Grid item md={12} sx={{ mb: 1 }}>
            <Card>
              <Title>5. Royalties Distribution</Title>
              <ul>
                {
                  values.royalties.map(
                    (r) => (
                      <li key={r.identifier}>{r.identifier}</li>
                    )
                  )
                }
              </ul>
            </Card>
          </Grid>

          <Grid item md={12}>
            <Card>
              <Title>6. Royalties To</Title>
              <ul>
                {
                  values.royalties.map(
                    (r) => (
                      <li key={r.identifier}>
                        <Address address={r.address} />
                      </li>
                    )
                  )
                }
              </ul>
            </Card>
          </Grid>
        </NestedWrapper>

        <Grid item md={3} sm={6}>
          <Card>
            <Title>7. Royalty Ratio</Title>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chart
                width={215}
                dataset={
                  values.royalties.map(
                    ({ identifier, royalty }) => ({
                      label: identifier,
                      value: Number(royalty),
                    })
                  )
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item md={3} sm={6}>
          <Card>
            <Title>8. Asset Uploaded</Title>
            <MediaViewer>
              <video controls={false} src={URL.createObjectURL(values.assetFile)} />
            </MediaViewer>
          </Card>
        </Grid>

        <Grid item md={3} sm={6}>
          <Card>
            <Title>9. Thumbnail Image</Title>
            <MediaViewer>
              <img alt="thumbnail" src={URL.createObjectURL(values.assetThumbnail)} />
            </MediaViewer>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={3} sm={4}>
          <Card>
            <Title>10. Asset Title</Title>
            <Typography>{values.title}</Typography>
          </Card>
        </Grid>

        <Grid item md={6} sm={4}>
          <Card>
            <Title>11. Asset Description</Title>
            <Typography>{values.description}</Typography>
          </Card>
        </Grid>

        <Grid item md={3} sm={4}>
          <Card>
            <Title>12. Number of Copies</Title>
            <Typography>{values.copiesNumber}</Typography>
          </Card>
        </Grid>
      </Grid>
    </SummaryContainer>
  );
};

export default Summary;
