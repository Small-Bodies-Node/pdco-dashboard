import React from 'react';
import { useStyles } from './styles';

export const PageAbout = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>PDCO Status Dashboard</h1>
      <p>
        This is the dashboard for quickly summarizing the state of concern for the Planetary Defence
        Coordination Office.
      </p>
      <h1>Usage</h1>
      <p>
        To preserve API calls, this dashboard caches data at the time displayed in the title bar. It
        will also refresh automatically every 12 hours. You can manually refresh the data by
        clicking on the title bar.
      </p>
    </div>
  );
};
