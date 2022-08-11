import { Theme, Components } from '@mui/material/styles';
import { merge } from 'lodash';
import Button from './Button';
import IconButton from './IconButton';

export default function ComponentsOverrides(theme: Theme): Components {
  return merge(Button(theme), IconButton(theme)) as Components;
}
