import React from 'react';
import { useStyles } from './styles';

interface IProps {
  imageUrl: string;
}

export const ImageCell = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${props.imageUrl})`
        }}
      ></div>
    </div>
  );
};
