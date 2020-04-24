import React from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './styles';
import { TitledCell } from '../TitledCell';

export const NeoCount = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.month}>
          <TitledCell
            title="LAST 30 DAYS"
            icon={() => <FontAwesomeIcon icon={faCalendarWeek} />}
            alignment="center"
          >
            <div className={classes.count}>10</div>
          </TitledCell>
        </div>
        <div className={classes.year}>
          <TitledCell
            title="LAST 365 DAYS"
            icon={() => <FontAwesomeIcon icon={faCalendar} />}
            alignment="center"
          >
            <div className={classes.count}>999</div>
          </TitledCell>
        </div>
      </div>
    </>
  );
};
