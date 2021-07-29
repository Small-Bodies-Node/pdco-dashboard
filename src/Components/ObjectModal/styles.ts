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
      minWidth: '50%',
      maxWidth: '70%',
      minHeight: '50%',
      maxHeight: '70%',
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
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',

      '& button, a, p': {
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        margin: 0,
        padding: 0,
        fontSize: '0.9rem'
      }
    },
    linkContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      border: 'solid 1px white',
      borderRadius: '0.4rem',

      padding: '0.35rem',
      margin: '0 0.35rem 0.75rem 0.35rem',

      transition: 'ease-in-out 0.12s',

      cursor: 'pointer',

      '&:hover': {
        backgroundColor: '#333A61'
      }
    },
    mpcLink: {
      margin: '0',
      color: 'white'
    },
    downloadButton: {
      outline: 'none',
      border: 'none',
      background: 'none',
      color: 'white',
      padding: '0',
      margin: '0',
      cursor: 'pointer'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      mainContentContainer: {
        maxWidth: '90%',
        maxHeight: '80%'
      }
    }
  }),
  { name: 'object-modal' }
);
