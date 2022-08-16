import React, { useRef, MutableRefObject } from 'react';
import {
  useSnackbar, SnackbarKey, OptionsObject as NotiOptions,
} from 'notistack';
import { UnsupportedChainIdError } from '@web3-react/core';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StackButton = styled(Button)(({ theme }) => ({
  color: 'white',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.grey[700],
  },
}));

export default () => {
  const snackbarId: MutableRefObject<SnackbarKey | null> = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNotistackCloseAction = (key: SnackbarKey, url?: string) => () => {
    closeSnackbar(key);
    if (url) {
      window.open(url);
    }
  };

  const handlerError: (err?: Error) => void = (err?: Error) => {
    if (!err) {
      return;
    }

    if (err instanceof UnsupportedChainIdError) {
      snackbarId.current = enqueueSnackbar('Wrong network, only Elastos Smart Chain is supported', {
        persist: true,
        preventDuplicate: true,
        variant: 'error',
        action: (key: SnackbarKey) => (
          <>
            <StackButton
              size="small"
              variant="contained"
              onClick={handleNotistackCloseAction(key, 'https://docs.ela.city/getting-setup')}
            >
              Learn more
            </StackButton>
            <StackButton size="small" variant="text" onClick={handleNotistackCloseAction(key)}>
              Dismiss
            </StackButton>
          </>
        ),
      });
      return;
    }

    enqueueSnackbar(err.message, { variant: 'error' });
  };

  return {
    handlerError,
    closeError: closeSnackbar,
    key: snackbarId.current,
    scopedClose: () => closeSnackbar(snackbarId?.current || undefined),
    throwError: (err: Error, options?: NotiOptions): SnackbarKey => enqueueSnackbar(err.message, {
      variant: 'error',
      ...(options || {}),
    }),
  };
};
