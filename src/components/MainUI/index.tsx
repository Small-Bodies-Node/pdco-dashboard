import { useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMeteor,
  faShieldAlt,
  faTable,
  faGlobeAmericas,
  faRedo,
  faMoon,
  faChartColumn
} from "@fortawesome/free-solid-svg-icons";

// My constants, hooks, etc.
import { ImageCell } from "../ImageCell";
import { MyError } from "../MyError";
import { Clocks } from "../Clocks";
import { Sentry } from "../Sentry";
import { ProgramsMap } from "../ProgramsMap";
import { NeoCount } from "../NeoCount";
import { TitledCell } from "../TitledCell";
import { TableCAD } from "../TableCAD";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formattedTimestamp } from "../../utils/formattedTime";
import { fetchAllData } from "../../utils/fetchAllData";
import { useInterval } from "../../hooks/useInterval";
import { useEventListener } from "../../hooks/useEventListener";
import { MoonPhase } from "../MoonPhase";
import { MoonPhaseModal } from "../MoonPhaseModal/index";
import { IFilterSortData } from "../../models/IFilterSortData";
import { FilterSortButton } from "../FilterSortButton";
import { RecentCAStatsModal } from "../RecentCAStatsModal";
import { IFetchedData } from "../../models/IFetchedData";
import { mobileWidthPxl } from "../../utils/constants";
import styles from "./styles.module.scss";
import { SidebarMenu } from "../SidebarMenu";
import { useRouter } from "next/router";
import { DiscoveryStats } from "../DiscoveryStats";
import { DiscoveryStatsModal } from "../DiscoveryStatsModal";
import { NeoSearchModal } from "../NeoSearchModal";

/**
 *
 */
export const MainUI = () => {
  // --->>

  // State
  const [storedData, setStoredData] = useLocalStorage<null | IFetchedData>(
    "API_DATA",
    null
  );
  const [storedIntervalToRefreshDataSecs] = useLocalStorage<number>(
    "CHECK_FOR_DATA_REFRESH_INTERVAL",
    12 * 60 * 60
  );
  const [isSearching, setIsSearching] = useState(!true);
  const [displayDate, setDisplayDate] = useState("");

  const [isMoonPhaseModalShown, setIsMoonPhaseModalShown] = useState(false);
  const [filterSortDataLast7Days, setFilterSortDataLast7Days] =
    useState<IFilterSortData>({
      column: "date",
      direction: "ascending",
      isShowingCloseApproachesWithMinLessThan1LD: false
    });
  const [filterSortDataNext10Years, setFilterSortDataNext10Years] =
    useState<IFilterSortData>({
      column: "date",
      direction: "ascending",
      isShowingCloseApproachesWithMinLessThan1LD: false
    });
  const [filterSortDataLargeFarNextYear, setFilterSortDataLargeFarNextYear] =
    useState<IFilterSortData>({
      column: "date",
      direction: "ascending",
      isShowingCloseApproachesWithMinLessThan1LD: true
    });

  const [isRecentCAStatsModalShown, setIsRecentCAStatsModalShown] =
    useState(false);
  const [isDiscoveryStatsModalShown, setIsDiscoveryStatsModalShown] =
    useState(false);

  // Check if mock data is to be used
  const router = useRouter();
  const isMock = router.query['isMock'] === 'true';

  // Choose how long to check if the 'date' needs to be refreshed
  const intervalToCheckForDataSecs = isMock ? 10000 : 2;

  // Check for changes in window size
  const [isMobile, setIsMobile] = useState(false);
  const windowResizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth < mobileWidthPxl);
  }, [setIsMobile]);
  useEventListener("resize", windowResizeHandler);
  useEffect(windowResizeHandler, []);

  // Set up regular checks to see if it's time to refresh data
  const checkIfItsTimeForDataUpdate = () => {
    if (!!storedData) {
      const dtSecs =
        (new Date().getTime() - new Date(storedData.timestamp).getTime()) /
        1000;
      if (dtSecs > storedIntervalToRefreshDataSecs) {
        setIsSearching(true);
      }
    }
  };
  useInterval(checkIfItsTimeForDataUpdate, intervalToCheckForDataSecs * 1000);

  // Re-fetch data on pertinent changes
  useEffect(() => {
    if (!storedData || isSearching || isMock) {
      fetchAllData(isMock).then((data) => {
        if (!!data) setStoredData(data);
        setIsSearching(false);
        setDisplayDate(data ? formattedTimestamp(data.timestamp) : "");
      });
    } else {
      setDisplayDate(
        storedData ? formattedTimestamp(storedData.timestamp) : ""
      );
    }
  }, [isMock, isSearching, setIsSearching]);

  const isDisplayed = !(isSearching || !storedData);

  return (
    <>
      <MoonPhaseModal
        isShown={isMoonPhaseModalShown}
        setIsShown={setIsMoonPhaseModalShown}
      />
      <RecentCAStatsModal
        isShown={isRecentCAStatsModalShown}
        setIsShown={setIsRecentCAStatsModalShown}
      />
      <DiscoveryStatsModal
        isShown={isDiscoveryStatsModalShown}
        setIsShown={setIsDiscoveryStatsModalShown}
      />
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
        <div className={styles.title} onClick={() => setIsSearching(true)}>
          <ErrorBoundary fallbackRender={() => <MyError />}>
            {!isMobile ? <div className="longTitle">
              {"Planetary Defense Coordination Office Status Summary"}
            </div>
            :
            <div className={styles.shortTitle}>{"PDCO STATUS"}</div>}
            <div className={styles.date}>
              <span style={{ paddingRight: 3 }}>{displayDate + " "}</span>
              <FontAwesomeIcon
                style={{ fontSize: 10 }}
                flip="horizontal"
                icon={faRedo}
              />
            </div>
          </ErrorBoundary>
        </div>
        <div className={styles.clocks}>
          <ErrorBoundary fallbackRender={() => <MyError />}>
            <Clocks />
          </ErrorBoundary>
        </div>
        <div className={styles.neoCount}>
          <TitledCell
            title="RECENT CAs <1LD"
            onClick={() => setIsRecentCAStatsModalShown(true)}
            icon={() => <FontAwesomeIcon icon={faMeteor} />}
            isDisplayed={isDisplayed}
          >
            {storedData && (
              <NeoCount
                cadData={storedData!.cadData}
                dateAtDataFetch={storedData!.timestamp}
              />
            )}
          </TitledCell>
        </div>
        <div className={styles.discoveryStats}>
          <TitledCell
            title="DISCOVERY STATS"
            onClick={() => setIsDiscoveryStatsModalShown(true)}
            icon={() => <FontAwesomeIcon icon={faChartColumn} />}
            isDisplayed={isDisplayed}
          >
            <DiscoveryStats />
          </TitledCell>
        </div>
        <div className={styles.sentry}>
          <TitledCell
            title="SENTRY STATUS"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Highest ts_max value in latest sentry data"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={isDisplayed}
          >
            {!!storedData && <Sentry sentryData={storedData!.sentryData} />}
          </TitledCell>
        </div>
        <div className={styles.moonPhase}>
          <TitledCell
            title="MOON PHASE"
            tooltip=""
            icon={() => <FontAwesomeIcon icon={faMoon} />}
            isDisplayed={isDisplayed}
            onClick={() => setIsMoonPhaseModalShown(true)}
          >
            <MoonPhase />
          </TitledCell>
        </div>
        <div className={styles.programs}>
          <TitledCell
            title="PROJECTS"
            link=""
            tooltip="Daylight map of world with PDCO project locations"
            icon={() => <FontAwesomeIcon icon={faGlobeAmericas} />}
            isDisplayed={isDisplayed}
          >
            <ProgramsMap />
          </TitledCell>
        </div>
        <div className={styles.recentTab}>
          <TitledCell
            title="CLOSE APPROACHES <1LD LAST 30 DAYS"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at smallest nominal distance"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
            headerElement={
              <FilterSortButton
                filterSortData={filterSortDataLast7Days}
                setFilterSortData={setFilterSortDataLast7Days}
              />
            }
          >
            {!!storedData && (
              <TableCAD
                period="recent"
                cadData={storedData!.cadData}
                dateAtDataFetch={storedData!.timestamp}
                isHeightAuto={isMobile}
                filterSortData={filterSortDataLast7Days}
              />
            )}
          </TitledCell>
        </div>
        <div className={styles.futureTab}>
          <TitledCell
            title="CLOSE APPROACHES <1LD NEXT 10 YEARS"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at closest approach"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
            headerElement={
              <FilterSortButton
                filterSortData={filterSortDataNext10Years}
                setFilterSortData={setFilterSortDataNext10Years}
              />
            }
          >
            {!!storedData && (
              <TableCAD
                period="future"
                cadData={storedData!.cadData}
                dateAtDataFetch={storedData!.timestamp}
                isHeightAuto={isMobile}
                filterSortData={filterSortDataNext10Years}
              />
            )}
          </TitledCell>
        </div>
        <div className={styles.largeDistantTab}>
          <TitledCell
            title="LARGE NEOs <19LD NEXT 1 YEAR"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approaches with H <24 in size passing within 19LD"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
            headerElement={
              <FilterSortButton
                filterSortData={filterSortDataLargeFarNextYear}
                setFilterSortData={setFilterSortDataLargeFarNextYear}
              />
            }
          >
            {!!storedData && (
              <TableCAD
                period="future"
                cadData={storedData!.largeDistantCadData}
                dateAtDataFetch={storedData!.timestamp}
                isHeightAuto={isMobile}
                filterSortData={filterSortDataLargeFarNextYear}
              />
            )}
          </TitledCell>
        </div>
      </div>
    </>
  );
};
