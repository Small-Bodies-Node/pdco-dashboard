import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../../Utils/constants';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      // border: `solid 1px ${borderColor}`,
      '& *': {
        cursor: 'pointer'
      },
      '& > div.aux': {
        flex: 1,
        display: 'flex',
        // backgroundColor: 'rgba(0,255,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
      },
      '&:hover': {
        color: 'green',
        // transform: 'scale(2) translate(0%, 0%)',
        zIndex: 5,
        '& div.auy': {
          opacity: 0.5,
          zIndex: 6
        },
        '& div.aux ': {
          textShadow: '1px 1px 1px rgba(0,0,0,1)',
          zIndex: 7
        }
      }
    },
    flagImage: {
      padding: 5,
      boxSizing: 'border-box',
      // backgroundColor: 'red',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      // backgroundSize: 'auto 100%',
      // backgroundSize: 'contain',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2,
      zIndex: 1,
      transition: 'opacity 0.5s'
    },
    //
    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      container: {
        // flexDirection: 'row'
      }
    }
  }),
  { name: 'clock' }
);
