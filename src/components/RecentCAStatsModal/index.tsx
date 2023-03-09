import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor, faTimes } from "@fortawesome/free-solid-svg-icons";

import { apiDateStringToJsDate } from "../../utils/apiDateStringToJsDate";
import { useEventListener } from "../../hooks/useEventListener";
import { magToSizeKm } from "../../utils/conversionFormulae";
import { TitledCell } from "../TitledCell";
import {
  cadFieldIndices,
  geoDistanceAu,
  mobileWidthPxl,
} from "../../utils/constants";
import styles from "./styles.module.scss";

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
}
export const RecentCAStatsModal = ({ isShown, setIsShown }: IProps) => {
  // --->>

  // State
  const [fiscalYear, setFiscalYear] = useState(0);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const [fyAll, setFyAll] = useState<number | string>("-");
  const [fyGeo, setFyGeo] = useState<number | string>("-");
  const [fy50m, setFy50m] = useState<number | string>("-");

  const [calendarAll, setCalendarAll] = useState<number | string>("-");
  const [calendarGeo, setCalendarGeo] = useState<number | string>("-");
  const [calendar50m, setCalendar50m] = useState<number | string>("-");

  const [fiscalYearSelectElements, setFiscalYearSelectElements] = useState<
    JSX.Element[]
  >([]);
  const [calendarYearSelectElements, setCalendarYearSelectElements] = useState<
    JSX.Element[]
  >([]);

  // Check for changes in window size
  const [isMobile, setIsMobile] = useState(false);
  const windowResizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth < mobileWidthPxl);
  }, [setIsMobile]);
  useEventListener("resize", windowResizeHandler);
  useEffect(windowResizeHandler, []);

  // Initial data fetching
  useEffect(() => {
    const dateToday = new Date();

    // Generate fiscal year elements
    let fyElementsArray = [];
    for (let i = dateToday.getFullYear(); i >= 2010; i--) {
      fyElementsArray.push(
        <option key={i} value={i}>
          {i === dateToday.getFullYear() && dateToday.getMonth() + 1 < 10
            ? `FY${i} (Partial)`
            : `FY${i}`}
        </option>
      );
    }
    setFiscalYearSelectElements(fyElementsArray);

    // Generate calendar year elements
    let calendarElementsArray = [];
    for (let i = dateToday.getFullYear(); i >= 1950; i--) {
      calendarElementsArray.push(
        <option key={i} value={i}>
          {i === dateToday.getFullYear() ? `${i} (Partial)` : `${i}`}
        </option>
      );
    }
    setCalendarYearSelectElements(calendarElementsArray);

    let startDateString = `${dateToday.getFullYear() - 1}-01-01`;

    // Have not reached this year's fiscal year yet
    if (dateToday.getMonth() + 1 < 10) {
      startDateString = `${dateToday.getFullYear() - 2}-01-01`;

      onFiscalYearChange(dateToday.getFullYear() - 1);
    } else {
      onFiscalYearChange(dateToday.getFullYear());
    }

    onCalendarYearChange(dateToday.getFullYear());
  }, []);

  // Handle changes to the fiscal year
  const onFiscalYearChange = (selectedYear: number) => {
    setFyAll("-");
    setFyGeo("-");
    setFy50m("-");

    setFiscalYear(selectedYear);

    // Process change
    const dateToday = new Date();

    let startDateString = `${selectedYear - 1}-10-01`;
    let endDateString = `${selectedYear}-09-30`;

    // Selected this year, and have not reached this year's fiscal year yet
    if (
      selectedYear === dateToday.getFullYear() &&
      dateToday.getMonth() + 1 < 10
    ) {
      endDateString = `${selectedYear}-${`${dateToday.getMonth() + 1}`.padStart(
        2,
        "0"
      )}-${`${dateToday.getDate() + 1}`.padStart(2, "0")}`;
    }

    const cadUrl = `/api/getCadData?dateMin=${startDateString}&dateMax=${endDateString}&distMax=1LD`;

    let fyAllCount = 0;
    let fyGeoCount = 0;
    let fy50mCount = 0;
    fetch(cadUrl)
      .then((res) => res.json())
      .then((result) => {
        result.data.forEach((element: string[]) => {
          fyAllCount++;

          // Within geodistance
          if (
            parseFloat(element[cadFieldIndices.dist] ?? "1") < geoDistanceAu
          ) {
            fyGeoCount++;
          }
          // > 50m
          if (magToSizeKm(parseFloat(element[cadFieldIndices.h])) > 0.05) {
            fy50mCount++;
          }
        });
      })
      .then(() => {
        setFyAll(fyAllCount);
        setFyGeo(fyGeoCount);
        setFy50m(fy50mCount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle changes to the calendar year
  const onCalendarYearChange = (selectedYear: number) => {
    setCalendarAll("-");
    setCalendarGeo("-");
    setCalendar50m("-");

    setCalendarYear(selectedYear);

    // Process change
    const dateToday = new Date();

    let startDateString = `${selectedYear}-01-01`;
    let endDateString = `${selectedYear}-12-31`;

    // Selected this year
    if (selectedYear === dateToday.getFullYear()) {
      endDateString = `${selectedYear}-${`${dateToday.getMonth() + 1}`.padStart(
        2,
        "0"
      )}-${`${dateToday.getDate() + 1}`.padStart(2, "0")}`;
    }

    // const cadUrl = `https://ssd-api.jpl.nasa.gov/cad.api?date-min=${startDateString}&date-max=${endDateString}&dist-max=1LD`;
    const cadUrl = `/api/getCadData?dateMin=${startDateString}&dateMax=${endDateString}&distMax=1LD`;

    let calendarAllCount = 0;
    let calendarGeoCount = 0;
    let calendar50mCount = 0;
    fetch(cadUrl)
      .then((res) => res.json())
      .then((result) => {
        result.data.forEach((element: string[]) => {
          calendarAllCount++;

          // Within geodistance
          if (
            parseFloat(element[cadFieldIndices.dist] ?? "1") < geoDistanceAu
          ) {
            calendarGeoCount++;
          }
          // > 50m
          if (magToSizeKm(parseFloat(element[cadFieldIndices.h])) > 0.05) {
            calendar50mCount++;
          }
        });
      })
      .then(() => {
        setCalendarAll(calendarAllCount);
        setCalendarGeo(calendarGeoCount);
        setCalendar50m(calendar50mCount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!isShown) {
    return null;
  }

  return (
    <div
      className={styles.backgroundContainer}
      onClick={() => setIsShown(false)}
    >
      <div
        className={styles.mainContentContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeButtonContainer}>
          <FontAwesomeIcon
            className={styles.closeButton}
            onClick={() => setIsShown(false)}
            style={{ fontSize: 18 }}
            flip="horizontal"
            icon={faTimes}
          />
        </div>

        <TitledCell
          title="Close Approaches <1LD"
          icon={() => <FontAwesomeIcon icon={faMeteor} />}
          link="https://cneos.jpl.nasa.gov/ca/"
          isDisplayed={true}
          isHeightAuto={true}
        >
          <div className={styles.statsContainer}>
            <div style={{ gridArea: "blank" }} />

            <div style={{ gridArea: "time1" }}>
              Fiscal Year {isMobile ? <br /> : "("}
              <select
                value={fiscalYear}
                onChange={(e) => onFiscalYearChange(parseInt(e.target.value))}
              >
                {fiscalYearSelectElements}
              </select>
              {!isMobile && ")"}
            </div>

            <div style={{ gridArea: "time2" }}>
              Calendar Year {isMobile ? <br /> : "("}
              <select
                value={calendarYear}
                onChange={(e) => onCalendarYearChange(parseInt(e.target.value))}
              >
                {calendarYearSelectElements}
              </select>
              {!isMobile && ")"}
            </div>

            <div style={{ gridArea: "all" }}>All</div>

            <div style={{ gridArea: "geo" }}>{"<"}GEO</div>

            <div style={{ gridArea: "m" }}>{">"}50m</div>

            <span style={{ gridArea: "data1" }}>{fyAll}</span>

            <span style={{ gridArea: "data2" }}>{fyGeo}</span>

            <span style={{ gridArea: "data3" }}>{fy50m}</span>

            <span style={{ gridArea: "data4" }}>{calendarAll}</span>

            <span style={{ gridArea: "data5" }}>{calendarGeo}</span>

            <span style={{ gridArea: "data6" }}>{calendar50m}</span>
          </div>
        </TitledCell>

        <a
          href="https://cneos.jpl.nasa.gov/ca/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cneosButton}
        >
          Go to CNEOS CA List
        </a>
      </div>
    </div>
  );
};
