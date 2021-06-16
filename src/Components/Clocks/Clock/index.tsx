import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { useStyles } from './styles';
import { useEventListener } from '../../../Hooks/useEventListener';
import { useInterval } from '../../../Hooks/useInterval';
interface IProps {
  location: string;
  timezone: string;
  flagUrl: string;
  isGMT: boolean;
}

export const Clock = (props: IProps) => {
  // --------------------------------->>>

  const { flagUrl, isGMT, location, timezone } = props;
  const classes = useStyles();
  const [m, setM] = useState(moment.tz(props.timezone));

  // Add 1sec to clock every sec; reset clock
  useInterval(() => setM(m.add(1, 'second').clone()), 1000);
  // Reset clock every N secs
  const resetClock = () => setM(moment.tz(props.timezone));
  useInterval(resetClock, 100 * 1000);
  // Reset clock on each window focus
  useEventListener('focus', resetClock);

  let timeString = m.format('HH:mm');

  // If isGMT then we show just difference in hours from UTC
  if (isGMT) {
    // Compute the time difference
    const now = moment.utc();
    const diff = moment.tz.zone(props.timezone)!.utcOffset(now as any) / 60;
    timeString = `UTC${-diff >= 0 ? '+' : ''}${-diff}`;
  }

  return (
    <div className={classes.container}>
      <div className="aux">{props.location}</div>
      <div className="aux">{timeString}</div>
      <div
        className={classes.flagImage + ' auy'}
        style={{ backgroundImage: `url(${props.flagUrl})` }}
      />
    </div>
  );
};
