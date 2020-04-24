import React from 'react';

import { useStyles } from './styles';

export const Template = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <h1>Template Page</h1>
        <p className={classes.example}>This is a template component!</p>
      </div>
    </>
  );
};
