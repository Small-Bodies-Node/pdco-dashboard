import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../Utils/constants';

/**
 * Define Grid Row-Column Params for Main (non-Mobile) 'Desktop' View
 */
const gridGap = 20;
const gridTemplateRows = `minmax(0px,.8fr) minmax(0px,.5fr) minmax(0px,2.0fr) minmax(0px,3fr)`; // This pattern ensures the grid cells don't shrink/expand depending on content
const gridTemplateColumns = `repeat(24,minmax(0px,1fr))`;
const gridTemplateAreas = `
  'imageLeft     imageLeft     imageLeft     title         title         title         title         title         title         title         title         title         title         title         title         title         title               title               title               title               title               imageRight          imageRight          imageRight'     
  'imageLeft     imageLeft     imageLeft     clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks        clocks              clocks              clocks              clocks              clocks              imageRight          imageRight          imageRight'     
  'neoCount      neoCount      neoCount      neoCount      neoCount      neoCount      neoCount      neoCount      sentry        sentry        sentry        sentry        moonPhase     moonPhase     moonPhase     moonPhase     programs            programs            programs            programs            programs            programs            programs            programs'
  'recentTab     recentTab     recentTab     recentTab     recentTab     recentTab     recentTab     recentTab     futureTab     futureTab     futureTab     futureTab     futureTab     futureTab     futureTab     futureTab     largeDistantTab     largeDistantTab     largeDistantTab     largeDistantTab     largeDistantTab     largeDistantTab     largeDistantTab     largeDistantTab'
`;

/**
 * Define Grid Row-Column Params for Mobile View
 * Enable variable-length tables to dictate height of their panels
 */
const gridGapMobile = 10;
const gridTemplateRowsMobile = `
  minmax(0px,90px)
  minmax(0px,120px)
  minmax(0px,150px)
  minmax(0px,180px)
  minmax(100px,auto)
  minmax(100px,auto)
  minmax(100px,auto)
  minmax(175px,auto)
`;
const gridTemplateColumnsMobile = `
  minmax(0px,1fr) minmax(0px,2fr) minmax(0px,2fr) minmax(0px,1fr)`;
const gridTemplateAreasMobile = `
  'imageLeft title     title     imageRight'
  'clocks    clocks    clocks    clocks'
  'sentry    sentry    programs  programs'
  'neoCount  neoCount  neoCount  neoCount'
  'recentTab recentTab recentTab recentTab'
  'futureTab futureTab futureTab  futureTab'
  'largeDistantTab largeDistantTab largeDistantTab largeDistantTab'
  'moonPhase moonPhase moonPhase moonPhase'
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
      border: `${gridGap}px solid transparent`,
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
      height: '100%',
      //
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      '& div': {
        paddingBottom: 2
      },
      '& .shortTitle': {
        display: 'none',
        paddingBottom: 2,
        fontSize: 16
      },
      '& .date': {
        fontSize: 12
      }
    },
    clocks: {
      gridArea: 'clocks',
      border: panelBorder,
      backgroundColor: 'green'
    },
    neoCount: {
      gridArea: 'neoCount',
      border: panelBorder,
      backgroundColor: 'cyan'
    },
    sentry: {
      gridArea: 'sentry',
      border: panelBorder,
      backgroundColor: 'purple'
    },
    moonPhase: {
      gridArea: 'moonPhase',
      border: panelBorder,
      backgroundColor: 'purple'
    },
    programs: {
      gridArea: 'programs',
      border: panelBorder,
      backgroundColor: 'purple'
    },
    recentTab: {
      gridArea: 'recentTab',
      border: panelBorder,
      backgroundColor: 'brown'
    },
    futureTab: {
      gridArea: 'futureTab',
      border: panelBorder,
      backgroundColor: 'yellow'
    },
    // Lower Section
    largeDistantTab: {
      gridArea: 'largeDistantTab',
      border: panelBorder,
      backgroundColor: 'yellow'
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
        '& .shortTitle': {
          display: 'block'
        },
        '& .longTitle': {
          display: 'none'
        }
      }
    }
  }),
  { name: 'main-ui' }
);
