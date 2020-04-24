import { makeStyles } from '@material-ui/core';

//
export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%'
  },
  example: {
    color: 'red'
  },
  imagePlaceholder: {
    // opacity: 0.5,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(images/world-placeholder.png)',
    // backgroundSize: 'cover',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }
}));
