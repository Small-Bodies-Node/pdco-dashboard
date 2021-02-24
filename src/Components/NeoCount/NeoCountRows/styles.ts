import { makeStyles } from '@material-ui/core';

export const useStyles = (props: { alignment: 'center' | 'flex-end' }) =>
  makeStyles(
    (theme) => ({
      container: {
        width: '100%',
        height: '100%',
        padding: 10
      },
      row: {
        display: 'flex',
        justifyContent: props.alignment,
        alignItems: 'center',
        padding: 5,
        fontWeight: 'bold'
      }
    }),
    { name: 'neo-count-rows' }
  );
