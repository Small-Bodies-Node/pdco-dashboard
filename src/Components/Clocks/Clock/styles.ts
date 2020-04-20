import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../../Utils/constants';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: `solid 1px ${borderColor}`,
      '& > div': {
        flex: 1,
        display: 'flex',
        // backgroundColor: 'rgba(0,255,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    flagImage: {
      padding: 5,
      bozSizing: 'border-box',
      // backgroundColor: 'red',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 50%'
      // backgroundSize: 'auto 100%',
      // backgroundSize: 'contain'
    },
    //
    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      container: {
        flexDirection: 'row'
      }
    }
  }),
  { name: 'clock' }
);
