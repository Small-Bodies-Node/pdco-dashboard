import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarWeek, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './styles';
import { TitledCell } from '../TitledCell';
import { mobileWidthPxl, cadFieldIndices, geoDistanceAu } from '../../Utils/constants';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';

import { ICadData } from '../../Models/apiData.model';
import { NeoCountRows } from './NeoCountRows';
import { auToLd } from '../../Utils/conversionFormulae';

interface IProps {
  cadData: ICadData;
  dateAtDataFetch: string;
}

/**
 * Panel to display the number of 'Close Approaches' (CA) in the past week, month, year
 * Also categorize type of CA into the following non-mutually exclusive categories:
 * 'GEO' (geostationary equatorial orbit) is distance 42,164 km
 * '50m' (size estimated from abs mag H)
 * 'All' (non-filtered)
 */
export const NeoCount = ({ cadData, dateAtDataFetch }: IProps) => {
  // ------------------------------------------>>>

  // Set up state variables for our 3x3 grid
  const [caWeekGEO, setCaWeekGEO] = useState(0);
  const [caWeek50m, setCaWeek50m] = useState(0);
  const [caWeekAll, setCaWeekAll] = useState(0);
  const [caMonthGEO, setCaMonthGEO] = useState(0);
  const [caMonth50m, setCaMonth50m] = useState(0);
  const [caMonthAll, setCaMonthAll] = useState(0);
  const [caYearGEO, setCaYearGEO] = useState(0);
  const [caYear50m, setCaYear50m] = useState(0);
  const [caYearAll, setCaYearAll] = useState(0);

  // Update variables when prop changes
  useEffect(() => {
    //---------->>>

    // Function to filter cad events to target time period
    const filterDates = (pastDaysThreshold: number) => (datumArr: (string | null)[]) => {
      const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
      if (!dateIsStringOrNull) return false;
      const dateFromData = apiDateStringToJsDate(dateIsStringOrNull);
      const daysSinceDateFromData =
        (+new Date(dateAtDataFetch) - +dateFromData) / (24 * 60 * 60 * 1000); // dMillSecs => Days
      return 0 <= daysSinceDateFromData && daysSinceDateFromData <= pastDaysThreshold;
    };

    // Function to filter cad events to within GEO (~42K km)
    const filterGEOs = () => (datumArr: (string | null)[]) => {
      const distIsStringOrNull = datumArr[cadFieldIndices.dist];
      if (!distIsStringOrNull) return false;
      const dist = parseFloat(distIsStringOrNull);
      return dist < geoDistanceAu;
    };

    // Function to filter cad events to within GEO (~42K km)
    const filter50ms = () => (datumArr: (string | null)[]) => {
      const sizeIsStringOrNull = datumArr[cadFieldIndices.size];
      if (!sizeIsStringOrNull) return false;
      const size = parseFloat(sizeIsStringOrNull);
      return size > 1 / 20; // is size (km) smaller than 50m?
    };

    const filterDistance = () => (datumArr: (string | null)[]) => {
      return auToLd(parseFloat(datumArr[cadFieldIndices.dist] ?? '0')) < 1;
    };

    // Numbers calc
    const cadDataWeekAll = cadData.data.filter(filterDates(7)).filter(filterDistance());
    const _caWeekGEO = cadDataWeekAll.filter(filterGEOs()).length;
    const _caWeek50m = cadDataWeekAll.filter(filter50ms()).length;
    const _caWeekAll = cadDataWeekAll.length;

    const cadDataMonthAll = cadData.data.filter(filterDates(30)).filter(filterDistance());
    const _caMonthGEO = cadDataMonthAll.filter(filterGEOs()).length;
    const _caMonth50m = cadDataMonthAll.filter(filter50ms()).length;
    const _caMonthAll = cadDataMonthAll.length;

    const cadDataYearAll = cadData.data.filter(filterDates(365)).filter(filterDistance());
    const _caYearGEO = cadDataYearAll.filter(filterGEOs()).length;
    const _caYear50m = cadDataYearAll.filter(filter50ms()).length;
    const _caYearAll = cadDataYearAll.length;

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

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.labels}>
          <TitledCell title={``} alignment="center" isDisplayed={true}>
            <NeoCountRows
              rows={[
                { text: 'All', fontWeight: 'bold' },
                {
                  text: '<GEO',
                  fontWeight: 'bold',
                  tooltip: "Objects with closest approach within 42.6km of Earth's center"
                },
                { text: '>50m', fontWeight: 'bold', tooltip: 'Objects larger than 50m in diameter' }
              ]}
              alignment="center"
            />
          </TitledCell>
        </div>
        <div className={classes.week}>
          <TitledCell
            title={`<7 DAYS`}
            tooltip="Number of close approaches in the last 7 days"
            alignment="center"
            isDisplayed={true}
          >
            <NeoCountRows
              rows={[{ text: '' + caWeekAll }, { text: '' + caWeekGEO }, { text: '' + caWeek50m }]}
            />
          </TitledCell>
        </div>
        <div className={classes.month}>
          <TitledCell
            title={`<30 DAYS`}
            tooltip="Number of close approaches in the last 30 days"
            alignment="center"
            isDisplayed={true}
          >
            <NeoCountRows
              rows={[
                { text: '' + caMonthAll },
                { text: '' + caMonthGEO },
                { text: '' + caMonth50m }
              ]}
            />
          </TitledCell>
        </div>
        <div className={classes.year}>
          <TitledCell
            title={`<365 DAYS`}
            tooltip="Number of close approaches in the last 365 days"
            alignment="center"
            isDisplayed={true}
          >
            <NeoCountRows
              rows={[{ text: '' + caYearAll }, { text: '' + caYearGEO }, { text: '' + caYear50m }]}
            />
          </TitledCell>
        </div>
      </div>
    </>
  );
};
