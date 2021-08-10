import React, { useRef, useState } from 'react';
import { WorldDaylightMap } from 'world-daylight-map';
import { useStyles } from './styles';
import { smallMapIcons, largeMapIcons } from './icons';
import { Dialog, DialogProps } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';

export const ProgramsMap = () => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);

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
          <div className={classes.dialogContainer} ref={mapRef}>
            <div
              className={classes.menuContainer}
              style={{
                left: `${isMenuOpen ? 0 : -300}px`
              }}
            >
              <div className={classes.menuHeader}>
                <p>Sites</p>

                <div className={classes.closeButton} onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>

              {largeMapIcons.map((item, index) => (
                <div className={classes.menuRow} key={index}>
                  <p>{item.iconLabel}</p>

                  <a href={item.iconLink} target="_blank" rel="noopener noreferrer">
                    {item.iconLink}
                  </a>
                </div>
              ))}
            </div>

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

            <div className={classes.menuButton} onClick={() => setIsMenuOpen(true)}>
              <FontAwesomeIcon icon={faAlignJustify} />
            </div>

            <div className={classes.closeButton} onClick={() => setIsDialogOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};
