import React from 'react';

import { useStyles } from './styles';
import { CircularProgress, Tooltip, Zoom } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { MyError } from '../MyError';

interface IProps {
  title: string;
  icon?: () => JSX.Element;
  link?: string;
  tooltip?: string;
  alignment?: 'left' | 'center' | 'right';
  isDisplayed?: boolean;
  isHeightAuto?: boolean;
  headerElement?: JSX.Element;
}

export const TitledCell = (props: React.PropsWithChildren<IProps>) => {
  // --------------------------------------------------------------->>>

  const { title, link, tooltip, isHeightAuto, headerElement }: IProps = { ...props };
  const classes = useStyles(!!isHeightAuto)();

  // Aux component
  const TitleRow = () => {
    return (
      <>
        <span style={{ paddingRight: 5 }}>{props.icon ? <props.icon /> : null} </span>
        <span>{title}</span>
      </>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.title} style={{ justifyContent: props.alignment }}>
        <Tooltip title={tooltip || ''} placement="top" TransitionComponent={Zoom} arrow>
          {!!link ? (
            <a target="_blank" href={link!}>
              <TitleRow />
            </a>
          ) : (
            <span>
              <TitleRow />
            </span>
          )}
        </Tooltip>

        {!!headerElement && headerElement}
      </div>
      <div className={classes.content}>
        <ErrorBoundary resetKeys={[props.children]} fallbackRender={() => <MyError />}>
          {props.isDisplayed ? props.children : <CircularProgress />}
        </ErrorBoundary>
      </div>
    </div>
  );
};
