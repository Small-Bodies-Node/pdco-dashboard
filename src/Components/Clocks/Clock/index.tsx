import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { useStyles } from './styles';

interface IProps {
  location: string;
  timezone: string;
  flagUrl: string;
}

export const Clock = (props: IProps) => {
  const classes = useStyles();
  const [m, setM] = useState(moment.tz(props.timezone));

  useEffect(() => {
    // Recompute every sec; could do less often to preserve resources
    const interval = setInterval(() => setM(m.add(1, 'second').clone()), 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className={classes.container}>
        <div className="aux">{props.location}</div>
        <div className="aux">{m.format('HH:mm')}</div>
        <div
          className={classes.flagImage + ' auy'}
          style={{ backgroundImage: `url(${props.flagUrl})` }}
        />
      </div>
    </>
  );
};
