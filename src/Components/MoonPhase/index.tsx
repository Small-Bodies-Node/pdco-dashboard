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

  const [moonCycle, setMoonCycle] = useState(0);
  const [moonPhase, setMoonPhase] = useState('');
  const [moonPhaseEmoji, setMoonPhaseEmoji] = useState('');

  // Use calculations from https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
  useEffect(() => {
    // Get JD
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = Math.floor(365.25 * (year + 4716));
    const f = Math.floor(30.6001 * (month + 1));

    const JD = c + day + e + f - 1524.5;
    const daysSinceNew = JD - 2451549.5;

    const newMoons = daysSinceNew / 29.53;

    let moonCycle = (newMoons % 1) * 29.53;

    let moonPhaseType: EMoonPhaseTypes;
    let moonPhaseEmoji: string = '';
    moonCycle = parseFloat(moonCycle.toFixed(2));
    console.log('cycle: ', moonCycle);

    if (moonCycle < 0.5) {
      moonPhaseType = EMoonPhaseTypes.New;
      moonPhaseEmoji = '🌑';
    } else if (moonCycle < 7) {
      moonPhaseType = EMoonPhaseTypes.WaningCrescent;
      moonPhaseEmoji = '🌘';
    } else if (moonCycle < 11) {
      moonPhaseType = EMoonPhaseTypes.FirstQuarter;
      moonPhaseEmoji = '🌗';
    } else if (moonCycle < 14.5) {
      moonPhaseType = EMoonPhaseTypes.WaningGibbous;
      moonPhaseEmoji = '🌖';
    } else if (moonCycle < 15.5) {
      moonPhaseType = EMoonPhaseTypes.Full;
      moonPhaseEmoji = '🌕';
    } else if (moonCycle < 22) {
      moonPhaseType = EMoonPhaseTypes.WaxingGibbous;
      moonPhaseEmoji = '🌔';
    } else if (moonCycle < 25.75) {
      moonPhaseType = EMoonPhaseTypes.ThirdQuarter;
      moonPhaseEmoji = '🌓';
    } else if (moonCycle < 29) {
      moonPhaseType = EMoonPhaseTypes.WaxingCrescent;
      moonPhaseEmoji = '🌒';
    } else {
      moonPhaseType = EMoonPhaseTypes.New;
      moonPhaseEmoji = '🌑';
    }

    setMoonCycle(moonCycle);
    setMoonPhase(moonPhaseType);
    setMoonPhaseEmoji(moonPhaseEmoji);
  }, [moonPhase]);

  return (
    <div className={classes.container}>
      <p className={classes.moonPhaseEmoji}>{moonPhaseEmoji}</p>

      <p className={classes.moonPhaseText}>{moonPhase}</p>

      <p className={classes.moonCycleText}>{`${(
        ((parseInt(moonCycle.toFixed(2)) <= 14.75 ? moonCycle : 29.5 - moonCycle) / 14.75) *
        100
      ).toFixed(1)}%`}</p>
    </div>
  );
};
