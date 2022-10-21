import React from 'react';
import { Box } from '@mui/material';
import Component from '../fields/Static';
import { BlockComponentProps, StaticBlock } from '../../types';

export interface Props extends BlockComponentProps<StaticBlock> {}

const StaticComponent = React.forwardRef<HTMLDivElement, Props>(({ padding, content }, ref) => (
  <Box ref={ref} display="flex" justifyContent="space-around" p={padding}>
    <Component {...content} />
  </Box>
));

StaticComponent.defaultProps = {
  padding: 0,
};

export default StaticComponent;
