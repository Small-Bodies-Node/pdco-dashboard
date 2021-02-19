import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarWeek, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './styles';
import { TitledCell } from '../TitledCell';
import { mobileWidthPxl, cadFieldIndices } from '../../Utils/constants';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';

import { ICadData } from '../../Models/apiData.model';
import { NeoCountRows } from './NeoCountRows';

interface IProps {
  cadData: ICadData;
}

/**
 * Panel to display the number of 'Close Approaches' (CA) in the past week, month, year
 * Also categorize type of CA into the following non-mutually exclusive categories:
 * 'GEO' (geostationary equatorial orbit) is distance 42,164 km
 * '50m' (size estimated from abs mag H)
 * 'All' (non-filtered)
 */
export const NeoCount = ({ cadData }: IProps) => {
  const [caWeekGEO, setCaWeekGEO] = useState(0);
  const [caWeek50m, setCaWeek50m] = useState(0);
  const [caWeekAll, setCaWeekAll] = useState(0);
  const [caMonthGEO, setCaMonthGEO] = useState(0);
  const [caMonth50m, setCaMonth50m] = useState(0);
  const [caMonthAll, setCaMonthAll] = useState(0);
  const [caYearGEO, setCaYearGEO] = useState(0);
  const [caYear50m, setCaYear50m] = useState(0);
  const [caYearAll, setCaYearAll] = useState(0);

  useEffect(() => {
    // --------->>>

    // Function to filter cad events to target time period
    const filterDates = (daysThreshold: number) => (datumArr: (string | null)[]) => {
      const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
      if (!dateIsStringOrNull) return false;
      const dateFromData = apiDateStringToJsDate(dateIsStringOrNull);
      const daysSinceDateFromData = (+new Date() - +dateFromData) / (24 * 60 * 60 * 1000); // dMillSecs => Days
      // 0 < days since event < threshold
      return 0 <= daysSinceDateFromData && daysSinceDateFromData <= daysThreshold;
    };

    // Function to filter cad events to within GEO (~42K km)
    const filterGEOs = () => (datumArr: (string | null)[]) => {
      const dateIsStringOrNull = datumArr[cadFieldIndices.dist];
      // console.log('>>>> ', dateIsStringOrNull);
      return true;
    };

    // Function to filter cad events to within GEO (~42K km)
    const filter50ms = () => (datumArr: (string | null)[]) => {
      const sizeIsStringOrNull = datumArr[cadFieldIndices.size];
      if (!sizeIsStringOrNull) return false;
      return true;
    };

    // Numbers calc
    const sizeGEO = 999;
    const size50m = 99;

    const _caWeekGEO = cadData.data.filter(filter50ms()).filter(filterDates(7)).length;
    const _caWeek50m = cadData.data.filter(filter50ms()).filter(filterDates(7)).length;
    const _caWeekAll = cadData.data.filter(filter50ms()).filter(filterDates(7)).length;
    const _caMonthGEO = cadData.data.filter(filter50ms()).filter(filterDates(30)).length;
    const _caMonth50m = cadData.data.filter(filter50ms()).filter(filterDates(30)).length;
    const _caMonthAll = cadData.data.filter(filter50ms()).filter(filterDates(30)).length;
    const _caYearGEO = cadData.data.filter(filter50ms()).filter(filterDates(365)).length;
    const _caYear50m = cadData.data.filter(filter50ms()).filter(filterDates(365)).length;
    const _caYearAll = cadData.data.filter(filter50ms()).filter(filterDates(365)).length;

    console.log('Debug: ', _caMonth50m, _caMonthGEO);

    // Calc total events within time periods; API has data from 365 days in past
    setCaWeekGEO(_caWeekGEO);
    setCaMonthGEO(_caMonthGEO);
    setCaYearGEO(_caYearGEO);
    setCaWeek50m(_caWeek50m);
    setCaMonth50m(_caMonth50m);
    setCaYear50m(_caYear50m);
    setCaWeekAll(_caWeekAll);
    setCaMonthAll(_caMonthAll);
    setCaYearAll(_caYearAll);
  }, [cadData]);

  console.log('Debug: ', caMonth50m, caMonthGEO, caMonthAll);

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.labels}>
          <TitledCell title={``} alignment="center" isDisplayed={!!caWeekAll}>
            <NeoCountRows labels={['+All', '+<GEO', '+>50m']} />
          </TitledCell>
        </div>
        <div className={classes.week}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 7 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendarDay} />}
            alignment="center"
            isDisplayed={!!caWeekAll}
          >
            <NeoCountRows labels={['+' + caWeekAll, '' + caWeekGEO, '' + caWeek50m]} />
          </TitledCell>
        </div>
        <div className={classes.month}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 30 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendarWeek} />}
            alignment="center"
            isDisplayed={!!caMonthAll}
          >
            <NeoCountRows labels={['+' + caMonthAll, '' + caMonthGEO, '' + caMonth50m]} />
          </TitledCell>
        </div>
        <div className={classes.year}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 365 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendar} />}
            alignment="center"
            isDisplayed={!!caYearAll}
          >
            <NeoCountRows labels={['+' + caYearAll, '' + caYearGEO, '' + caYear50m]} />
          </TitledCell>
        </div>
      </div>
    </>
  );
};
