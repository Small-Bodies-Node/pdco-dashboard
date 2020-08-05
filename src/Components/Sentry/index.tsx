import React, { useState, useEffect } from 'react';

import { useStyles } from './styles';
import { ISentryData } from '../../Models/data';

const triStrokePxl = 10;
const svgBorder = 20;

interface IProps {
  sentryData: ISentryData;
}

export const Sentry = ({ sentryData }: IProps) => {
  const classes = useStyles();
  const [score, setScore] = useState<number>(0);
  const [triColor, setTriColor] = useState<'grey' | 'green' | 'yellow' | 'orange' | 'red'>('grey');

  useEffect(() => {
    // Filter out those objects that contain ts_max values that aren't a string
    // TODO: figure out a more robust test of the fitness of such objects
    const tsMaxValues = sentryData.data
      .filter((datum: any, ind: number) => {
        return typeof datum.ts_max === 'string';
      })
      // Now map the filtered objects within the array of objects to an array of ts_max values (converted from strings to numbers)
      .map((datum: any) => parseInt(datum.ts_max, 10));

    // Now find the highest numeric value within the array
    const highestTsMaxValues = Math.max.apply(null, tsMaxValues);

    // Set our stateful variable to the highest-computed ts_max value
    setScore(highestTsMaxValues);
  }, [sentryData]);

  useEffect(() => {
    if (score === 0) setTriColor('grey');
    if (score === 1) setTriColor('green');
    if (score >= 2 && score <= 4) setTriColor('yellow');
    if (score >= 5 && score <= 7) setTriColor('orange');
    if (score >= 8) setTriColor('red');
  }, [score]);

  return (
    <div className={classes.container}>
      <svg
        className={classes.triangleSvg}
        height="100"
        width="100px"
        viewBox={`${-svgBorder} ${-svgBorder} ${100 + 2 * svgBorder} ${100 + 2 * svgBorder}`}
      >
        <g>
          <path
            d="M 50,0 L 0,100 L 100,100 Z"
            fill="white"
            stroke={triColor}
            strokeWidth={triStrokePxl}
          />
        </g>
      </svg>
      <div className={classes.score}>{score}</div>
    </div>
  );
};
