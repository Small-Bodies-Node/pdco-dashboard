import React, { useState, useEffect } from 'react';

import { useStyles } from './styles';

enum EMoonPhaseTypes {
  New = 'New',
  WaningCrescent = 'Waning Crescent',
  ThirdQuarter = 'Third Quarter',
  WaningGibbous = 'Waning Gibbous',
  Full = 'Full',
  WaxingGibbous = 'Waxing Gibbous',
  FirstQuarter = 'First Quarter',
  WaxingCrescent = 'Waxing Crescent'
}

export const MoonPhase = () => {
  const classes = useStyles();

  const [moonCyclePercent, setMoonCyclePercent] = useState(0);
  const [moonPhase, setMoonPhase] = useState('');

  // Use calculations from https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
  useEffect(() => {
    // Get JD
    const date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const url = `https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&COMMAND='301'&MAKE_EPHEM='YES'&TABLE_TYPE='OBSERVER'&START_TIME='${year}-${month}-${day}'&STOP_TIME='${year}-${month}-${
      day + 1
    }'&STEP_SIZE='1%20h'&QUANTITIES='10'`;

    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        // Get and clean data between markers
        const dataLines = data
          .substring(data.indexOf('$$SOE') + 1, data.indexOf('$$EOE'))
          .split(/\r?\n/);
        dataLines.shift();
        dataLines.pop();

        let waningOrWaxing: 'Waning' | 'Waxing' = 'Waning';

        let todayIllumination = 0;
        const moonResultRows = dataLines.map((item) => {
          const dataArray = item.split(/\s+/);

          // If illumination value is greater than currently stored value, update it
          if (parseFloat(dataArray[3]) > todayIllumination) {
            todayIllumination = parseFloat(dataArray[3]);
          }

          return dataArray;
        });

        // If illumination percent is increasing, set to waxing
        if (
          parseFloat(moonResultRows[moonResultRows.length - 1][3]) >
          parseFloat(moonResultRows[0][3])
        ) {
          waningOrWaxing = 'Waxing';
        }

        return {
          illuminated: todayIllumination / 100.0,
          waningOrWaxing: waningOrWaxing
        };
      })
      .then((result) => {
        const illuminated = result.illuminated;

        let moonPhaseType;

        // Set moonPhaseType depending on illumination and waxing/waning
        if (illuminated < 0.02) {
          moonPhaseType = EMoonPhaseTypes.New;
        } else if (illuminated < 0.48) {
          moonPhaseType =
            result.waningOrWaxing === 'Waxing'
              ? EMoonPhaseTypes.WaxingCrescent
              : EMoonPhaseTypes.WaningCrescent;
        } else if (illuminated < 0.52) {
          moonPhaseType =
            result.waningOrWaxing === 'Waxing'
              ? EMoonPhaseTypes.FirstQuarter
              : EMoonPhaseTypes.ThirdQuarter;
        } else if (illuminated < 0.99) {
          moonPhaseType =
            result.waningOrWaxing === 'Waxing'
              ? EMoonPhaseTypes.WaxingGibbous
              : EMoonPhaseTypes.WaningGibbous;
        } else if (illuminated < 1) {
          moonPhaseType = EMoonPhaseTypes.Full;
        } else {
          moonPhaseType = EMoonPhaseTypes.New;
        }

        setMoonCyclePercent(result.illuminated);
        setMoonPhase(moonPhaseType);
      });
  }, []);

  // Generated image path from current moon phase text
  const getMoonImageURL = (): string => {
    const baseImageURL = 'images/moons/';
    return baseImageURL + moonPhase.replaceAll(' ', '') + '.jpg';
  };

  return (
    <div className={classes.container}>
      <img className={classes.moonImage} src={getMoonImageURL()} alt="Moon phase" />

      {<p className={classes.moonPhaseText}>{moonPhase}</p>}

      <p className={classes.moonCycleText}>{`${(moonCyclePercent * 100).toFixed(1)}%`}</p>
    </div>
  );
};
