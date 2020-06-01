import React, { useState, useEffect } from 'react';

import { useStyles } from './styles';

const triStrokePxl = 10;
const svgBorder = 20;

export const Sentry = () => {
  const classes = useStyles();
  const [score, setScore] = useState<number>(0);
  const [triColor, setTriColor] = useState<'grey' | 'green' | 'yellow' | 'orange' | 'red'>('grey');

  useEffect(() => {
    // Call the built-in function to make http requests from browser; this returns a promise
    fetch('https://ssd-api.jpl.nasa.gov/sentry.api')
      // Call 'then' method on returned promise; this accepts a function that acts on the future thing that gets returned; in this case, the thing that will get returned in the future is an http-response object
      .then((response) => {
        // The response object has a method that returns a promised json object; don't ask me why it has to be a promise
        return response.json();
      })
      .then((thePromisedJsonObject) => {
        // isolate the data within the returned JSON object
        const data: any[] = thePromisedJsonObject.data;

        // Filter out those objects that contain ts_max values that aren't a string
        // TODO: figure out a more robust test of the fitness of such objects
        const tsMaxValues = data
          .filter((el: any, ind: number) => {
            return typeof el.ts_max === 'string';
          })
          // Now map the filtered objects within the array of objects to an array of ts_max values (converted from strings to numbers)
          .map((el: any) => parseInt(el.ts_max, 10));

        // Now find the hishest numeric value within the array
        const highestTsMaxValues = Math.max.apply(null, tsMaxValues);

        // Set our stateful variable to the highest-computed ts_max value
        setScore(highestTsMaxValues);
      });
  }, []);

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
