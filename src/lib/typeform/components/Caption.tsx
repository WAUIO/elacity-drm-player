import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export default styled(Typography)<TypographyProps & {component?: string}>(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: '1.24rem',
  color: theme.palette.grey[600],
  padding: theme.spacing(1, 0),
}));
