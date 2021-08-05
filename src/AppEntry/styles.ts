import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  { name: 'app-entry' }
);
