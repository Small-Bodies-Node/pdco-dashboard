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

/**
 *
 */
export const MainUI = () => {
  // --->>

  // State
  const [fetchedData, setFetchedData] = useState<null | IFetchedData>(
    null
  );
  const [isSearching, setIsSearching] = useState(!true);
  const [displayDate, setDisplayDate] = useState("");

  const [isMoonPhaseModalShown, setIsMoonPhaseModalShown] = useState(false);
  const [filterSortDataLast30Days, setFilterSortDataLast30Days] =
    useState<IFilterSortData>({
      column: "date",
      direction: "descending",
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
    if (!!fetchedData && !isSearching) {
      // age is greater than 12 hours
      if ((fetchedData.maxAge / 1000) > 12 * 60 * 60) {
        refreshData(true);
      }
    }
  };
  useInterval(checkIfItsTimeForDataUpdate, intervalToCheckForDataSecs * 1000);

  // get the data on first load
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = (noCache?: boolean) => {
    setIsSearching(true);

    fetchAllData(isMock, noCache).then((data) => {
      if (!!data) setFetchedData(data);
      setIsSearching(false);
      setDisplayDate(data ? formattedTimestamp(Date.now() - data.maxAge) : "");
    });
  }

  const isDisplayed = !(isSearching || !fetchedData);

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
            link="https://www.nasa.gov"
            imageUrl="images/nasa-logo.png"
          />
        </div>
        <div className={styles.title} onClick={() => refreshData(true)}>
          <ErrorBoundary fallbackRender={() => <MyError />}>
            {!isMobile ? <div className="longTitle">
              {"Planetary Defense Coordination Office Status Summary"}
            </div>
            :
            <div className={styles.shortTitle}>{"PDCO STATUS"}</div>}
            <div className={styles.date}>
              <span style={{ paddingRight: 3 }} suppressHydrationWarning>{displayDate + " "}</span>
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
            tooltip="Click for more detailed recent CA stats."
            onClick={() => setIsRecentCAStatsModalShown(true)}
            icon={() => <FontAwesomeIcon icon={faMeteor} />}
            isDisplayed={isDisplayed}
          >
            {fetchedData && (
              <NeoCount
                cadData={fetchedData!.cadData}
                dateAtDataFetch={fetchedData!.timestamp}
              />
            )}
          </TitledCell>
        </div>
        <div className={styles.discoveryStats}>
          <TitledCell
            title="DISCOVERY STATS"
            tooltip="Click for more detailed discovery stats."
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
            tooltip="Highest ts_max value in latest sentry data. Click to visit CNEOS sentry page."
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={isDisplayed}
          >
            {!!fetchedData && <Sentry sentryData={fetchedData!.sentryData} />}
          </TitledCell>
        </div>
        <div className={styles.moonPhase}>
          <TitledCell
            title="MOON PHASE"
            tooltip="Click for monthly moon phases view."
            icon={() => <FontAwesomeIcon icon={faMoon} />}
            isDisplayed={isDisplayed}
            onClick={() => setIsMoonPhaseModalShown(true)}
          >
            <MoonPhase setIsMoonPhaseModalShown={setIsMoonPhaseModalShown} />
          </TitledCell>
        </div>
        <div className={styles.programs}>
          <TitledCell
            title="PROJECTS"
            tooltip="Daylight map of world with PDCO project locations."
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
            tooltip="Close Approach is defined as <1LD at smallest nominal distance. Click to visit CNEOS CA page."
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
            headerElement={
              <FilterSortButton
                filterSortData={filterSortDataLast30Days}
                setFilterSortData={setFilterSortDataLast30Days}
              />
            }
          >
            {!!fetchedData && (
              <TableCAD
                period="recent"
                cadData={fetchedData!.cadData}
                dateAtDataFetch={fetchedData!.timestamp}
                isHeightAuto={isMobile}
                filterSortData={filterSortDataLast30Days}
              />
            )}
          </TitledCell>
        </div>
        <div className={styles.futureTab}>
          <TitledCell
            title="CLOSE APPROACHES <1LD NEXT 10 YEARS"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at closest approach. Click to visit CNEOS CA page."
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
            {!!fetchedData && (
              <TableCAD
                period="future"
                cadData={fetchedData!.cadData}
                dateAtDataFetch={fetchedData!.timestamp}
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
            tooltip="Close Approaches with H <24 in size passing within 19LD. Click to visit CNEOS CA page."
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
            {!!fetchedData && (
              <TableCAD
                period="future"
                cadData={fetchedData!.largeDistantCadData}
                dateAtDataFetch={fetchedData!.timestamp}
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
