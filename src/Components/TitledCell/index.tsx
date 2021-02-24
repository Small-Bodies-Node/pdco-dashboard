import React from 'react';

import { useStyles } from './styles';
import { CircularProgress, Tooltip, Zoom } from '@material-ui/core';

interface IProps {
  title: string;
  icon?: () => JSX.Element;
  link?: string;
  tooltip?: string;
  alignment?: 'left' | 'center' | 'right';
  isDisplayed?: boolean;
  isHeightAuto?: boolean;
}

export const TitledCell = (props: React.PropsWithChildren<IProps>) => {
  // --------------------------------------------------------------->>>

  const { title, link, tooltip, isHeightAuto }: IProps = { ...props };
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
    <>
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
        </div>
        <div className={classes.content}>
          {props.isDisplayed ? props.children : <CircularProgress />}
        </div>
      </div>
    </>
  );
};
