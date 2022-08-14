import * as React from 'react';
import { RouterLink } from '@elacity-js/uikit';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface MediaItemProps {
  id: string;
}

export default function MediaItemList({ id }: MediaItemProps) {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://mui.com/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Excepteur sint occaecat cupidatat non proident
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <IconButton aria-label="play/pause" component={RouterLink} to={`/view/${id}`}>
          <PlayArrowIcon sx={{ height: 90, width: 90 }} />
        </IconButton>
      </Box>
    </Card>
  );
}
