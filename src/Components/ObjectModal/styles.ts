import { makeStyles } from '@material-ui/core';

import { mobileWidthPxl } from '../../Utils/constants';

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
      width: '50%',
      height: '50%',
      borderRadius: '0.5rem',
      padding: '1rem',
      overflow: 'auto'
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
    mpcLinkContainer: {
      display: 'flex'
    },
    mpcLink: {
      margin: '0 auto 0 0',
      color: 'white',
      fontSize: '1rem'
    },
    downloadButton: {
      outline: 'none',
      border: 'none',
      background: 'none',
      color: 'white',
      padding: '0',
      margin: '0.5rem 0 0 0',
      textDecoration: 'underline',
      fontSize: '1rem',
      cursor: 'pointer'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      mainContentContainer: {
        width: '90%',
        height: '80%'
      }
    }
  }),
  { name: 'object-modal' }
);
