import React, { useState } from 'react';
import { useStyles } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/**
 * This is a simple menu to demo how to work a react router
 */
export const SidebarMenu = () => {
  const classes = useStyles();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.menuButton} onClick={() => setIsMenuOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div
        className={classes.menuOuterContainer}
        style={{
          background: `${isMenuOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}`,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={classes.menuContainer}
        style={{
          left: `${isMenuOpen ? 0 : -300}px`
        }}
      >
        <div className={classes.menuHeader}>
          <p>Menu</p>

          <div className={classes.closeButton} onClick={() => setIsMenuOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className={classes.menuRow}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </div>

        <div className={classes.menuRow}>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </div>
      </div>
    </div>
  );
};
