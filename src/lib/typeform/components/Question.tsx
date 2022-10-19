import React from 'react';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ButtonForm, QuestionInputProps } from '../types';
import Caption from './Caption';
import Title from './Title';
import { BtnNext } from './Buttons';

interface QuestionProps extends QuestionInputProps {
  button?: ButtonForm;
}

const Question = ({
  title,
  caption,
  children,
  button,
  helpText,
  indicator,
  required,
  error,
}: React.PropsWithChildren<QuestionProps>) => (
  <Box>
    <Title indicator={indicator} required={required}>
      {title}
    </Title>
    {
      caption && (
        <Caption variant="body2">
          {caption}
        </Caption>
      )
    }
    {children}
    {
      helpText && (
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: (t: Theme) => t.palette.primary.dark,
            '& span': {
              fontWeight: 'bolder',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: helpText,
          }}
        />
      )
    }
    {
      error && (
        <Typography variant="caption" sx={{ color: (t: Theme) => t.palette.error.main }}>
          {error}
        </Typography>
      )
    }
    {button && <BtnNext {...button} />}
  </Box>
);

export default Question;
