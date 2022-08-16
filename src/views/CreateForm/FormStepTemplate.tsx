/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RadioGroup, { useRadioGroup, RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import { Edit as EditIcon } from '@mui/icons-material';
import { DistributionMethod, Label } from 'src/lib/scm';
import TemplateDialog, { useTemplateDialogFlow } from './TemplateDialog';
import { CreateFormData } from './types';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

interface UikitRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  options?: {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }[]
}

function UikitRadioGroup({ options, ...props }: UikitRadioGroupProps) {
  return (
    <RadioGroup {...props}>
      {
        options.map(({ value, ...option }) => (
          <MyFormControlLabel key={value} value={value} {...option} control={<Radio />} />
        ))
      }
    </RadioGroup>
  );
}

export default () => {
  const { values, setFieldValue } = useFormikContext<CreateFormData>();
  const { open, handleClickOpen, handleClose } = useTemplateDialogFlow();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl sx={{ m: 2 }} variant="standard">
        <FormLabel>Select Distribution Method</FormLabel>
        <UikitRadioGroup
          value={values.distributionMethod}
          onChange={(e) => setFieldValue('distributionMethod', e.target.value)}
          options={[
            { value: DistributionMethod.ON_DEMAND_STREAM, label: 'On Demand Stream', disabled: true },
            { value: DistributionMethod.DIGITAL_SALE, label: 'Digital Sale' },
          ]}
        />
      </FormControl>

      <FormControl sx={{ m: 2 }} variant="standard">
        <FormLabel>Size of Label</FormLabel>
        <UikitRadioGroup
          value={values.label}
          onChange={(e) => setFieldValue('label', e.target.value)}
          options={[
            { value: Label.BIG, label: 'Big Labels', disabled: true },
            { value: Label.INDIE, label: 'Indie Labels', disabled: true },
            { value: Label.SELF, label: 'Self Released' },
          ]}
        />
      </FormControl>

      <Box sx={{ m: 2 }}>
        <Button onClick={handleClickOpen} startIcon={<EditIcon />}>
          Edit/Review Template
        </Button>
        <TemplateDialog open={open} onClose={handleClose} />
      </Box>
    </Box>
  );
};
