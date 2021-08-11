import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../Utils/constants';

/**
 * Define Grid Row-Column Params for Main (non-Mobile) 'Desktop' View
 */
const gridGap = 20;
const gridTemplateRows = `minmax(50px,.8fr) minmax(0px,.5fr) minmax(0px, 5fr)`;
const gridTemplateColumns = `repeat(8,minmax(0px,1fr))`;
const gridTemplateAreas = `
  'imageLeft title     title     title     title     title     title     imageRight'
  'imageLeft content   content   content   content   content   content   imageRight'
  'blank1    content   content   content   content   content   content   blank2'
`;

/**
 * Define Grid Row-Column Params for Mobile View
 * Enable variable-length tables to dictate height of their panels
 */
const gridGapMobile = 10;
const gridTemplateRowsMobile = `
  minmax(0px,70px)
  minmax(0px,auto)
`;
const gridTemplateColumnsMobile = `
  minmax(0px,1fr) minmax(0px,2fr) minmax(0px,2fr) minmax(0px,1fr)`;
const gridTemplateAreasMobile = `
  'imageLeft title     title     imageRight'
  'content   content   content   content'
`;

/**
 * Misc
 */
const panelBorder = `3px solid ${borderColor}`;

/**
 * Now apply these grid settings to the actual styles generator
 */
export const useStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      minHeight: 650,
      overflowY: 'auto',
      display: 'grid',
      gridTemplateRows,
      gridTemplateColumns,
      gridTemplateAreas,
      gridGap,
      textAlign: 'center',
      border: `${gridGap}px solid ${true ? 'transparent' : borderColor}`,
      '& > div': {
        // backgroundColor: 'transparent',
        // backgroundColor: 'rgba(50,50,50,1)',
        // backgroundColor: 'black',
        backgroundColor: '#181b2e',
        // border: `3px solid ${borderColor}`,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1
      }
    },
    imageLeft: {
      gridArea: 'imageLeft',
      backgroundColor: 'pink'
    },
    imageRight: {
      gridArea: 'imageRight',
      backgroundColor: 'red'
    },
    title: {
      gridArea: 'title',
      border: panelBorder,
      backgroundColor: 'blue',
      fontSize: 20,
      fontWeight: 'bold',
      //
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      '& > div': {
        paddingBottom: 2
      },
      '& > .shortTitle': {
        display: 'none',
        paddingBottom: 2
      },
      '& > .date': {
        fontSize: 12
      }
    },
    mainContentContainer: {
      gridArea: 'content',
      border: panelBorder,

      padding: '1rem',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start !important',
      justifyContent: 'flex-start !important',

      '& > h2': {
        padding: '1rem 0 0 1rem',
        margin: 0,
        textAlign: 'left'
      },
      '& > h2:not(:first-child)': {
        margin: '1rem 0 0 0'
      },
      '& > ul > li': {
        fontSize: '1rem',
        textAlign: 'left',
        padding: '0 0 0.5rem 0'
      }
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      container: {
        height: 'auto', // Let height grow with content
        gridGap: gridGapMobile,
        gridTemplateRows: gridTemplateRowsMobile,
        gridTemplateColumns: gridTemplateColumnsMobile,
        gridTemplateAreas: gridTemplateAreasMobile,
        margin: '1.5rem 0 0 0'
      },
      title: {
        '& > .shortTitle': {
          display: 'block'
        },
        '& > .longTitle': {
          display: 'none'
        }
      },
      mainContentContainer: {
        padding: '0.5rem'
      }
    }
  }),
  { name: 'main-ui' }
);
