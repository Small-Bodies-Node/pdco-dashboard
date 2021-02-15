import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100%',
      height: '100%',
      padding: 10
    },
    row: {
      padding: 5,
      fontWeight: 'bold'
      // backgroundColor: 'green'
    }
  }),
  { name: 'neo-count-rows' }
);
