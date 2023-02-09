import { useState } from "react";
import moment from "moment-timezone";

import { useEventListener } from "../../hooks/useEventListener";
import { useInterval } from "../../hooks/useInterval";

import styles from "./styles.module.scss";

interface IProps {
  location: string;
  timezone: string;
  flagUrl: string;
  isGMT: boolean;
}

export const Clock = (props: IProps) => {
  // --->>

  const { flagUrl, isGMT, location, timezone } = props;
  const [m, setM] = useState(moment.tz(timezone));

  // Add 1sec to clock every sec; reset clock
  useInterval(() => setM(m.add(1, "second").clone()), 1000);
  // Reset clock every N secs
  const resetClock = () => setM(moment.tz(timezone));
  useInterval(resetClock, 100 * 1000);
  // Reset clock on each window focus
  useEventListener("focus", resetClock);

  let timeString = m.format("HH:mm");

  // If isGMT then we show just difference in hours from UTC
  if (isGMT) {
    // Compute the time difference
    const now = moment.utc();
    const diff = moment.tz.zone(timezone)!.utcOffset(now as any) / 60;
    timeString = `UTC${-diff >= 0 ? "+" : ""}${-diff}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.aux}>{location}</div>
      <div className={styles.aux}>{timeString}</div>
      <div
        className={styles.flagImage + " auy"}
        style={{ backgroundImage: `url(${flagUrl})` }}
      />
    </div>
  );
};
