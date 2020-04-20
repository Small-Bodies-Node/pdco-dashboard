import { makeStyles } from '@material-ui/core';
import { mobileWidthPxl, borderColor } from '../../Utils/constants';

const numCols = 10;
const numRows = 10;

const gridTemplateAreas = `
  'imageLeft imageLeft title     title     title     title     title    title      imageRight imageRight'
  'imageLeft imageLeft clocks    clocks    clocks    clocks    clocks   clocks     imageRight imageRight'
  'neoCount  neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs   programs'
  'neoCount  neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs   programs'
  'neoCount  neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs   programs'
  'recentTab recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab  futureTab'
  'recentTab recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab  futureTab'
  'recentTab recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab  futureTab'
  'recentTab recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab  futureTab'
  'recentTab recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab  futureTab'
`;

const gridTemplateAreasMobile = `
  'imageLeft title     title     title     imageRight'
  'clocks    clocks    clocks    clocks    clocks '
  'clocks    clocks    clocks    clocks    clocks '
  'sentry    sentry    sentry    sentry    sentry '
  'sentry    sentry    sentry    sentry    sentry '
  'programs  programs  programs  programs  programs'
  'neoCount  neoCount  neoCount  neoCount  neoCount'
  'recentTab recentTab recentTab recentTab recentTab'
  'futureTab futureTab futureTab futureTab  futureTab'
`;

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: '100vw',
      height: '95vh',
      display: 'grid',
      gridTemplateRows: `repeat(10,minmax(0px,1fr))`, // This pattern ensures the grid cells don't shrink/expand depending on content
      gridTemplateColumns: `repeat(10,minmax(0px,1fr))`,
      gridTemplateAreas: gridTemplateAreas,
      textAlign: 'center',
      text: 'center',
      border: `15px solid ${borderColor}`,
      '& > div': {
        backgroundColor: 'transparent',
        border: `3px solid ${borderColor}`,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
      fontWeight: 'bold'
    },
    //
    clocks: {
      gridArea: 'clocks',
      backgroundColor: 'green'
    },

    //

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
        gridTemplateRows: `repeat(9,minmax(0px,1fr))`,
        gridTemplateColumns: `repeat(5,minmax(0px,1fr))`,
        gridTemplateAreas: gridTemplateAreasMobile
      }
    }
  }),
  { name: 'main-ui' }
);
