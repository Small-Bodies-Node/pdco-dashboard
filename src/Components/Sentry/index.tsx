import React, { useState, useEffect } from 'react';

import { useStyles } from './styles';

const triColors = ['green', 'orange', 'red'];
const triStrokePxl = 10;
const svgBorder = 20;

export const Sentry = () => {
  const classes = useStyles();
  const [score, setScore] = useState<number>(0);
  const [triColorIndex, setTricolorIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newScore = Math.round(Math.random() * 100);
      setScore(newScore);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (score < 33) setTricolorIndex(0);
    else if (score < 66) setTricolorIndex(1);
    else if (score < 100) setTricolorIndex(2);
  }, [score]);

  return (
    <div className={classes.container}>
      <svg
        className={classes.triangleSvg}
        height="100"
        width="100px"
        viewBox={`${-svgBorder} ${-svgBorder} ${100 + 2 * svgBorder} ${100 + 2 * svgBorder}`}
        onClick={() => setTricolorIndex((prev) => (prev + 1) % triColors.length)}
      >
        <g>
          <path
            d="M 50,0 L 0,100 L 100,100 Z"
            fill="white"
            stroke={triColors[triColorIndex]}
            strokeWidth={triStrokePxl}
          />
        </g>
      </svg>
      <div className={classes.score}>{score}</div>
    </div>
  );
};
