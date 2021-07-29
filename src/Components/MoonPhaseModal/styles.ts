import { makeStyles } from '@material-ui/core';

import { mobileWidthPxl } from '../../Utils/constants';

const moonPhaseGridTemplateColumns = `repeat(6,minmax(0px,1fr))`;
const moonPhaseGridTemplateColumnsMobile = `repeat(2,minmax(0px,1fr))`;

export const useStyles = makeStyles(
  (theme) => ({
    backgroundContainer: {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      left: '0',
      top: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainContentContainer: {
      backgroundColor: '#181b2e',
      minWidth: '50%',
      maxWidth: '70%',
      minHeight: '50%',
      maxHeight: '70%',
      borderRadius: '0.5rem',
      padding: '1rem',
      overflow: 'auto'
    },
    innerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    headerContainer: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',

      '& button': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        border: 'solid 1px white',
        borderRadius: '0.4rem',

        outline: 'none',

        padding: '0.35rem',
        margin: '0 0.35rem 0.75rem 0.35rem',

        transition: 'ease-in-out 0.12s',

        cursor: 'pointer',

        fontSize: '1rem',
        background: 'transparent',
        color: 'white',

        '&:hover': {
          backgroundColor: '#333A61'
        }
      }
    },
    header: {
      fontSize: '1.35rem',
      fontWeight: 600,
      textAlign: 'center',
      margin: '0 auto'
    },
    previousMonthButton: {
      margin: '0 auto 0 0'
    },
    nextMonthButton: {
      margin: '0 0 0 auto'
    },
    closeButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    closeButton: {
      cursor: 'pointer',
      transition: 'ease-in-out 0.12s',
      '&:hover': {
        opacity: '0.7'
      }
    },
    tableContainer: {
      marginTop: '1rem'
    },
    monthGrid: {
      width: '100%',

      display: 'grid',
      gridTemplateColumns: moonPhaseGridTemplateColumns
    },
    moonPhaseCell: {
      padding: '1.5rem',
      width: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    moonPhaseCellTitle: {
      fontSize: '1rem',
      fontWeight: 600,

      margin: '0 0 0.5rem 0',
      textAlign: 'center'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      mainContentContainer: {
        maxWidth: '90%',
        maxHeight: '80%'
      },
      monthGrid: {
        gridTemplateColumns: moonPhaseGridTemplateColumnsMobile
      },
      headerContainer: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr 1fr'
      },
      previousMonthButton: {
        margin: '0 auto'
      },
      nextMonthButton: {
        margin: '0 auto'
      }
    }
  }),
  { name: 'object-modal' }
);
