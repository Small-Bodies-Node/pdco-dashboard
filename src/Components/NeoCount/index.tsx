import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarWeek, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './styles';
import { TitledCell } from '../TitledCell';
import { mobileWidthPxl, cadFieldIndices } from '../../Utils/constants';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';

import { ICadData } from '../../Models/apiData.model';

interface IProps {
  cadData: ICadData;
}

export const NeoCount = ({ cadData }: IProps) => {
  const [caWeek, setCaWeek] = useState(0);
  const [caMonth, setCaMonth] = useState(0);
  const [caYear, setCaYear] = useState(0);

  useEffect(() => {
    // Function to filter cad events within daysThreshold
    const filterDates = (daysThreshold: number) => (datumArr: (string | null)[]) => {
      const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
      if (!dateIsStringOrNull) return false;
      const dateFromDate = apiDateStringToJsDate(dateIsStringOrNull);
      const dDays = (+new Date() - +dateFromDate) / (24 * 60 * 60 * 1000); // dMillSecs => Days
      return dDays <= daysThreshold;
    };

    // Calc total events within time periods; API has data from 365 days in past
    setCaYear(cadData.data.length);
    setCaMonth(cadData.data.filter(filterDates(30)).length);
    setCaWeek(cadData.data.filter(filterDates(7)).length);
  }, [cadData]);

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.week}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 7 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendarDay} />}
            alignment="center"
            isDisplayed={!!caWeek}
          >
            <div className={classes.count}>{caWeek}</div>
          </TitledCell>
        </div>
        <div className={classes.month}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 30 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendarWeek} />}
            alignment="center"
            isDisplayed={!!caMonth}
          >
            <div className={classes.count}>{caMonth}</div>
          </TitledCell>
        </div>
        <div className={classes.year}>
          <TitledCell
            title={`${window.outerWidth < mobileWidthPxl ? '<' : 'LAST'} 365 DAYS`}
            icon={() => <FontAwesomeIcon icon={faCalendar} />}
            alignment="center"
            isDisplayed={!!caYear}
          >
            <div className={classes.count}>{caYear}</div>
          </TitledCell>
        </div>
      </div>
    </>
  );
};
