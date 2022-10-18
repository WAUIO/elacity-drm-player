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
    stepId?: number;
    props?: ButtonProps;
    withIndicator?: boolean;
}

export interface QuestionInputProps {
    indicator?: number;
    title: string;
    helpText?: string;
    caption?: string | React.ReactNode;
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
    icon: SvgIconComponent;
}

export interface SelectForm extends InputForm {
    options: SelectOptions[];
}

export interface SelectCardBlock {
    type: 'select-card';
    input: SelectForm;
    button: ButtonForm;
}

export interface SelectChoiceBlock {
    type: 'select-choice';
    input: SelectForm & {multiple?: boolean};
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

export interface FormStep {
    id: number;
    blocks: Block[];
    isFirstStep?: boolean;
    isLastStep?: boolean;
    animation?: Animation;
}

export type FormBlock = StaticBlock | TextInputBlock | SelectCardBlock | UploaderBlock | SelectChoiceBlock;
