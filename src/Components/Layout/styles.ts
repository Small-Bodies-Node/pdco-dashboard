import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => {
    return {
      container: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column'
      }
    };
  },
  { name: 'layout' }
);
