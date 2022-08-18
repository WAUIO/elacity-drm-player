import React from 'react';
import { useMounted } from '@elacity-js/uikit';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { mcoApi } from 'src/lib/scm';
import { CreateFormData } from './types';

export default () => {
  const mounted = useMounted();
  const { values, setFieldValue, setErrors } = useFormikContext<CreateFormData>();

  React.useEffect(() => {
    if ((values?.templateRaw || '').length === 0) {
      mcoApi.loadTemplate(values.distributionMethod, values.label).then(
        (templateRaw: string) => setFieldValue('templateRaw', templateRaw)
      );
    } else {
      mcoApi.generateContractualObjects(values.templateRaw)
        .then((response) => {
          console.log('Media Contractual Objects', response);
          if ((response?.contracts || []).length > 0) {
            setFieldValue('royalties', Object.entries(response?.contracts[0].parties || []).map(
              // @ts-ignore
              ([identifier, { metadata }], i) => ({
                identifier,
                // identifier: metadata?.['rdfs:label'],
                royalty: 0,
                address: '',
                ...values.royalties[i] || {},
              })
            ));
          }
        })
        .catch((e: Error) => {
          console.error(e);
          setErrors({ royalties: `Unable to parse RDF content correctly: ${e.message}` });
        });
    }
  }, [values.templateRaw, mounted?.current]);

  return (
    <Box sx={{ my: 1 }}>
      {
        values.royalties.map(({ identifier, royalty, address }, index) => (
          <Box key={identifier}>
            <TextField
              label={identifier}
              value={address}
              sx={{ m: 1, width: '50ch' }}
              onChange={(e) => {
                setFieldValue(`royalties[${index}].address`, e.target.value);
              }}
            />
            <TextField
              label="Royalty"
              sx={{ m: 1, width: '10ch', textAlign: 'right' }}
              value={royalty}
              InputProps={{
                sx: { textAlign: 'right' },
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e) => {
                setFieldValue(`royalties[${index}].royalty`, e.target.value);
              }}
            />
          </Box>
        ))
      }
    </Box>
  );
};
