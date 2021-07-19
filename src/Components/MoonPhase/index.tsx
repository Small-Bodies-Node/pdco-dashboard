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
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

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

    const progress = moonCycle / 29.53;
    console.log('progress: ' + moonCycle / 29.53);

    console.log(`test: ${0.5 - 0.5 * Math.cos((2 * Math.PI * moonCycle) / 29.53)}`);

    if (progress < 0.05) {
      moonPhaseType = EMoonPhaseTypes.New;
      moonPhaseEmoji = '🌑';
    } else if (progress < 0.25) {
      moonPhaseType = EMoonPhaseTypes.WaxingCrescent;
      moonPhaseEmoji = '🌘';
    } else if (progress === 0.25) {
      moonPhaseType = EMoonPhaseTypes.FirstQuarter;
      moonPhaseEmoji = '🌗';
    } else if (progress < 0.5) {
      moonPhaseType = EMoonPhaseTypes.WaxingGibbous;
      moonPhaseEmoji = '🌖';
    } else if (progress === 0.5) {
      moonPhaseType = EMoonPhaseTypes.Full;
      moonPhaseEmoji = '🌕';
    } else if (progress < 0.75) {
      moonPhaseType = EMoonPhaseTypes.WaningGibbous;
      moonPhaseEmoji = '🌔';
    } else if (progress === 0.75) {
      moonPhaseType = EMoonPhaseTypes.ThirdQuarter;
      moonPhaseEmoji = '🌓';
    } else if (progress < 1) {
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
        ((parseInt(moonCycle.toFixed(2)) <= 14.75 ? moonCycle : 29.53 - moonCycle) / 14.75) *
        100
      ).toFixed(1)}%`}</p>
    </div>
  );
};
