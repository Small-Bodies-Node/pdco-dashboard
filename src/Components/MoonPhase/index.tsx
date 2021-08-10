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

interface IProps {
  mobileWidthFull?: boolean;
  moonDate?: Date;
}

export const MoonPhase = ({ mobileWidthFull, moonDate }: IProps) => {
  const classes = useStyles();

  const [moonCyclePercent, setMoonCyclePercent] = useState(0);
  const [moonPhase, setMoonPhase] = useState('');

  // Use calculations from https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
  // Moon cycle length from http://www.agopax.it/Libri_astronomia/pdf/Astronomical%20Algorithms.pdf
  const getMoonPhase = (
    date: Date
  ): { illuminationFraction: number; cycleProgress: number; moonPhase: string } => {
    const moonCycleLength = 29.530588861;

    // Define date components variables
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    // Define variables to be used in calculation
    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = 365.25 * (year + 4716);
    const f = 30.6001 * (month + 1);
    const JD = c + day + e + f - 1524.5;

    const daysSinceNewMoon = JD - 2451549.5;
    const numberNewMoons = daysSinceNewMoon / moonCycleLength;
    const currentMoonCycleFraction = numberNewMoons % 1;

    let illuminationFraction;
    if (currentMoonCycleFraction <= 0.5) {
      illuminationFraction = currentMoonCycleFraction / 0.5;
    } else {
      illuminationFraction = (1 - currentMoonCycleFraction) / 0.5;
    }

    // Calculate moon phase based on progress in lunar cycle
    let moonPhase: string;
    if (currentMoonCycleFraction <= 0.03) {
      moonPhase = EMoonPhaseTypes.New;
    } else if (currentMoonCycleFraction <= 0.3) {
      moonPhase = EMoonPhaseTypes.WaxingCrescent;
    } else if (currentMoonCycleFraction <= 0.36) {
      moonPhase = EMoonPhaseTypes.FirstQuarter;
    } else if (currentMoonCycleFraction <= 0.48) {
      moonPhase = EMoonPhaseTypes.WaxingGibbous;
    } else if (currentMoonCycleFraction <= 0.52) {
      moonPhase = EMoonPhaseTypes.Full;
    } else if (currentMoonCycleFraction <= 0.79) {
      moonPhase = EMoonPhaseTypes.WaningGibbous;
    } else if (currentMoonCycleFraction <= 0.85) {
      moonPhase = EMoonPhaseTypes.ThirdQuarter;
    } else if (currentMoonCycleFraction <= 0.97) {
      moonPhase = EMoonPhaseTypes.WaningCrescent;
    } else {
      moonPhase = EMoonPhaseTypes.New;
    }

    return {
      illuminationFraction,
      cycleProgress: currentMoonCycleFraction,
      moonPhase
    };
  };

  useEffect(() => {
    const date = moonDate ?? new Date();
    const moonPhaseData = getMoonPhase(date);

    setMoonCyclePercent(moonPhaseData.illuminationFraction);
    setMoonPhase(moonPhaseData.moonPhase);
  }, [moonDate]);

  // Generated image path from current moon phase text
  const getMoonImageURL = (): string => {
    const baseImageURL = 'images/moons/';
    return baseImageURL + moonPhase.replaceAll(' ', '') + '.jpg';
  };

  return (
    <div className={classes.container}>
      <div className={classes.moonImage}>
        <img
          src={getMoonImageURL()}
          alt="Moon phase"
          style={mobileWidthFull ? { width: '100%', height: 'unset' } : undefined}
        />
      </div>

      <p className={classes.moonPhaseText}>{moonPhase}</p>

      <p className={classes.moonCycleText}>{`${(moonCyclePercent * 100).toFixed(0)}%`}</p>
    </div>
  );
};
