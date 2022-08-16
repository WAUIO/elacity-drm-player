import * as React from 'react';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { mcoApi } from 'src/lib/scm';
import { CreateFormData } from './types';

export const useTemplateDialogFlow = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClickOpen, handleClose };
};

interface TemplateFormDialogProps {
  open: boolean;
  onClose?: () => void;
  onUpdate?: () => void;
}

export default function TemplateFormDialog({ open, onClose, onUpdate }: TemplateFormDialogProps) {
  const { values, setFieldValue } = useFormikContext<CreateFormData>();
  React.useEffect(() => {
    if (open) {
      mcoApi.loadTemplate(values.distributionMethod, values.label).then(
        (templateRaw: string) => setFieldValue('templateRaw', templateRaw)
      );
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen>
      <DialogTitle>Update Media Contract Template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can modify the original template to it fit better to your needs
        </DialogContentText>
        <TextField
          autoFocus
          multiline
          margin="dense"
          fullWidth
          variant="outlined"
          rows={20}
          className="code"
          InputProps={{
            sx: {
              height: '80vh',
              '& textarea:first-of-type': {
                resize: 'none',
                height: '100%!important',
                fontSize: '0.75rem',
                fontFamily: 'source-code-pro, \'PT Mono\', monospace',
              },
            },
          }}
          value={values.templateRaw}
          onChange={(e) => setFieldValue('templateRaw', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setFieldValue('templateRaw', ''); onClose(); }}>Cancel</Button>
        <Button variant="contained" onClick={onUpdate || onClose}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
