import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = (isHeightAuto: boolean) =>
  makeStyles(
    (theme) => {
      return !isHeightAuto
        ? {
            container: {
              height: '100%',
              width: '100%',
              position: 'relative'
            },
            title: {
              position: 'absolute',
              top: 0,
              height: 35,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              '& a': {
                textDecoration: 'none',
                color: 'white',
                '&:hover': {
                  color: 'cyan'
                }
              }
            },
            content: {
              position: 'absolute',
              top: 35,
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
        : // Mobile: let table size determine height of panel
          {
            container: {
              position: 'relative',
              height: 'auto', // Control how height is handled
              width: '100%'
            },
            title: {
              position: 'relative',
              height: 35,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              '& a': {
                textDecoration: 'none',
                color: 'white',
                '&:hover': {
                  color: 'cyan'
                }
              }
            },
            content: {
              position: 'relative',
              height: 'auto',
              width: '100%',
              display: 'block',
              marginTop: 5,
              marginBottom: 5
            }
          };
    },
    { name: 'titled-cell' }
  );
