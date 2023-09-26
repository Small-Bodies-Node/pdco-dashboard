import React, { useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useEventListener } from "../../hooks/useEventListener";
import { mobileWidthPxl } from "../../utils/constants";
import { ImageCell } from "../ImageCell";
import { MyError } from "../MyError";
import { SidebarMenu } from "../SidebarMenu";

import styles from "./styles.module.scss";

export const PageReference = () => {
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
            {!isMobile ? <div className="longTitle">{"Reference"}</div>
            : <div className="shortTitle">{"REFERENCE"}</div>}
          </ErrorBoundary>
        </div>

        <div className={styles.mainContentContainer}>
          <h2>Useful Distances</h2>

					<div className={styles.tableContainer}>
						<TableComponent
							headers={[
								"Distance from Earth's center",
								"km",
								"miles",
								"Earth radii",
								"LD",
								"AU"
							]}
							data={[
								["Mean Earth Radius", "6,371", "3,959", "1", "0.02", "0.000043"],
								["ISS Mean Orbit Distance", "6,779", "4,212", "1.06", "0.018", "0.000045"],
								["Geosynchronous Orbit Distance", "42,164", "26,199", "6.6", "0.11", "0.000282"],
								["Mean Lunar Distance", "384,402", "238,856", "60", "1", "0.002570"],
								["PHA threshold (distance from Earth's ORBIT)", "7,479,894", "4,647,790", "1,174", "19.5", "0.05"],
								["AU", "149,597,871", "92,955,807", "23,481", "389", "1"]
							]}
						/>
					</div>
        </div>
      </div>
    </>
  );
};

interface TableComponentProps {
  headers: string[];
  data: string[][];
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, data }) => {
  return (
    <table className={styles.tableComponent}>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};
