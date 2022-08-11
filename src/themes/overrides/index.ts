import { Theme, Components } from '@mui/material/styles';
import { merge } from 'lodash';
import Button from './MuiButton';
import IconButton from './MuiIconButton';
import Dialog from './MuiDialog';
import Paper from './MuiPaper';
import Layout from './Layout';
import Card from './MuiCard';
import Typography from './MuiTypography';
import LinearProgress from './MuiLinearProgress';
import Popover from './MuiPopover';

export default function ComponentsOverrides(theme: Theme): Components {
  return merge(
    Layout(theme),
    Button(theme),
    IconButton(theme),
    Dialog(theme),
    Paper(theme),
    Card(theme),
    LinearProgress(theme),
    Typography(theme),
    Popover(theme)
  ) as Components;
}
