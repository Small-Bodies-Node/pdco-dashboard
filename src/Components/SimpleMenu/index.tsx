import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      '& ul': {
        margin: 0,
        '& li': {
          color: 'white',
          display: 'inline-block',
          margin: '0px 10px'
        }
      }
    }
  };
});

/**
 * This is a simple menu to demo how to work a react router
 */
export const SimpleMenu = () => {
  const classes = useStyles();
  return (
    <div className={'simple-menu-container ' + classes['container']}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};
