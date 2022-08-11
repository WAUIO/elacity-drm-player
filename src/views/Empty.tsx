import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 4),
}));

const EmptyView: React.FC<never> = () => {
  const location = useLocation();

  return (
    <Wrapper>
      Coming soon...
      <code style={{ display: 'block', marginTop: 20, fontSize: 13 }}>{JSON.stringify(location)}</code>
    </Wrapper>
  );
};

export default EmptyView;
