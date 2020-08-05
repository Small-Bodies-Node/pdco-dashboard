import React from 'react';

import { useStyles } from './styles';
import { CircularProgress } from '@material-ui/core';

interface IProps {
  title: string | React.JSXElementConstructor<any>;
  icon?: () => JSX.Element;
  alignment?: 'left' | 'center';
  isDisplayed?: boolean;
}

export const TitledCell = (props: React.PropsWithChildren<IProps>) => {
  const RenderedTitle =
    typeof props.title === 'string' ? () => <>{props.title}</> : () => <props.title />;
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
          <RenderedTitle />
        </div>
        <>
          <div className={classes.content}>
            {props.isDisplayed ? props.children : <CircularProgress />}
          </div>
        </>
      </div>
    </>
  );
};
