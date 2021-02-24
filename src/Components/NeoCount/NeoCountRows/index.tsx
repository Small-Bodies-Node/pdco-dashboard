import React from 'react';
import { Tooltip, Zoom } from '@material-ui/core';

import { useStyles } from './styles';

interface IRowEntry {
  text: string;
  fontWeight?: 'normal' | 'bold';
  tooltip?: string;
}
interface IProps {
  rows: [IRowEntry, IRowEntry, IRowEntry];
  alignment?: 'center' | 'flex-end';
}

export const NeoCountRows = (props: IProps) => {
  const { rows, alignment }: IProps = { alignment: 'center', ...props };
  const classes = useStyles({ alignment })();
  return (
    <>
      <div className={classes.container}>
        {rows.map((row, ind) => (
          <div className={classes.row} style={{ fontWeight: row.fontWeight || 'normal' }} key={ind}>
            {row.tooltip ? (
              <Tooltip title={row.tooltip} placement="top" TransitionComponent={Zoom} arrow>
                <span>{row.text}</span>
              </Tooltip>
            ) : (
              <span>{row.text}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
