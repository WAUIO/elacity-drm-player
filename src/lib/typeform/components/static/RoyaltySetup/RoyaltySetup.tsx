import React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { Box, Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  RoyaltySet, MintForm, SelectOptions,
} from 'src/lib/typeform/types';
import Question from '../../Question';
import SelectChoice from '../../fields/SelectChoice';
import useFormUI from '../../../hooks/useFormUI';
import PartyDetail from './PartyDetail';
import InnerStepper from './InnerStepper';
import { useRoyaltiesSetup } from './handlers';

interface RoyaltySetupProps {
  fieldName: keyof MintForm;
  options: SelectOptions[];
}

const RoyaltySetup = ({ options, fieldName }: RoyaltySetupProps) => {
  const { errors, values, setFieldValue } = useFormikContext<MintForm>();
  const { onNext } = useFormUI();

  const {
    handleComplete,
    handleRoyaltyChange,
    handleNext,
    handlePrev,
    handleSelectChange,
    innerStep,
    parties,
    royalties,
  } = useRoyaltiesSetup({
    values: values.royalties || [],
    options,
    onComplete: (val: RoyaltySet[]) => {
      // don't validate right now, will be validated only `onNext` execution
      setFieldValue(fieldName, val, false);
      setTimeout(onNext, 500, { forceValidation: true });
    },
  });

  return (
    <Box className={classNames({ 'shake-horizontal': Boolean(errors[fieldName]) })}>
      <Question
        title="Who do you need to distribute royalties to?"
        indicator={5}
        caption={
          innerStep > 1 && (
            <>
              Enter address and royalty ratio for
              {' '}
              <span style={{ fontWeight: 500 }}>{royalties[parties[innerStep - 2]]?.identifier}</span>
            </>
          )
        }
        fieldName={fieldName}
        button={null}
        error={
          Boolean(errors[fieldName]) && (
            errors[fieldName] as string
          )
        }
      >
        {
          innerStep === 1 ? (
            <>
              <SelectChoice
                input={{
                  multiple: true,
                  placeholder: 'Choose as many as you like',
                  title: '',
                  fieldName,
                  value: parties,
                  onChange: handleSelectChange,
                  options,
                }}
              />
              <Button
                disableElevation
                size="large"
                variant="contained"
                sx={{ boxShadow: 0, my: 2 }}
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
              >
                Setup
              </Button>
            </>
          ) : (
            <Box mt={1}>
              <Slide direction="right" in mountOnEnter unmountOnExit>
                <Box>
                  <PartyDetail
                    partyKey={parties[innerStep - 2]}
                    values={royalties}
                    onChange={handleRoyaltyChange}
                  />
                </Box>
              </Slide>
              <Box sx={{ my: 2 }}>
                <InnerStepper
                  onPrev={handlePrev}
                  onNext={handleNext}
                  isLast={innerStep === parties.length + 1}
                  onComplete={handleComplete}
                />
              </Box>
            </Box>
          )
        }
      </Question>
    </Box>
  );
};

export default RoyaltySetup;
