import React, { useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useEventListener } from "../../hooks/useEventListener";
import { mobileWidthPxl } from "../../utils/constants";
import { ImageCell } from "../ImageCell";
import { MyError } from "../MyError";
import { SidebarMenu } from "../SidebarMenu";

import styles from "./styles.module.scss";

export const PageAbout = () => {
  // --->>

  // Check for changes in window size
  const [isMobile, setIsMobile] = useState(false);
  const windowResizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth < mobileWidthPxl);
  }, [setIsMobile]);
  useEventListener("resize", windowResizeHandler);
  useEffect(windowResizeHandler, []);

  return (
    <div className={"main-ui-container " + styles.container}>
      <div className={styles.imageLeft}>
        <ImageCell
          link="https://www.nasa.gov/planetarydefense"
          imageUrl="images/pdco-logo.jpg"
        />
      </div>
      <div className={styles.imageRight}>
        <ImageCell
          link="https://www.nasa.gov/planetarydefense"
          imageUrl="images/nasa-logo.png"
        />
      </div>

      <div className={styles.title}>
        <ErrorBoundary fallbackRender={() => <MyError />}>
          {!isMobile ? <div className="longTitle">{"About"}</div>
          : <div className="shortTitle">{"ABOUT"}</div>}
        </ErrorBoundary>
      </div>

      <div className={styles.mainContentContainer}>
        <h2>Usage</h2>

        <ul>
          <li>
            To preserve API calls, this dashboard caches data at the time
            displayed in the title bar. It will also refresh automatically every
            12 hours. You can manually refresh the data by clicking on the title
            bar.
          </li>

          <li>
            <span style={{ color: "yellow" }}>Yellow text</span> in the tables
            indicates an NEO is passing below geosynchronous orbit (42,164km
            from Earth center).
          </li>

          <li>
            An asterisk (*) next to a distance value indicates there is {">"}
            0.1LD difference between the minimum and maximum distance values.
          </li>
        </ul>

        <h2>General Information</h2>

        <ul>
          <li>
            This is the dashboard for quickly summarizing the state of concern
            for the Planetary Defence Coordination Office.
          </li>

          <li>Made by Daniel Darg, with additional work done by Jake Short.</li>
        </ul>
      </div>
    </div>
  );
};
