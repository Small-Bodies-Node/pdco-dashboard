import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100%',
      height: '100%',
      padding: 10,
      paddingTop: 0,
      paddingBottom: 0,
      overflow: 'hidden'
    },
    root: {
      width: '100%'
    },
    tableContainer: {
      // maxHeight: 240
      maxHeight: '80%'
    }
  }),
  { name: 'table-cad' }
);
