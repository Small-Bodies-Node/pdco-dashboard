import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl } from '../../Utils/constants';

//
export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  menuButton: {
    position: 'absolute',
    padding: 10,

    zIndex: 10,

    fontSize: '1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    cursor: 'pointer',

    color: 'rgba(255, 255, 255, 0.7)'
  },
  menuOuterContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 10,
    transition: 'ease-in-out 0.2s'
  },
  menuContainer: {
    position: 'fixed',
    left: 0,
    top: 0,

    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',

    width: '25%',
    minWidth: '250px',
    maxWidth: '300px',
    height: '100%',

    background: '#181b2e',
    zIndex: 11,

    transition: 'ease-in-out 0.12s'
  },
  menuHeader: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 1rem 0',

    '& p': {
      fontSize: '1.5rem',
      fontWeight: 600,
      margin: '1rem'
    }
  },
  menuRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    margin: '0 1rem 1rem 1rem',

    '& a': {
      fontSize: '1.25rem',
      margin: 0,
      textDecoration: 'none',
      color: 'white',
      borderBottom: 'solid 1px transparent',
      transition: 'ease-in-out 0.2s'
    },
    '& a:hover': {
      borderBottom: 'solid 1px white'
    }
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    border: 'solid 1px rgba(255, 255, 255, 0.1)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    transition: 'background-color 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)'
    }
  },
  [`@media (max-width: ${mobileWidthPxl}px)`]: {
    container: {
      left: 20
    }
  }
}));
