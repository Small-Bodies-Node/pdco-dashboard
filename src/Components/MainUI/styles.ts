import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../Utils/constants';

/**
 * Define Grid Row-Column Params for Main (non-Mobile) 'Desktop' View
 */
const gridGap = 20;
const gridTemplateRows = `minmax(0px,.5fr) minmax(0px,.5fr) minmax(0px,1.5fr) minmax(0px,3fr)`; // This pattern ensures the grid cells don't shrink/expand depending on content
const gridTemplateColumns = `repeat(8,minmax(0px,1fr))`;
const gridTemplateAreas = `
  'imageLeft title     title     title     title     title    title      imageRight'
  'imageLeft clocks    clocks    clocks    clocks    clocks   clocks     imageRight'
  'neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs'
  'recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab'
`;

/**
 * Define Grid Row-Column Params for Mobile View
 */
const gridGapMobile = 10;
const gridTemplateRowsMobile = `
  minmax(0px,70px)
  minmax(0px,120px)
  minmax(0px,150px)
  minmax(0px,120px)
  minmax(0px,350px)
  minmax(0px,350px)
`;
const gridTemplateColumnsMobile = `
  minmax(0px,1fr) minmax(0px,2fr) minmax(0px,2fr) minmax(0px,1fr)`;
const gridTemplateAreasMobile = `
  'imageLeft title     title     imageRight'
  'clocks    clocks    clocks    clocks '
  'sentry    sentry    programs  programs '
  'neoCount  neoCount  neoCount  neoCount'
  'recentTab recentTab recentTab recentTab'
  'futureTab futureTab futureTab  futureTab'
`;

/**
 * Now apply these grid settings to the actual styles generator
 */
export const useStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
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
    date: {
      gridArea: 'date',
      backgroundColor: 'blue',
      fontSize: 20,
      fontWeight: 'bold'
    },
    clocks: {
      gridArea: 'clocks',
      backgroundColor: 'green'
    },
    neoCount: {
      gridArea: 'neoCount',
      backgroundColor: 'cyan'
    },
    sentry: {
      gridArea: 'sentry',
      backgroundColor: 'purple'
    },
    programs: {
      gridArea: 'programs',
      backgroundColor: 'purple'
    },
    recentTab: {
      gridArea: 'recentTab',
      backgroundColor: 'brown'
    },
    futureTab: {
      gridArea: 'futureTab',
      backgroundColor: 'yellow'
    },

    [`@media (max-width: ${mobileWidthPxl}px)`]: {
      container: {
        height: 'auto', // Let height grow with content
        gridGap: gridGapMobile,
        gridTemplateRows: gridTemplateRowsMobile,
        gridTemplateColumns: gridTemplateColumnsMobile,
        gridTemplateAreas: gridTemplateAreasMobile
      },
      title: {
        '& > .shortTitle': {
          display: 'block'
        },
        '& > .longTitle': {
          display: 'none'
        }
      }
    }
  }),
  { name: 'main-ui' }
);
