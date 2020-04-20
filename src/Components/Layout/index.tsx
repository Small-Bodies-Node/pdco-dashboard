import React from 'react';
import { useStyles } from './styles';

export const Layout = (props: React.PropsWithChildren<any>) => {
  const classes = useStyles();
  return <div className={'layout-container ' + classes.container}>{props.children}</div>;
};
