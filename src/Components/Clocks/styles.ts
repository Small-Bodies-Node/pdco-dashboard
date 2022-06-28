import { makeStyles } from '@material-ui/core';

import { mobileWidthPxl } from '../../Utils/constants';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100%',
      height: '100%',
      padding: 0,
      flex: 1,
      display: 'grid',
      gridGap: 5,
      gridTemplateRows: `repeat(1,minmax(0px,1fr))`,
      gridTemplateColumns: `repeat(8,minmax(0px,1fr))`,
      gridTemplateAreas: `'clock1 clock2 clock3 clock4 clock5 clock6 clock7 clock8'`,
      '& > div': {
        // border: 'solid 1px red',
        display: 'flex',
        // backgroundColor: 'rgba(0,255,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    clock1: {
      gridArea: 'clock1'
      // backgroundColor: 'green'
    },
    clock2: {
      gridArea: 'clock2'
      // backgroundColor: 'green'
    },
    clock3: {
      gridArea: 'clock3'
      // backgroundColor: 'green'
    },
    clock4: {
      gridArea: 'clock4'
      // backgroundColor: 'green'
    },
    clock5: {
      gridArea: 'clock5'
      // backgroundColor: 'green'
    },
    clock6: {
      gridArea: 'clock6'
      // backgroundColor: 'green'
    },
    clock7: {
      gridArea: 'clock7'
      // backgroundColor: 'green'
    },
    clock8: {
      gridArea: 'clock8'
      // backgroundColor: 'green'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      container: {
        gridTemplateRows: `repeat(2,minmax(0px,1fr))`,
        // gridTemplateColumns: `minmax(0px,1fr) minmax(0px,1fr) minmax(0px,1fr)`,
        gridTemplateColumns: `repeat(12,minmax(0px,1fr))`,
        // gridTemplateAreas: `
        //   'clock5 clock5 clock5'
        //   'clock1 clock2 clock3'
        //   'clock4 clock6 clock7'
        // `
        gridTemplateAreas: `
          'clock1 clock1 clock1 clock2 clock2 clock2 clock3 clock3 clock3 clock4 clock4 clock4'
          'clock5 clock5 clock5 clock6 clock6 clock6 clock7 clock7 clock7 clock8 clock8 clock8'
        `
      }
    }
  }),
  { name: 'clocks' }
);
