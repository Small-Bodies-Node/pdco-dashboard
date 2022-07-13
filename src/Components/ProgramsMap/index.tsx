import { useEffect, useRef, useState } from "react";
import { WorldDaylightMap } from "world-daylight-map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IIcon } from "world-daylight-map/dist/models";
import moment from "moment-timezone";

import { smallMapIcons, largeMapIcons } from "./icons";
// import { Dialog, DialogProps } from "@material-ui/core";
import styles from "./styles.module.scss";

export const ProgramsMap = () => {
  // --->>

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortedLargeMapIcons, setSortedLargeMapIcons] = useState<
    (IIcon & { timeZone?: string })[]
  >([]);
  const [sort, setSort] = useState<"longitude" | "alphabetical">("longitude");

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sort by longitude
    if (sort === "longitude") {
      const sortedIcons = [...largeMapIcons].sort((a, b) => {
        if (a.iconCoord.lng > b.iconCoord.lng) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedLargeMapIcons(sortedIcons);
    }
    // Sort alphabetically
    else {
      const sortedIcons = [...largeMapIcons].sort((a, b) => {
        if (a.iconLabel > b.iconLabel) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedLargeMapIcons(sortedIcons);
    }
  }, [sort]);

  return (
    <>
      <div className={styles.container}>
        {/*
          <WorldDaylightMap
            options={{
              controlsPosition: "no-controls",
              isSunshineDisplayed: false,
              icons: smallMapIcons,
            }}
          />
        */}
        <div
          className={styles.overlay}
          onClick={() => {
            setIsDialogOpen((previous) => !previous);
          }}
        />

        {/*
        <Dialog
          fullWidth={true}
          maxWidth={"xl" as DialogProps["maxWidth"]}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="programs-dialog"
          open={isDialogOpen}
        >
          <div className={styles.dialogContainer} ref={mapRef}>
            <div
              className={styles.menuContainer}
              style={{
                left: `${isMenuOpen ? 0 : -300}px`,
              }}
            >
              <div className={styles.menuHeader}>
                <p>Sites</p>

                <div
                  className={styles.closeButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>

              <span className={styles.sortTitle}>Sort</span>

              <select
                className={styles.sort}
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as "alphabetical" | "longitude")
                }
              >
                <option value="longitude">Longitude</option>

                <option value="alphabetical">Alphabetical (a-z)</option>
              </select>

              {sortedLargeMapIcons.map((item, index) => (
                <div className={styles.menuRow} key={index}>
                  <p>{item.iconLabel}</p>

                  <a
                    href={item.iconLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.iconLink}
                  </a>

                  {item.timeZone && (
                    <p>
                      {moment
                        .tz(item.timeZone)
                        .format("MMM D, Y HH:mm (z, [UTC]Z)")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.dialogMapWrapper}>
              <WorldDaylightMap
                options={{
                  controlsPosition: "outer-top",
                  isSunshineDisplayed: !false,
                  icons: largeMapIcons,
                  // icons: largeMapIcons.concat(smallMapIcons)
                  // icons: smallMapIcons.concat(largeMapIcons)
                }}
              />
            </div>

            <div
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>

            <div
              className={styles.closeButton}
              onClick={() => setIsDialogOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </Dialog>
*/}
      </div>
    </>
  );
};
