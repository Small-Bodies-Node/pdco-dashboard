import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMeteor,
  faShieldAlt,
  faTable,
  faGlobeAmericas,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

import { ImageCell } from '../ImageCell';
import { useStyles } from './styles';
import { Clocks } from '../Clocks';
import { Sentry } from '../Sentry';
import { ProgramsMap } from '../ProgramsMap';
import { NeoCount } from '../NeoCount';
import { TitledCell } from '../TitledCell';
import { TableCAD } from '../TableCAD';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { formattedTimestamp } from '../../Utils/formattedTime';
import { IFetchedData, fetchAllData } from '../../Utils/fetchAllData';

export const MainUI = () => {
  const classes = useStyles();
  const [storedData, setStoredData] = useLocalStorage<null | IFetchedData>('APIDATA', null);
  const [isSearching, setIsSearching] = useState(true);
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    // Ensure localStorage has been initialized with the api data
    if (!storedData || isSearching) {
      console.log('Fetching data');
      fetchAllData().then((data) => {
        if (!!data) setStoredData(data);
        setIsSearching(false);
      });
    } else {
      setDisplayDate(storedData ? formattedTimestamp(storedData.timestamp) : '');
    }
  }, [storedData, setStoredData, isSearching, setIsSearching]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.imageLeft}>
          <ImageCell imageUrl="images/pdco-logo.jpg" />
        </div>
        <div className={classes.imageRight}>
          <ImageCell imageUrl="images/nasa-logo.png" />
        </div>
        <div className={classes.title} onClick={() => setIsSearching(true)}>
          <div className="longTitle">{'PDCO STATUS SUMMARY'}</div>
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
            {!!storedData && <NeoCount cadData={storedData.cadData1LD} />}
          </TitledCell>
        </div>
        <div className={classes.sentry}>
          <TitledCell
            title={() => <a href="https://cneos.jpl.nasa.gov/sentry/">{'SENTRY STATUS'}</a>}
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <Sentry sentryData={storedData.sentryData} />}
          </TitledCell>
        </div>
        <div className={classes.programs}>
          <TitledCell
            title="PROGRAMS"
            icon={() => <FontAwesomeIcon icon={faGlobeAmericas} />}
            isDisplayed={!isSearching}
          >
            <ProgramsMap />
          </TitledCell>
        </div>
        <div className={classes.recentTab}>
          <TitledCell
            title="RECENT TABLE"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <TableCAD period="recent" cadData={storedData.cadData0p05AU} />}
          </TitledCell>
        </div>
        <div className={classes.futureTab}>
          <TitledCell
            title="FUTURE TABLE"
            icon={() => <FontAwesomeIcon icon={faTable} />}
            isDisplayed={!isSearching}
          >
            {!!storedData && <TableCAD period="future" cadData={storedData.cadData0p05AU} />}
          </TitledCell>
        </div>
      </div>
    </>
  );
};
