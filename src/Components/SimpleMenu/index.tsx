import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCog } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: 'relative',
      // backgroundColor: 'green',
      '& ul': {
        margin: 0,
        '& li': {
          display: 'inline-block',
          margin: '0px 10px',
          '& a': {
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold'
          }
        }
      },
      '& .settings': {
        position: 'absolute',
        top: '50%',
        bottom: 0,
        right: 50,
        transform: 'translateY(-50%)'
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
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>

      <FontAwesomeIcon className="settings" size="2x" icon={faCog} />
      {/* <div className="settings"> </div> */}
    </div>
  );
};
