import React from 'react';

import { useStyles } from './styles';

interface IProps {
  title: string;
  icon?: () => JSX.Element;
  alignment?: 'left' | 'center';
}

export const TitledCell = (props: React.PropsWithChildren<IProps>) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div
          className={classes.title}
          style={{
            justifyContent: props.alignment
          }}
        >
          <span style={{ paddingRight: 5 }}>{props.icon ? <props.icon /> : null} </span>
          {props.title}
        </div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </>
  );
};
