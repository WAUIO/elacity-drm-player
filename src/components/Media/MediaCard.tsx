import * as React from 'react';
import { RouterLink } from '@elacity-js/uikit';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MediaTokenAsset } from 'src/types';

export default function MediaCard({
  name, description, image, mediaURL,
}: MediaTokenAsset) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar
            sx={{ bgcolor: red[500] }}
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            aria-label="recipe"
          >
            R
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title="Duis reprehenderit"
        subheader="June 14, 2022"
      />
      <CardActionArea component={RouterLink} to={`/view/ipfs:${mediaURL}`}>
        <CardMedia
          component="img"
          height="194"
          image={image}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight={500}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
            {description?.substring(0, 130) || ' '}
            {description?.length > 130 ? '...' : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing sx={{ display: 'none' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
