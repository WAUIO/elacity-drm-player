/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Static, { Props as StaticComponentProps } from './StaticBloc';
import SelectCard, { Props as SelectCardComponentProps } from './SelectCardBloc';
import SelectRadio, { Props as SelectRadioComponentProps } from './SelectChoiceBloc';
import Input, { Props as InputComponentProps } from './TextBloc';
import Uploader, { Props as UploaderComponentProps } from './UploaderBloc';
import { BlockComponentProps, FormBlock } from '../../types';

export default {
  Static,
  SelectCard,
  SelectRadio,
  Input,
  Uploader,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Empty = React.forwardRef<HTMLDivElement, any>((props, ref) => (<div ref={ref} {...props} />));

export const BlocGuessable = (props: BlockComponentProps<FormBlock>) => {
  // console.log('BlocGuessable', props);
  switch (props?.content.type) {
  case 'static':
    return (
      <Static {...props as StaticComponentProps} />
    );
  case 'text':
    return (
      <Input {...props as InputComponentProps} />
    );
  case 'select-card':
    return (
      <SelectCard {...props as SelectCardComponentProps} />
    );
  case 'select-choice':
    return (
      <SelectRadio {...props as SelectRadioComponentProps} />
    );
  case 'uploader':
    return (
      <Uploader {...props as UploaderComponentProps} />
    );
  default:
    // return empty div to support `ForwardRef`
    return (<Empty />);
  }
};
