import React from 'react';

import { useStyles } from './styles';

export const ProgramsMap = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        {/* <iframe
          title="xxx"
          src="https://www.google.com/maps/d/embed?mid=19R2POoOKW1RQj4-bBd5GA7dLvw8"
          width="100%"
          height="100%"
        ></iframe> */}
        <div className={classes.imagePlaceholder}></div>
      </div>
    </>
  );
};
