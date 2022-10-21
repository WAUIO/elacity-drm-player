import React, { ReactNode } from 'react';
import { ButtonProps, InputBaseProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { SvgIconComponent } from '@mui/icons-material';
import { InlineUploaderProps } from '@elacity-js/uikit';

export interface Animation {
  type: 'slide' | 'fade' | 'grow';
  props?: TransitionProps
}

export interface ButtonForm {
  text: string;
  props?: ButtonProps;
  withIndicator?: boolean | string;
}

export interface QuestionInputProps {
  fieldName: string;
  indicator?: number;
  title: string;
  helpText?: string;
  error?: string;
  caption?: string | React.ReactNode;
  required?: boolean;
}

export type InputForm = QuestionInputProps & InputBaseProps & {button?: ButtonForm};

export interface StaticBlock extends Omit<InputForm, 'input'> {
  type: 'static';
  input: ReactNode;
}

export interface TextInputBlock extends InputForm {
  type: 'text';
  input: InputForm;
  button: ButtonForm;
}

export interface SelectOptions {
  KeyPressId: string;
  value: string;
  icon?: SvgIconComponent;
}

export interface SelectForm extends InputForm {
  options: SelectOptions[];
  multiple?: boolean;
}

export interface SelectCardBlock {
  type: 'select-card';
  input: SelectForm;
  button: ButtonForm;
}

export interface SelectChoiceBlock {
  type: 'select-choice';
  input: SelectForm;
  button: ButtonForm;
}

export interface UploaderBlock {
  type: 'uploader';
  input: QuestionInputProps & InlineUploaderProps;
  button?: ButtonForm;
}

export interface Block {
  key: string;
  content: FormBlock;
  animation?: Animation;
}

export interface FormStep<T = unknown> {
  id: number;
  blocks: Block[];
  isFirstStep?: boolean;
  isLastStep?: boolean;
  animation?: Animation;
  stepForward?: (values: T) => FormStep<T>['id'];
}

export type FormBlock = StaticBlock | TextInputBlock | SelectCardBlock | UploaderBlock | SelectChoiceBlock;

export interface RoyaltySet {
  key?: string;
  identifier: string;
  address?: string;
  royalty?: number;
}

export interface MintForm {
  // mint form data
  operator?: string; // Independant creator | Content Creator Group | Content Distributor
  contentType?: string; // Image | Video | Music | 3D Model | Document
  accessMethod?: string; // q3: Free | Buy once...
  pricePerSale?: number;

  // @deprecated soon, use .royalties
  parties?: string[];
  royalties?: RoyaltySet[];

  title?: string;
  description?: string;
  assetFile?: File;
  assetThumbnail?: File;
  copiesNumber?: number;

  // extra form
  termsAgreement?: boolean;
}
