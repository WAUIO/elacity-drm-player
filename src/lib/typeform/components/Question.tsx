import React from 'react';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ButtonForm } from '../types';
import Caption from './Caption';
import Title from './Title';
import { BtnNext } from './Buttons';

interface QuestionProps {
  title: string;
  caption?: string | React.ReactNode;
  helpText?: string;
  indicator?: number;
  button?: ButtonForm;
}

const Question = ({
  title,
  caption,
  children,
  button,
  helpText,
  indicator,
}: React.PropsWithChildren<QuestionProps>) => (
  <Box>
    <Title indicator={indicator}>{title}</Title>
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
        <Typography variant="caption" sx={{ color: (t: Theme) => t.palette.error.main }}>
          {helpText}
        </Typography>
      )
    }
    {button && <BtnNext {...button} />}
  </Box>
);

export default Question;
