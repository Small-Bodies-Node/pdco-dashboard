import { makeStyles } from '@material-ui/core';

export const useStyles = (isHeightAuto: boolean) =>
  makeStyles(
    (theme) =>
      !isHeightAuto
        ? {
            container: {
              width: '100%',
              height: '100%',
              minHeight: 200,
              padding: `0px 10px 0px 10px`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            },
            tableContainer: {
              maxHeight: 'unset'
            },
            total: {
              minHeight: 45,
              textAlign: 'start',
              padding: '10px 0px 3px 3px'
            },
            noMaxWidth: {
              maxWidth: 'none'
            },
            tableRowHighlighted: {
              '& td, tr': {
                color: 'yellow'
              }
            },
            legend: {
              textAlign: 'start',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        : {
            container: {
              width: '100%',
              height: 'auto',
              padding: `0px 10px 0px 10px`,
              overflow: 'hidden'
            },
            tableContainer: {
              // Governs height of scrollable rows in mobile view
              maxHeight: 200
            },
            total: {
              textAlign: 'start',
              padding: '10px 0px 3px 3px'
            },
            noMaxWidth: {
              maxWidth: 'none'
            },
            tableRowHighlighted: {
              '& td, tr': {
                color: 'yellow'
              }
            },
            legend: {
              textAlign: 'start',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
    { name: 'table-cad' }
  );
