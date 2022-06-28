import { makeStyles } from '@material-ui/core';

export const useStyles = (isHeightAuto: boolean) =>
  makeStyles(
    (theme) => ({
      noMaxWidth: {
        maxWidth: 'none'
      },
      total: {
        minHeight: 45,
        textAlign: 'start',
        padding: '10px 0px 3px 3px'
      },
      tableRowHighlighted: {
        '& td, tr': {
          color: 'yellow'
        }
      },
      ...(!isHeightAuto
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
            }
          })
    }),
    { name: 'table-cad' }
  );
