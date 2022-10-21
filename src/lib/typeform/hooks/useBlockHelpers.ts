import { ChangeEvent, useCallback } from 'react';
import { FileRejection } from 'react-dropzone';
import { useFormikContext } from 'formik';

export default <T extends unknown>() => {
  const { values, errors, setFieldValue, setFieldError } = useFormikContext<T>();

  // inject form-related props for input component
  const injectInputProps = useCallback((fieldName: string) => ({
    value: values[fieldName],
    onChange: (
      e: ChangeEvent<HTMLInputElement>
    ) => setFieldValue(fieldName, e.target.value),
    error: errors[fieldName],
  }), [values, errors]);

  // inject form-related props for uploader component
  const injectUploaderProps = useCallback((fieldName: string) => ({
    initialValue: values[fieldName] || null,
    onDropped: (value: File) => setFieldValue(fieldName, value),
    onRejected: (rejection: FileRejection[]) => {
      setFieldError(fieldName, rejection.map((r) => r.errors[0].message).join(', '));
    },
    error: errors[fieldName],
  }), [values, errors]);

  return {
    injectInputProps,
    injectUploaderProps,
  };
};
