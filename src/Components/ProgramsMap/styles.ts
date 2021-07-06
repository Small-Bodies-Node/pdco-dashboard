import { makeStyles } from '@material-ui/core';

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

      '& > div > div': {
        margin: '0 60px 0 0'
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
    }
  }),

  { name: 'programs' }
);
