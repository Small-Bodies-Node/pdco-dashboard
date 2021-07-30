import React, { useState } from 'react';
import { WorldDaylightMap } from 'world-daylight-map';
import { useStyles } from './styles';
import { smallMapIcons, largeMapIcons } from './icons';
import { Dialog, DialogProps } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';

export const ProgramsMap = () => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div className={classes.container}>
        <WorldDaylightMap
          options={{
            controlsPosition: 'no-controls',
            isSunshineDisplayed: false,
            icons: smallMapIcons
          }}
        />
        <div
          className={classes.overlay}
          onClick={() => {
            setIsDialogOpen((previous) => !previous);
          }}
        />

        <Dialog
          fullWidth={true}
          maxWidth={'xl' as DialogProps['maxWidth']}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="programs-dialog"
          open={isDialogOpen}
        >
          <div className={classes.dialogContainer}>
            <div className={classes.dialogMapWrapper}>
              <WorldDaylightMap
                options={{
                  controlsPosition: 'outer-top',
                  isSunshineDisplayed: !false,
                  icons: largeMapIcons
                  // icons: largeMapIcons.concat(smallMapIcons)
                  // icons: smallMapIcons.concat(largeMapIcons)
                }}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};
