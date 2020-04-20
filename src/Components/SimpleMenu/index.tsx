import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      '& ul': {
        margin: 0,
        '& li': {
          display: 'inline-block',
          margin: '0px 10px'
        }
      }
    }
  };
});

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
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};
