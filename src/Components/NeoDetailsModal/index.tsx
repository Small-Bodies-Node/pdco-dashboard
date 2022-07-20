import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTable, faDownload } from '@fortawesome/free-solid-svg-icons';

import { TitledCell } from '../TitledCell';
import { IRawRow } from '../TableCAD/index';
import { auToKm, auToLd, auToMi, kmToAu, kmToFt } from '../../utils/conversionFormulae';
import { earthMeanRadiusKm } from '../../utils/constants';
import { TTableBodyElements } from '../../models/TTableBodyElements';
import Table from '../Table';
import { getSSDUrlFromFullName } from '../../utils/getSSDURLFromFullName';
import { getCNEOSOrbitViewerUrlFromFullNameAndDate } from '../../utils/getCNEOSOrbitViewerUrlFromFullNameAndData';
import { getMPCUrlFromFullName } from '../../utils/getMPCUrlFromFullName';
import { EDistanceUnits } from '../../models/EDistanceUnits';
import { ESizeUnits } from '../../models/ESizeUnits';
import { ESurfaceDistanceUnits } from '../../models/ESurfaceDistanceUnits';
import styles from "./styles.module.scss";
import { downloadPdfFactSheet } from '../../utils/downloadPdfFactSheet';

type IRawRowKeyNames = Omit<IRawRow, 'cd'> & { cd: string };
const rawRowKeyNames: IRawRowKeyNames = {
  fullname: 'Name',
  cd: 'Close Approach Date/Time',
  cd_sigma: 'Close Approach Date/Time Uncertainty',
  dist: 'Nominal Distance',
  h: 'H (mag)',

  diameter: 'Diameter',
  diameter_sigma: 'Diameter Sigma',

  nominal_size: 'Nominal Size',
  minimum_size: 'Minimum Size',
  maximum_size: 'Maximum Size',

  min_distance: 'Minimum Distance',
  max_distance: 'Maximum Distance',

  v_rel: 'V-Relative (km/s)',
  v_inf: 'V-Infinity (km/s)'
};

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;

  rawRow: IRawRow | undefined;
}
/**
 * Modal which shows more details about a specific NEO. Displays 
 * two tables of data and a row of links to helpful websites.
 */
export const NeoDetailsModal = ({ isShown, setIsShown, rawRow }: IProps) => {
  // State
  const [distanceUnit, setDistanceUnit] = useState<number>(EDistanceUnits.LD);
  const [sizeUnit, setSizeUnit] = useState<number>(ESizeUnits.m);
  const [surfaceDistance, setSurfaceDistance] = useState<number>(ESurfaceDistanceUnits.km);

  const [distanceSizeBodyElements, setDistanceSizeBodyElements] = useState<TTableBodyElements>([]);
  const [otherBodyElements, setOtherBodyElements] = useState<TTableBodyElements>([]);

  // Generate arrays to pass to table
  useEffect(() => {
    if(!rawRow) {
      return;
    }

    const distanceSizeBodyElements: TTableBodyElements = [
      {
        elements: [
          { text: `Distance (${EDistanceUnits[distanceUnit]})` },
          { text: convertAuTo(rawRow.dist) },
          { text: convertAuTo(rawRow.min_distance) },
          { text: convertAuTo(rawRow.max_distance) },
        ],
        onClick: () => setDistanceUnit((distanceUnit + 1) % EDistanceUnits.__LENGTH)
      },
      {
        elements: [
          { text: `Size (${ESizeUnits[sizeUnit]})` },
          { text: convertKmTo(rawRow.nominal_size) },
          { text: convertKmTo(rawRow.minimum_size) },
          { text: convertKmTo(rawRow.maximum_size) },
        ],
        onClick: () => setSizeUnit((sizeUnit + 1) % ESizeUnits.__LENGTH)
      },
      {
        elements: [
          { text: <span key={0}>Distance - R<sub>E</sub> ({ESurfaceDistanceUnits[surfaceDistance]})</span> },
          { text: convertSurfaceDistanceAu(rawRow.dist) },
          { text: convertSurfaceDistanceAu(rawRow.min_distance) },
          { text: convertAuTo(rawRow.max_distance) },
        ],
        onClick: () => setSurfaceDistance((surfaceDistance + 1) % ESurfaceDistanceUnits.__LENGTH)
      }
    ];

    const otherBodyElements = [
      {
        elements: [
          { text: 'Close Approach Date' },
          { text: `${rawRow.cd.toUTCString()} ± ${rawRow.cd_sigma}` }
        ]
      },
      {
        elements: [
          { text: 'H (mag)' },
          { text: rawRow.h }
        ]
      },
      {
        elements: [
          { text: 'V-rel (km/s)' },
          { text: parseFloat(rawRow.v_rel).toLocaleString('en-US', {
            maximumFractionDigits: 5
          })
          }
        ]
      },
      {
        elements: [
          { text: 'V-inf (km/s)' },
          { text: parseFloat(rawRow.v_inf).toLocaleString('en-US', {
            maximumFractionDigits: 5
          })
          }
        ]
      }
    ]

    // Store in state
    setDistanceSizeBodyElements(distanceSizeBodyElements);
    setOtherBodyElements(otherBodyElements);
  }, [rawRow, distanceUnit, sizeUnit, surfaceDistance]);

  const downloadFactSheet = async () => {
    if(!rawRow) {
      return;
    }

    downloadPdfFactSheet({
      fullname: rawRow.fullname,
      cd: rawRow.cd,
      min_distance: rawRow.min_distance,
      min_size: rawRow.minimum_size,
      max_size: rawRow.maximum_size,
      v_rel: rawRow.v_rel,
      h: rawRow.h
    });
  };

  const convertAuTo = (value: string, digits?: number): string => {
    // Display dist as different formats depending on unit selected
    let dist: string; // rawRow.dist is in au by default

    switch (distanceUnit) {
      case EDistanceUnits.LD: // ld selected
        dist = auToLd(parseFloat(value)).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 5
        });
        break;
      case EDistanceUnits.km: // km selected
        dist = auToKm(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      case EDistanceUnits.au: // au selected
        dist = parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: digits ?? 5 });
        break;
      case EDistanceUnits.mi: // mi selected
        dist = auToMi(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return dist;
  };

  const convertKmTo = (value: string, digits?: number): string => {
    let size: string;

    switch (sizeUnit) {
      case ESizeUnits.m:
        size = (parseFloat(value) * 1000).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 0
        });
        break;
      case ESizeUnits.ft:
        size = kmToFt(parseFloat(value)).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 0
        });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return size;
  };

  const convertSurfaceDistanceAu = (value: string): string => {
    let dist: string;

    switch (surfaceDistance) {
      case ESurfaceDistanceUnits.km:
        dist = (auToKm(parseFloat(value)) - earthMeanRadiusKm).toLocaleString('en-US', {
          maximumFractionDigits: 0
        });
        break;
      case ESurfaceDistanceUnits.mi:
        dist = auToMi(parseFloat(value) - kmToAu(earthMeanRadiusKm)).toLocaleString('en-US', {
          maximumFractionDigits: 0
        });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return dist;
  };

  const downloadDataAsCSV = (): void => {
    if(!rawRow) {
      return;
    }

    const rows: string[][] = [];
    for (const [key, value] of Object.entries(rawRow)) {
      const tempRow: string[] = [];

      if (key.includes('_size')) {
        tempRow.push((rawRowKeyNames as any)[key] + ` (${ESizeUnits[sizeUnit]})`);
      } else if (key.includes('dist')) {
        tempRow.push((rawRowKeyNames as any)[key] + ` (${EDistanceUnits[distanceUnit]})`);
      } else {
        tempRow.push((rawRowKeyNames as any)[key]);
      }

      if (key.includes('_size')) {
        tempRow.push(convertKmTo(value as string));
      } else if (key.includes('dist')) {
        tempRow.push(convertAuTo(value as string));
      } else {
        tempRow.push(value as string);
      }

      rows.push(tempRow);
    }

    const csvData =
      'data:text/csv;charset=utf-8,' + rows.map((e) => `"${e.join('","')}"`).join('\n');

    const encodedUri = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${rawRow?.fullname.replaceAll(' ', '+')}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (!isShown || !rawRow) {
    return null;
  }

  return (
    <div className={styles.backgroundContainer} onClick={() => setIsShown(false)}>
      <div className={styles.mainContentContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <FontAwesomeIcon
            className={styles.closeButton}
            onClick={() => setIsShown(false)}
            style={{ fontSize: 18 }}
            flip="horizontal"
            icon={faTimes}
          />
        </div>

        <TitledCell
          title={rawRow.fullname}
          link={getSSDUrlFromFullName(rawRow.fullname)}
          tooltip={'Detailed data for ' + rawRow.fullname}
          icon={() => <FontAwesomeIcon icon={faTable} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
          <div className={styles.rowContainer}>
            {/** LINK TO SBDB SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getSSDUrlFromFullName(rawRow.fullname)}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                SBDB Data
              </a>
            </div>

            {/** LINK TO SBDB SITE WITH ORBIT DIAGRAM */}
            <div className={styles.linkContainer}>
              <a
                href={getSSDUrlFromFullName(rawRow.fullname) + '&view=VOP'}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                SBDB Orbit
              </a>
            </div>

            {/** LINK TO CNEOS CA PAGE */}
            <div className={styles.linkContainer}>
              <a
                href={getCNEOSOrbitViewerUrlFromFullNameAndDate(rawRow.fullname, rawRow.cd)}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                CNEOS Orbit
              </a>
            </div>

            {/** LINK TO MPC SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getMPCUrlFromFullName(rawRow.fullname)}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                MPC Data
              </a>
            </div>

            {/** LINK TO CNEOS CA PAGE */}
            <div className={styles.linkContainer}>
              <a
                href="https://cneos.jpl.nasa.gov/ca/"
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                CNEOS CA List
              </a>
            </div>

            {/** BUTTON TO DOWNLOAD AS CSV */}
            <div className={styles.linkContainer} onClick={downloadDataAsCSV}>
              <FontAwesomeIcon icon={faDownload} size="sm" />

              <p style={{ marginLeft: '9px' }}>CSV</p>
            </div>

            {/** BUTTON TO DOWNLOAD AS PDF */}
            <div className={styles.linkContainer} onClick={downloadFactSheet}>
              <FontAwesomeIcon icon={faDownload} size="sm" />

              <p style={{ marginLeft: '9px' }}>PDF (Fact Sheet)</p>
            </div>
          </div>

          {/** DISTANCE & SIZE TABLE */}
          <Table
            headElements={['Data Point', 'Nominal', 'Minimum', 'Maximum'].map(item => (
              {
                element: item
              }
            ))}
            bodyElements={distanceSizeBodyElements}
          >
            <colgroup>
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
          </Table> 

          <div className={styles.spacer} />

          {/** OTHER VALUES TABLE */}
          <Table
            headElements={['Data Point', 'Value'].map(item => (
              {
                element: item
              }
            ))}
            bodyElements={otherBodyElements}
          >
            <colgroup>
              <col style={{ width: '25%' }} />
              <col style={{ width: '75%' }} />
            </colgroup>
          </Table>
        </TitledCell>
      </div>
    </div>
  );
};