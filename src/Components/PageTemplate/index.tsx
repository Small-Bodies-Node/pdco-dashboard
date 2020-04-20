import React from 'react';

import { useStyles } from './styles';

export const PageTemplate = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <h1>Template Page</h1>
        <p className={classes.example}>This is my template page!</p>
      </div>
    </>
  );
};
