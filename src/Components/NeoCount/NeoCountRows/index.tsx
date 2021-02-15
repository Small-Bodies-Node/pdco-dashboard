import React, { useState, useEffect } from 'react';

import { useStyles } from './styles';

interface IProps {
  labels: [string, string, string];
}

export const NeoCountRows = (props: IProps) => {
  const [row1, row2, row3] = props.labels;
  const row1Weight = row1.includes('+') ? 'bold' : 'normal';
  const row2Weight = row2.includes('+') ? 'bold' : 'normal';
  const row3Weight = row3.includes('+') ? 'bold' : 'normal';
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.row} style={{ fontWeight: row1Weight }}>
          {row1.replaceAll('+', '')}
        </div>
        <div className={classes.row} style={{ fontWeight: row2Weight }}>
          {row2.replaceAll('+', '')}
        </div>
        <div className={classes.row} style={{ fontWeight: row3Weight }}>
          {row3.replaceAll('+', '')}
        </div>
      </div>
    </>
  );
};
