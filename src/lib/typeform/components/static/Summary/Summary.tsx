/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { useFormikContext } from 'formik';
import {
  Box, Grid, Typography, Container,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { BoxProps } from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MintForm } from 'src/lib/typeform/types';
import {
  accessMethods, contentTypes, operators,
} from 'src/lib/typeform/questions';
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
  }),
}));

const MediaViewer = styled(Box)(({ theme }) => ({
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

const Summary = () => {
  const { values } = useFormikContext<MintForm>();

  return (
    <Container sx={{ width: '100%', '& > * > .MuiGrid-item': { py: 1 } }} maxWidth="xl">
      <Grid container>
        <Grid item md={3}>
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

        <Grid item md={3}>
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

        <Grid item md={3}>
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

        <Grid item md={3}>
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

      <Grid container>
        <Grid item md={3} container>
          <Grid item md={12} sx={{ mb: 1 }}>
            <Card>
              <Title>5. Royalties Distribution</Title>
              <ul>
                <li>Creator</li>
                <li>Publisher</li>
                <li>Distributor</li>
                <li>Investor</li>
              </ul>
            </Card>
          </Grid>

          <Grid item md={12}>
            <Card>
              <Title>6. Royalties To</Title>
              <ul>
                <li>0x0000</li>
                <li>0x0000</li>
                <li>0x0000</li>
                <li>0x0000</li>
              </ul>
            </Card>
          </Grid>

        </Grid>

        <Grid item md={3}>
          <Card>
            <Title>7. Royalty Ratio</Title>
            <Box>
              <Chart width={215} />
            </Box>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <Title>8. Asset Uploaded</Title>
            <MediaViewer>
              <video controls={false} src={URL.createObjectURL(values.assetFile)} />
            </MediaViewer>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <Title>9. Thumbnail Image</Title>
            <MediaViewer>
              <img alt="thumbnail" src={URL.createObjectURL(values.assetThumbnail)} />
            </MediaViewer>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={3}>
          <Card>
            <Title>10. Asset Title</Title>
            <Typography>{values.title}</Typography>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <Title>11. Asset Description</Title>
            <Typography>{values.description}</Typography>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card>
            <Title>12. Number of Copies</Title>
            <Typography>{values.copiesNumber}</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Summary;
