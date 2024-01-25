import React, { useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useEventListener } from "../../hooks/useEventListener";
import { mobileWidthPxl } from "../../utils/constants";
import { ImageCell } from "../ImageCell";
import { MyError } from "../MyError";
import { SidebarMenu } from "../SidebarMenu";

import styles from "./styles.module.scss";

export const PageQuickLinks = () => {
  // --->>

  // Check for changes in window size
  const [isMobile, setIsMobile] = useState(false);
  const windowResizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth < mobileWidthPxl);
  }, [setIsMobile]);
  useEventListener("resize", windowResizeHandler);
  useEffect(windowResizeHandler, []);

  return (
    <>
      {/** Icon in top left and slide-out navigation menu */}
      <SidebarMenu />

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
            {!isMobile ? <div className="longTitle">{"Quick Links"}</div>
            : <div className="shortTitle">{"QUICK LINKS"}</div>}
          </ErrorBoundary>
        </div>

        <div className={styles.mainContentContainer}>
          <ul>
            <LinkWithLabel
              label="Asteroid Names/Citations"
              url="https://sbnmpc.astro.umd.edu/mpcitations/index.shtml"
            />
            <LinkWithLabel
              label="Asteroid Size Estimator"
              url="https://cneos.jpl.nasa.gov/tools/ast_size_est.html"
            />
            <LinkWithLabel
              label="CNEOS"
              url="https://cneos.jpl.nasa.gov/"
            />
            <LinkWithLabel
              label="MPC"
              url="https://minorplanetcenter.net/"
            />
            <LinkWithLabel
              label="MPC Annex"
              url="https://sbnmpc.astro.umd.edu/"
            />
            <LinkWithLabel
              label="MPEC Watch"
              url="https://sbnmpc.astro.umd.edu/mpecwatch/"
            />
            <LinkWithLabel
              label="Observatory Codes"
              url="https://sbnmpc.astro.umd.edu/mpecwatch/obs.html"
            />
            <LinkWithLabel
              label="Radar Research, JPL"
              url="https://echo.jpl.nasa.gov/"
            />
            <LinkWithLabel
              label="Solar System Dynamics"
              url="https://ssd.jpl.nasa.gov/"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

const LinkWithLabel = ({ label, url }: {
  label: string;
  url: string;
}) => {
  return (
    <li>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        {label} <span>({url})</span>
      </a>
    </li>
  );
};

