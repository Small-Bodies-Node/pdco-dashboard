import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100%',
      height: '100%',
      padding: 10,
      overflow: 'hidden'
    },
    root: {
      width: '100%'
    },
    tableContainer: {
      maxHeight: 240
    }
  }),
  { name: 'table-cad' }
);
