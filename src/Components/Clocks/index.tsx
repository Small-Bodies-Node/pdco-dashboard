import React, { useState } from 'react';
import { useStyles } from './styles';

import { Clock } from './Clock';

export const Clocks = () => {
  const classes = useStyles();
  const [isGMT, setIsGMT] = useState(false);

  return (
    <div className={classes.container} onClick={() => setIsGMT((prev) => !prev)}>
      <div className={classes.clock1}>
        <Clock
          isGMT={isGMT}
          location="Hawaii"
          timezone="Pacific/Honolulu"
          flagUrl="images/hawaii-flag.png"
        />
      </div>
      <div className={classes.clock2}>
        <Clock
          isGMT={isGMT}
          location="California"
          timezone="America/Los_Angeles"
          flagUrl="images/california-flag.png"
        />
      </div>
      <div className={classes.clock3}>
        <Clock
          isGMT={isGMT}
          location="Arizona"
          timezone="America/Phoenix"
          flagUrl="images/arizona-flag.png"
        />
      </div>
      <div className={classes.clock4}>
        <Clock
          isGMT={isGMT}
          location="DC"
          timezone="America/New_York"
          flagUrl="images/dc-flag.png"
        />
      </div>
      <div className={classes.clock5}>
        <Clock
          isGMT={isGMT}
          location="Santiago"
          timezone="America/Santiago"
          flagUrl="images/chile-flag.png"
        />
      </div>
      <div className={classes.clock6}>
        <Clock isGMT={isGMT} location="UTC" timezone="UTC" flagUrl="images/utc-flag.png" />
      </div>
      <div className={classes.clock7}>
        <Clock
          isGMT={isGMT}
          location="RSA"
          timezone="Africa/Johannesburg"
          flagUrl="images/rsa-flag.png"
        />
      </div>
      <div className={classes.clock8}>
        <Clock
          isGMT={isGMT}
          location="Perth"
          timezone="Australia/Perth"
          flagUrl="images/aus-flag.png"
        />
      </div>
    </div>
  );
};
