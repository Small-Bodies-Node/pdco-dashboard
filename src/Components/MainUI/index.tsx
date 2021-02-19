import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMeteor,
  faShieldAlt,
  faTable,
  faGlobeAmericas,
  faRedo,
  faCog
} from '@fortawesome/free-solid-svg-icons';

// My constants, hooks, etc.
import { ImageCell } from '../ImageCell';
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
import { intervalToCheckForDataSecs } from '../../Utils/constants';

export const MainUI = () => {
  // --------------------->>>

  //
  // Set up state
  //
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

  //
  // Set up regular checks to see if it's time to refresh data
  //
  const checkIfItsTimeForDataUpdate = () => {
    if (!!storedData) {
      const dtSecs = (new Date().getTime() - new Date(storedData.timestamp).getTime()) / 1000;
      if (dtSecs > storedIntervalToRefreshDataSecs) {
        setIsSearching(true);
      }
    }
  };
  useInterval(checkIfItsTimeForDataUpdate, intervalToCheckForDataSecs * 1000);

  //
  // Re-fetch data whenever there is no data in localStorage, or when search is initiated
  //
  useEffect(() => {
    if (!storedData || isSearching) {
      console.log(`Fetching ${process.env.NODE_ENV === 'development' ? '(Mock)' : ''} data`);
      fetchAllData().then((data) => {
        if (!!data) setStoredData(data);
        setIsSearching(false);
      });
    } else {
      setDisplayDate(storedData ? formattedTimestamp(storedData.timestamp) : '');
    }
  }, [isSearching, setIsSearching]);

  return (
    <>
      <div className={classes.container}>
        {/*         <FontAwesomeIcon
          style={{
            position: 'fixed',
            bottom: 30,
            left: 30
          }}
          className="settings"
          size="2x"
          icon={faCog}
        /> */}

        <div className={classes.imageLeft}>
          <ImageCell link="https://www.nasa.gov/planetarydefense" imageUrl="images/pdco-logo.jpg" />
        </div>
        <div className={classes.imageRight}>
          <ImageCell link="https://www.nasa.gov/planetarydefense" imageUrl="images/nasa-logo.png" />
        </div>
        <div className={classes.title} onClick={() => setIsSearching(true)}>
          <div className="longTitle">{'Planetary Defense Coordination Office Status Summary'}</div>
          <div className="shortTitle">{'PDCO STATUS'}</div>
          <div className="date">
            <span style={{ paddingRight: 3 }}>{displayDate + ' '}</span>
            <FontAwesomeIcon style={{ fontSize: 10 }} flip="horizontal" icon={faRedo} />
          </div>
        </div>
        <div className={classes.clocks}>
          <Clocks />
        </div>
        <div className={classes.neoCount}>
          <TitledCell
            title="CLOSE APPROACHES <1LD"
            icon={() => <FontAwesomeIcon icon={faMeteor} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <NeoCount cadData={storedData.cadData} />}
          </TitledCell>
        </div>
        <div className={classes.sentry}>
          <TitledCell
            title={() => (
              <a target="_blank" href="https://cneos.jpl.nasa.gov/sentry/">
                {'SENTRY STATUS'}
              </a>
            )}
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <Sentry sentryData={storedData.sentryData} />}
          </TitledCell>
        </div>
        <div className={classes.programs}>
          <TitledCell
            title="PROJECTS"
            icon={() => <FontAwesomeIcon icon={faGlobeAmericas} />}
            isDisplayed={!isSearching}
          >
            <ProgramsMap />
          </TitledCell>
        </div>
        <div className={classes.recentTab}>
          <TitledCell
            title="CLOSE APPROACHES LAST 7 DAYS"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <TableCAD period="recent" cadData={storedData.cadData} />}
          </TitledCell>
        </div>
        <div className={classes.futureTab}>
          <TitledCell
            title="CLOSE APPROACHES NEXT 10 YEARS"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <TableCAD period="future" cadData={storedData.cadData} />}
          </TitledCell>
        </div>
      </div>
    </>
  );
};
