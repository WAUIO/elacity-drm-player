import { ReactNode } from 'react';
import { ButtonProps, InputBaseProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export interface Animation {
    type: 'slide' | 'fade' | 'grow';
    props?: TransitionProps
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
}

export interface ButtonForm {
    text: string;
    stepId?: number;
    props?: ButtonProps;
    withIndicator?: boolean;
}

export interface InputForm extends InputBaseProps {
    indicator?: number;
    title: string;
    helptext?: string;
}

export interface StaticBlock {
    type: 'static';
    input: ReactNode;
    button?: ButtonForm;
}

export interface TextBlock {
    type: 'text';
    input: InputForm;
    button: ButtonForm;
}

export interface SelectCardBlock {
    type: 'select-card';
    input: InputForm;
    button: ButtonForm;
}

export type FormBlock = StaticBlock | TextBlock | SelectCardBlock;
