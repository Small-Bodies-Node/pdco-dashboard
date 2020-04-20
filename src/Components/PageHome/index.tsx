import React from 'react';

import { ImageCell } from '../ImageCell';
import { useStyles } from './styles';
import { Clocks } from '../Clocks';
import { Sentry } from '../Sentry';

export const PageHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.imageLeft}>
        <ImageCell imageUrl="images/pdco-logo.jpg" />
      </div>
      <div className={classes.imageRight}>
        <ImageCell imageUrl="images/nasa-logo.png" />
      </div>
      <div className={classes.title}> Planetary Defense Coordination Office </div>
      <div className={classes.clocks}>
        <Clocks />
      </div>
      <div className={classes.neoCount}>NEOCOUNT</div>
      <div className={classes.sentry}>
        <Sentry />
      </div>
      <div className={classes.programs}>PROGRAMS</div>
      <div className={classes.recentTab}>RECENTTAB</div>
      <div className={classes.futureTab}>FUTURETAB</div>
    </div>
  );
};
