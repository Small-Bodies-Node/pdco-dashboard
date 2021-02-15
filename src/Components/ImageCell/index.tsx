import React from 'react';
import { useStyles } from './styles';

interface IProps {
  imageUrl: string;
  link?: string;
}

export const ImageCell = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <a target="_blank" href={props.link}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${props.imageUrl})`
          }}
        ></div>
      </a>
    </div>
  );
};
