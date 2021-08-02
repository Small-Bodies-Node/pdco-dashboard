import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl } from '../../Utils/constants';

//
export const useStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    mapWrapper: {
      position: 'absolute',
      backgroundColor: 'green',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    dialogContainer: {
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: 300,
      //overflow: 'hidden',
      // Make height = width / 2
      '&::before': {
        display: 'block',
        paddingTop: '50%',
        content: '" "',
        padding: 10
      }
    },
    dialogMapWrapper: {
      position: 'absolute',
      backgroundColor: 'green',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transition: 'ease-in-out 0.2s',

      '& > div > div': {
        margin: '0 60px 0 60px'
      }
    },
    menuContainer: {
      position: 'absolute',
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
      zIndex: 10,

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

      margin: '0 1rem 1.5rem 1rem',

      '& p, a': {
        color: 'white',
        textDecoration: 'none',

        margin: 0
      },
      '& a': {
        textDecoration: 'underline',
        wordBreak: 'break-all',
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    menuButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
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
    overlay: {
      position: 'absolute',
      // backgroundColor: 'blue',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    example: {
      color: 'red'
    },
    imagePlaceholder: {
      position: 'absolute',
      backgroundColor: 'blue',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundImage: 'url(images/world-placeholder.png)',
      backgroundSize: 'cover',
      // backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      dialogMapWrapper: {
        '& > div > div': {
          margin: '0'
        }
      },
      menuButton: {
        display: 'none'
      },
      closeButton: {
        display: 'none'
      }
    }
  }),

  { name: 'programs' }
);
