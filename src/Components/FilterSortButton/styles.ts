import { makeStyles } from '@material-ui/core';
import { borderColor, mobileWidthPxl } from '../../Utils/constants';

/**
 * Now apply these grid settings to the actual styles generator
 */
export const useStyles = makeStyles(
  () => ({
    filterSortButton: {
      '& button': {
        width: 30,
        height: 30,

        position: 'absolute',
        right: 3,
        top: 3,
        zIndex: 10,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        background: '#181b2e',
        border: `3px solid ${borderColor}`,
        borderRadius: 7,
        outline: 'none',
        color: 'white',
        cursor: 'pointer',

        transition: 'ease-in-out 0.12s',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.15)'
        }
      }
    },
    filterSortDropdownContainer: {
      position: 'absolute',
      top: 40,
      right: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      zIndex: 20,

      overflowY: 'auto',

      minWidth: 150,
      minHeight: 100,
      maxHeight: 300,
      padding: '0.7rem',

      background: '#181b2e',
      border: `3px solid ${borderColor}`,
      borderRadius: 7,
      boxShadow: 'rgba(255, 255, 255, 0.1) 0px 3px 8px',

      transition: 'ease-in-out 0.12s',
      transformOrigin: 'top',

      '& > div': {
        width: '100%'
      }
    },
    header: {
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 600,
      margin: 0,
      textAlign: 'left'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: '0.5rem 0 0 0',
      width: '100%',

      '& > div': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '0.35rem',
        margin: '0.2rem 0',
        borderRadius: 7,
        cursor: 'pointer',

        transition: 'ease-in-out 0.12s',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.1)'
        },
        '& p': {
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 500,
          margin: 0
        },
        '& div': {
          margin: '0 0 0 auto'
        }
      },
      '& > #selected': {
        background: 'rgba(255, 255, 255, 0.2)'
      }
    },
    divider: {
      margin: '0.25rem 0 0.6rem 0',

      width: '100%',
      height: '1px',

      background: 'rgba(255, 255, 255, 0.1)'
    },
    sliderContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',

      '& p': {
        margin: '0.5rem 0 0 0'
      },

      '& > input': {
        width: '100%'
      }
    },
    uncertainNEOsContainer: {
      display: 'flex',
      flexDirection: 'row',

      '& > label': {
        whiteSpace: 'normal',
        maxWidth: '140px',
        marginRight: '0.5rem',
        textAlign: 'left',

        fontWeight: '500',
        fontSize: '0.9rem'
      },

      '& input': {
        margin: 'auto 0.5rem auto 0'
      }
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      filterSortDropdownContainer: {
        maxHeight: '220px'
      }
    }
  }),
  { name: 'main-ui' }
);
