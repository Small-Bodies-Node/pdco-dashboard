import { makeStyles } from '@material-ui/core';

//
export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  triangleSvg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  score: {
    marginTop: 30,
    color: 'black',
    fontSize: 30,
    flex: 1,
    zIndex: 10
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: '33%'
  }
}));
