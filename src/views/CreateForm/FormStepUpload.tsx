import React from 'react';
import { useFormikContext } from 'formik';
import { FileRejection } from 'react-dropzone';
import { Uploader } from '@elacity-js/uikit';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CreateFormData } from './types';

export default () => {
  const { values, setFieldValue, setErrors, errors } = useFormikContext<CreateFormData>();

  return (
    <Box sx={{ my: 1, maxWidth: 480 }}>
      <Box sx={{ mb: 2 }}>
        <Uploader.Inline
          initialValue={values.mediaFile}
          maxSize={2 * 1024 * 1024 * 1024}
          sx={{
            ...(errors.mediaFile && {
              border: (t: Theme) => `2px dotted ${t.palette.error.main}`,
            }),
          }}
          supportedFileDescription=".MP4, .MPEG are supported, up to 2Gb"
          accept={{
            'video/*': ['.mp4', '.mpeg'],
          }}
          onDropped={(file: File) => {
            setFieldValue('mediaFile', file);
          }}
          onRejected={
            (rejection: FileRejection[]) => {
              setErrors({ mediaFile: rejection.map((r) => r.errors[0].message).join(', ') });
            }
          }
        />
        {
          errors.mediaFile && (
            <Typography variant="caption" sx={{ color: (t: Theme) => t.palette.error.main }}>
              {errors?.mediaFile.toString()}
            </Typography>
          )
        }
      </Box>
      <Box sx={{ mt: 2, width: 280 }}>
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Add your thumbnail here
        </Typography>
        <Uploader.Inline
          initialValue={values.thumbnail}
          maxSize={10 * 1024 * 1024}
          sx={{
            ...(errors.thumbnail && {
              border: (t: Theme) => `2px dotted ${t.palette.error.main}`,
            }),
          }}
          onDropped={(file: File) => {
            setFieldValue('thumbnail', file);
          }}
          onRejected={
            (rejection: FileRejection[]) => {
              setErrors({ thumbnail: rejection.map((r) => r.errors[0].message).join(', ') });
            }
          }
        />
        {
          errors.thumbnail && (
            <Typography variant="caption" sx={{ color: (t: Theme) => t.palette.error.main }}>
              {errors?.thumbnail.toString()}
            </Typography>
          )
        }
      </Box>
    </Box>
  );
};
