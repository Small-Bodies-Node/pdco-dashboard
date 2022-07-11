import { makeStyles } from '@material-ui/core';

import { borderColor, mobileWidthPxl } from '../../Utils/constants';

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
      overflow: 'auto',

      display: 'flex',
      flexDirection: 'column'
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
    statsContainer: {
      display: 'grid',
      padding: '0 24px 0 0',
      gridTemplateColumns: `minmax(0px,0.5fr) minmax(0px,1fr) minmax(0px,1fr)`,
      gridTemplateRows: `repeat(4,minmax(48px, 1fr))`,
      fontWeight: 'bold',
      textAlign: 'center',

      gridTemplateAreas: `
        'blank     time1     time2'
        'all       data1     data4'
        'geo       data2     data5'
        'm         data3     data6'
      `,

      '& span': {
        fontWeight: 'normal'
      }
    },

    cneosButton: {
      border: `solid 2px ${borderColor}`,
      background: 'rgb(36, 39, 57)',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 600,
      cursor: 'pointer',
      margin: '0 auto',
      padding: '2px 6px',
      textDecoration: 'none'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      mainContentContainer: {
        maxWidth: '90%',
        maxHeight: '80%'
      }
    }
  }),
  { name: 'recent-ca-stats-modal' }
);
