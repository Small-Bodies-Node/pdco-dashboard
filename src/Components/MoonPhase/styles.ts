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
    width: '60%',
    borderRadius: '50%',
    marginBottom: '1rem'
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
      width: 'auto',
      height: '50%',
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
