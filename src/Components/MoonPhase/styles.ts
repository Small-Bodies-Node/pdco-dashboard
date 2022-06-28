import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl } from '../../Utils/constants';

//
export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  moonImage: {
    marginBottom: '1rem',
    maxHeight: '60%',

    '& > img': {
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '50%'
    }
  },
  moonPhaseText: {
    fontSize: 18,
    fontWeight: 600,
    margin: '6px 0 0 0',
    textAlign: 'center'
  },
  moonCycleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0
  },
  [`@media (max-width: ${mobileWidthPxl}px)`]: {
    moonImage: {
      width: 100,
      height: 100,
      marginBottom: '0.5rem'
    },
    moonPhaseText: {
      fontSize: 16
    },
    moonCycleText: {
      fontSize: 14
    }
  }
}));
