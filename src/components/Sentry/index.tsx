import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ISentryData } from "../../models/ISentryData";
import { SentryModal } from "../SentryModal";
import styles from "./styles.module.scss";

const triStrokePxl = 10;
const svgBorder = 20;

interface IProps {
  sentryData: ISentryData;
}

/**
 * Draw warning triangle to display the highest value of ts_max from the many entries
 * in the latest sentry-data API
 * FYI -- ts_max is defined [here](https://ssd-api.jpl.nasa.gov/doc/sentry.html) as the
 * "Maximum detected hazard rating according to the Torino impact hazard scale,
 *  based on the tabulated impact probability and impact energy"
 */
export const Sentry = ({ sentryData }: IProps) => {
  // --->>

  // if query param supplied, throw an error to demo error handling
  const induceErrorQueryParam = useRouter().query.error;
  const [isError] = useState(induceErrorQueryParam === "true");
  if (isError) throw new Error("This is an artificial error");

  const [score, setScore] = useState<number>(0);
  const [triColor, setTriColor] = useState<
    "grey" | "green" | "yellow" | "orange" | "red"
  >("grey");

  const [isPopupShown, setIsPopupShown] = useState(false);

  useEffect(() => {
    if (!sentryData || !sentryData.data) return;
    // Filter out those objects that contain ts_max values that aren't a string
    // TODO: figure out a more robust test of the fitness of such objects
    const tsMaxValues = sentryData.data
      .filter((datum: any, ind: number) => {
        return typeof datum.ts_max === "string";
      })
      // Now map the filtered objects within the array of objects to an array of ts_max values (converted from strings to numbers)
      .map((datum: any) => parseInt(datum.ts_max, 10));

    // Now find the highest numeric value within the array
    const highestTsMaxValue = Math.max.apply(null, tsMaxValues);

    // Set our stateful variable to the highest-computed ts_max value
    setScore(highestTsMaxValue);
  }, [sentryData]);

  useEffect(() => {
    if (score === 0) setTriColor("grey");
    if (score === 1) setTriColor("green");
    if (score >= 2 && score <= 4) setTriColor("yellow");
    if (score >= 5 && score <= 7) setTriColor("orange");
    if (score >= 8) setTriColor("red");
  }, [score]);

  return (
    <>
      <SentryModal
        isShown={isPopupShown}
        setIsShown={setIsPopupShown}
        sentryData={sentryData}
      />

      <div className={styles.container} onClick={() => setIsPopupShown(true)}>
        <svg
          className={styles.triangleSvg}
          height="100"
          width="100px"
          viewBox={`${-svgBorder} ${-svgBorder} ${100 + 2 * svgBorder} ${
            100 + 2 * svgBorder
          }`}
        >
          <g>
            <path
              d="M 50,0 L 0,100 L 100,100 Z"
              fill="white"
              stroke={triColor}
              strokeWidth={triStrokePxl}
            />
          </g>
        </svg>
        <div className={styles.score}>{score}</div>
      </div>
    </>
  );
};
