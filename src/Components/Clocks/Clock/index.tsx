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
        <div className="xxx">{props.location}</div>
        <div className="xxx">{props.time}</div>
        <div
          className={classes.flagImage + ' yyy'}
          style={{ backgroundImage: `url(${props.flagUrl})` }}
        />
      </div>
    </>
  );
};
