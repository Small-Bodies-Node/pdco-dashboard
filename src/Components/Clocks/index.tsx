import React from 'react';
import { useStyles } from './styles';

import { Clock } from './Clock';

export const Clocks = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.clock1}>
        <Clock location="Hawaii" time="12:00" flagUrl="images/hawaii-flag.png" />
      </div>
      <div className={classes.clock2}>
        <Clock location="Arizona" time="12:00" flagUrl="images/arizona-flag.svg" />
      </div>
      <div className={classes.clock3}>
        <Clock location="DC" time="12:00" flagUrl="images/dc-flag.svg" />
      </div>
      <div className={classes.clock4}>
        <Clock location="Santiago" time="12:00" flagUrl="images/chile-flag.png" />
      </div>
      <div className={classes.clock5}>
        <Clock location="UTC" time="12:00" flagUrl="images/utc-flag.png" />
      </div>
      <div className={classes.clock6}>
        <Clock location="RSA" time="12:00" flagUrl="images/rsa-flag.png" />
      </div>
      <div className={classes.clock7}>
        <Clock location="Perth" time="12:00" flagUrl="images/aus-flag.png" />
      </div>
    </div>
  );
};
