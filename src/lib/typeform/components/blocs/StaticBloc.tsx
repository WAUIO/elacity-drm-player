import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Component from '../fields/Static';
import { BlockComponentProps, StaticBlock } from '../../types';

export interface Props extends BlockComponentProps<StaticBlock> {
  justifyContent?: BoxProps['justifyContent'];
  sx?: BoxProps['sx'];
}

const StaticComponent = React.forwardRef<HTMLDivElement, Props>(({
  padding,
  content,
  justifyContent,
  sx,
}, ref) => (
  <Box ref={ref} display="flex" justifyContent={justifyContent} p={padding || 0} sx={sx}>
    <Component {...content} />
  </Box>
));

StaticComponent.defaultProps = {
  justifyContent: 'space-around',
};

export default StaticComponent;
