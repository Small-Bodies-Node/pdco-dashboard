import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      minHeight: '95vh',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      padding: 10
    }
  }),
  { name: 'page-about' }
);
