import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }

  return `${text.substr(0, length - 4)}...${text.substr(-4, 4)}`;
};

interface AddressProps {
  address: string;
  length?: number;
  width?: number;
}

const Container = styled('div')(({ theme }) => ({
  margin: theme.spacing(0.25, 0),
  padding: theme.spacing(0, 2),
  borderRadius: theme.spacing(20),
  background: alpha(theme.palette.primary.light, 0.15),
  display: 'flex',
  alignItems: 'center',
  '& .MuiIconButton-root': {
    marginLeft: theme.spacing(0.5),
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
      color: theme.palette.primary.main,
    },
  },
  '& .MuiTypography-root': {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}));

export const Address = ({ address, length, width }: AddressProps) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const handleCopy = React.useCallback(() => {
    if (copied) {
      return;
    }

    setCopied(true);
    setTimeout(setCopied, 5000, false);
  }, [copied]);

  return (
    <Container sx={{ width }}>
      <Typography component="div" fontFamily="monospace" fontSize="0.9rem">
        {truncateText(address, length)}
      </Typography>
      <CopyToClipboard text={address} onCopy={handleCopy}>
        <IconButton>
          {
            copied ? (
              <CheckIcon />
            ) : (
              <ContentCopyIcon />
            )
          }
        </IconButton>
      </CopyToClipboard>
    </Container>
  );
};

Address.defaultProps = {
  length: 10,
  width: 175,
};

export default Address;
