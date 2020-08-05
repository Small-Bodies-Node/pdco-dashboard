import React from 'react';
import { useStyles } from './styles';

import { Clock } from './Clock';

export const Clocks = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.clock1}>
        <Clock location="Hawaii" timezone="Pacific/Honolulu" flagUrl="images/hawaii-flag.png" />
      </div>
      <div className={classes.clock2}>
        <Clock location="Arizona" timezone="America/Phoenix" flagUrl="images/arizona-flag.png" />
      </div>
      <div className={classes.clock3}>
        <Clock location="DC" timezone="America/New_York" flagUrl="images/dc-flag.svg" />
      </div>
      <div className={classes.clock4}>
        <Clock location="Santiago" timezone="America/Santiago" flagUrl="images/chile-flag.png" />
      </div>
      <div className={classes.clock5}>
        <Clock location="UTC" timezone="UTC" flagUrl="images/utc-flag.png" />
      </div>
      <div className={classes.clock6}>
        <Clock location="RSA" timezone="Africa/Johannesburg" flagUrl="images/rsa-flag.png" />
      </div>
      <div className={classes.clock7}>
        <Clock location="Perth" timezone="Australia/Perth" flagUrl="images/aus-flag.png" />
      </div>
    </div>
  );
};
