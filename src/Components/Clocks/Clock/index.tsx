import React from 'react';

import { useStyles } from './styles';

interface IProps {
  location: string;
  time: string;
  flagUrl: string;
}

export const Clock = (props: IProps) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div>{props.location}</div>
        <div>{props.time}</div>
        <div
          className={classes.flagImage}
          style={{ backgroundImage: `url(${props.flagUrl})` }}
        ></div>
      </div>
    </>
  );
};
