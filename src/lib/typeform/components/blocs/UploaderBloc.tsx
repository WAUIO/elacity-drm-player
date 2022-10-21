import React from 'react';
import { merge } from 'lodash';
import { Box } from '@mui/material';
import Component from '../fields/Uploader';
import Question from '../Question';
import useBlockHelpers from '../../hooks/useBlockHelpers';
import {
  BlockComponentProps, UploaderBlock, QuestionInputProps,
} from '../../types';

export interface Props extends BlockComponentProps<UploaderBlock> {}

const UploaderBlocComponent = React.forwardRef<HTMLDivElement, Props>(({ padding, content }, ref) => {
  const { injectUploaderProps } = useBlockHelpers();
  const { error, ...inputProps } = injectUploaderProps(content.input?.fieldName);

  return (
    <Box ref={ref} display="flex" justifyContent="space-around" p={padding}>
      <Question
        {...(content.input as QuestionInputProps)}
        error={error}
        button={{ ...content.button }}
      >
        <Component {...merge(content, { input: inputProps })} />
      </Question>
    </Box>
  );
});

UploaderBlocComponent.defaultProps = {
  padding: 0,
};

export default UploaderBlocComponent;
