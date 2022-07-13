import { useState } from "react";
import styles from "./styles.module.scss";

import { Clock } from "../Clock";

export const Clocks = () => {
  const [isGMT, setIsGMT] = useState(false);

  return (
    <div className={styles.container} onClick={() => setIsGMT((prev) => !prev)}>
      <div className={styles.clock1}>
        <Clock
          isGMT={isGMT}
          location="Hawaii"
          timezone="Pacific/Honolulu"
          flagUrl="images/hawaii-flag.png"
        />
      </div>
      <div className={styles.clock2}>
        <Clock
          isGMT={isGMT}
          location="California"
          timezone="America/Los_Angeles"
          flagUrl="images/california-flag.png"
        />
      </div>
      <div className={styles.clock3}>
        <Clock
          isGMT={isGMT}
          location="Arizona"
          timezone="America/Phoenix"
          flagUrl="images/arizona-flag.png"
        />
      </div>
      <div className={styles.clock4}>
        <Clock
          isGMT={isGMT}
          location="DC"
          timezone="America/New_York"
          flagUrl="images/dc-flag.png"
        />
      </div>
      <div className={styles.clock5}>
        <Clock
          isGMT={isGMT}
          location="Santiago"
          timezone="America/Santiago"
          flagUrl="images/chile-flag.png"
        />
      </div>
      <div className={styles.clock6}>
        <Clock
          isGMT={isGMT}
          location="UTC"
          timezone="UTC"
          flagUrl="images/utc-flag.png"
        />
      </div>
      <div className={styles.clock7}>
        <Clock
          isGMT={isGMT}
          location="RSA"
          timezone="Africa/Johannesburg"
          flagUrl="images/rsa-flag.png"
        />
      </div>
      <div className={styles.clock8}>
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
