import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMoon } from '@fortawesome/free-solid-svg-icons';

import { TitledCell } from '../TitledCell';

import { useStyles } from './styles';
import { MoonPhase } from '../MoonPhase';

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
}
export const MoonPhaseModal = ({ isShown, setIsShown }: IProps) => {
  const classes = useStyles();

  // State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moonPhases, setMoonPhases] = useState<JSX.Element[]>([]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  useEffect(() => {
    const padZero = (num: number) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    };

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedDate);

    const moonPhasesArray: JSX.Element[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const newDate = new Date(
        `${selectedDate.getUTCFullYear()}-${padZero(selectedDate.getUTCMonth() + 1)}-${padZero(i)}`
      );

      moonPhasesArray.push(
        <div className={classes.moonPhaseCell}>
          <p className={classes.moonPhaseCellTitle}>{newDate.getUTCDate()}</p>

          <MoonPhase mobileWidthFull={true} moonDate={newDate} />
        </div>
      );
    }

    setMoonPhases(moonPhasesArray);
  }, [selectedDate]);

  const incrementMonth = () => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);

    setSelectedDate(nextMonth);
  };

  const decrementMonth = () => {
    const previousMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);

    setSelectedDate(previousMonth);
  };

  if (!isShown) {
    return null;
  }

  return (
    <div className={classes.backgroundContainer} onClick={() => setIsShown(false)}>
      <div className={classes.mainContentContainer} onClick={(e) => e.stopPropagation()}>
        <div className={classes.closeButtonContainer}>
          <FontAwesomeIcon
            className={classes.closeButton}
            onClick={() => setIsShown(false)}
            style={{ fontSize: 18 }}
            flip="horizontal"
            icon={faTimes}
          />
        </div>

        <TitledCell
          title="Moon Phases"
          icon={() => <FontAwesomeIcon icon={faMoon} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
          <div className={classes.innerContent}>
            <div className={classes.headerContainer}>
              <div className={classes.previousMonthButton}>
                <button onClick={decrementMonth}>{'<'} Previous Month</button>
              </div>

              <p className={classes.header}>
                {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </p>

              <div className={classes.nextMonthButton}>
                <button onClick={incrementMonth}>Next Month {'>'}</button>
              </div>
            </div>

            <div className={classes.monthGrid}>{moonPhases}</div>
          </div>
        </TitledCell>
      </div>
    </div>
  );
};
