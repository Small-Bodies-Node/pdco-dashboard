import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    // backgroundSize: 'auto 80%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
}));
