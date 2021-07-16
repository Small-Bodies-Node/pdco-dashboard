import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl } from '../../Utils/constants';

//
export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moonPhaseEmoji: {
    fontSize: 24,
    margin: 0
  },
  moonPhaseText: {
    fontSize: 18,
    fontWeight: 600,
    margin: '6px 0 0 0'
  },
  moonCycleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0
  },
  [`@media (max-width: ${mobileWidthPxl}px)`]: {
    moonPhaseText: {
      fontSize: 16
    },
    moonCycleText: {
      fontSize: 14
    }
  }
}));
