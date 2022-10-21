import React from 'react';
import { merge } from 'lodash';
import { Box } from '@mui/material';
import Component from '../fields/SelectChoice';
import Question from '../Question';
import useBlockHelpers from '../../hooks/useBlockHelpers';
import {
  BlockComponentProps, SelectChoiceBlock, QuestionInputProps,
} from '../../types';

export interface Props extends BlockComponentProps<SelectChoiceBlock> {}

const SelectChoiceComponent = React.forwardRef<HTMLDivElement, Props>(({ padding, content }, ref) => {
  const { injectInputProps } = useBlockHelpers();
  const { error, ...inputProps } = injectInputProps(content.input?.fieldName);

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

SelectChoiceComponent.defaultProps = {
  padding: 0,
};

export default SelectChoiceComponent;
