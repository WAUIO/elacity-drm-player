import React from 'react';
import { Box, Typography } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { ButtonForm, QuestionInputProps } from '../types';
import Caption from './Caption';
import Title from './Title';
import { BtnNext } from './Buttons';

const TypoError = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
}));

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
        <Caption variant="body2" component="div">
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
        <TypoError>
          {error}
        </TypoError>
      )
    }
    {button && <BtnNext {...button} />}
  </Box>
);

export default Question;
