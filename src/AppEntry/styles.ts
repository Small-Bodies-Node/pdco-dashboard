import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  { name: 'app-entry' }
);
