import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMeteor,
  faShieldAlt,
  faTable,
  faGlobeAmericas,
  faRedo,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

// My constants, hooks, etc.
import { ImageCell } from '../ImageCell';
import { MyError } from '../MyError';
import { useStyles } from './styles';
import { Clocks } from '../Clocks';
import { Sentry } from '../Sentry';
import { ProgramsMap } from '../ProgramsMap';
import { NeoCount } from '../NeoCount';
import { TitledCell } from '../TitledCell';
import { TableCAD } from '../TableCAD';
import { ELocalStorageOptions, useLocalStorage } from '../../Hooks/useLocalStorage';
import { formattedTimestamp } from '../../Utils/formattedTime';
import { fetchAllData } from '../../Utils/fetchAllData';
import { IFetchedData } from '../../Models/apiData.model';
import { useInterval } from '../../Hooks/useInterval';
import { useLocation } from 'react-router-dom';
import { useEventListener } from '../../Hooks/useEventListener';
import { mobileWidthPxl } from '../../Utils/constants';
import { MoonPhase } from '../MoonPhase';
import { MoonPhaseModal } from '../MoonPhaseModal/index';

export const MainUI = () => {
  // --------------------->>>

  // State
  const classes = useStyles();
  const [storedData, setStoredData] = useLocalStorage<null | IFetchedData>(
    ELocalStorageOptions.API_DATA,
    null
  );
  const [storedIntervalToRefreshDataSecs, setIntervalToRefreshDataSecs] = useLocalStorage<number>(
    ELocalStorageOptions.CHECK_FOR_DATA_REFRESH_INTERVAL,
    12 * 60 * 60
  );
  const [isSearching, setIsSearching] = useState(!true);
  const [displayDate, setDisplayDate] = useState('');

  const [isMoonPhaseModalShown, setIsMoonPhaseModalShown] = useState(false);

  // Check if mock data is to be used
  const mockQueryParam = new URLSearchParams(useLocation().search);
  const [isMock] = useState(mockQueryParam.get('mock') === 'true');

  // Choose how long to check if the 'date' needs to be refreshed
  const intervalToCheckForDataSecs = isMock ? 10000 : 2;

  // Check for changes in window size
  const [isMobile, setIsMobile] = useState(false);
  const windowResizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth < mobileWidthPxl);
  }, [setIsMobile]);
  useEventListener('resize', windowResizeHandler);
  useEffect(windowResizeHandler, []);

  // Set up regular checks to see if it's time to refresh data
  const checkIfItsTimeForDataUpdate = () => {
    if (!!storedData) {
      const dtSecs = (new Date().getTime() - new Date(storedData.timestamp).getTime()) / 1000;
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
        setDisplayDate(data ? formattedTimestamp(data.timestamp) : '');
      });
    } else {
      setDisplayDate(storedData ? formattedTimestamp(storedData.timestamp) : '');
    }
  }, [isMock, isSearching, setIsSearching]);

  const isDisplayed = !(isSearching || !storedData);

  return (
    <>
      <MoonPhaseModal isShown={isMoonPhaseModalShown} setIsShown={setIsMoonPhaseModalShown} />

      <div className={'main-ui-container ' + classes.container}>
        <div className={classes.imageLeft}>
          <ImageCell link="https://www.nasa.gov/planetarydefense" imageUrl="images/pdco-logo.jpg" />
        </div>
        <div className={classes.imageRight}>
          <ImageCell link="https://www.nasa.gov/planetarydefense" imageUrl="images/nasa-logo.png" />
        </div>
        <div className={classes.title} onClick={() => setIsSearching(true)}>
          <ErrorBoundary fallbackRender={() => <MyError />}>
            <div className="longTitle">
              {'Planetary Defense Coordination Office Status Summary'}
            </div>
            <div className="shortTitle">{'PDCO STATUS'}</div>
            <div className="date">
              <span style={{ paddingRight: 3 }}>{displayDate + ' '}</span>
              <FontAwesomeIcon style={{ fontSize: 10 }} flip="horizontal" icon={faRedo} />
            </div>
          </ErrorBoundary>
        </div>
        <div className={classes.clocks}>
          <ErrorBoundary fallbackRender={() => <MyError />}>
            <Clocks />
          </ErrorBoundary>
        </div>
        <div className={classes.neoCount}>
          <TitledCell
            title="RECENT CLOSE APPROACHES"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at closest approach"
            icon={() => <FontAwesomeIcon icon={faMeteor} />}
            isDisplayed={isDisplayed}
          >
            {!!storedData && (
              <NeoCount cadData={storedData.cadData} dateAtDataFetch={storedData.timestamp} />
            )}
          </TitledCell>
        </div>
        <div className={classes.sentry}>
          <TitledCell
            title="SENTRY STATUS"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Highest ts_max value in latest sentry data"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={isDisplayed}
          >
            {!!storedData && <Sentry sentryData={storedData.sentryData} />}
          </TitledCell>
        </div>
        <div className={classes.moonPhase}>
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
        <div className={classes.programs}>
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
        <div className={classes.recentTab}>
          <TitledCell
            title="CLOSE APPROACHES LAST 7 DAYS"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at smallest nominal distance"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
          >
            {!!storedData && (
              <TableCAD
                period="recent"
                cadData={storedData.cadData}
                dateAtDataFetch={storedData.timestamp}
                isHeightAuto={isMobile}
              />
            )}
          </TitledCell>
        </div>
        <div className={classes.futureTab}>
          <TitledCell
            title="CLOSE APPROACHES NEXT 10 YEARS"
            link="https://cneos.jpl.nasa.gov/ca/"
            tooltip="Close Approach is defined as <1LD at closest approach"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={isDisplayed}
            isHeightAuto={isMobile}
          >
            {!!storedData && (
              <TableCAD
                period="future"
                cadData={storedData.cadData}
                dateAtDataFetch={storedData.timestamp}
                isHeightAuto={isMobile}
              />
            )}
          </TitledCell>
        </div>
      </div>
    </>
  );
};
