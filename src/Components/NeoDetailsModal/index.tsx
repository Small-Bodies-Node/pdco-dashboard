import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTable, faDownload } from '@fortawesome/free-solid-svg-icons';

import { TitledCell } from '../TitledCell';

import { IRawRow } from '../TableCAD/index';
import { auToKm, auToLd, auToMi, kmToAu, kmToFt } from '../../utils/conversionFormulae';
import { earthMeanRadiusKm } from '../../utils/constants';

import { PDFDocument } from 'pdf-lib';
import styles from "./styles.module.scss";
import { TTableBodyElements } from '../../models/TTableBodyElements';
import Table from '../Table';

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

// Types for distance (values will count up from 0)
enum DistanceUnits {
  LD,
  km,
  au,
  mi,
  __LENGTH
}

enum SizeUnits {
  m,
  ft,
  __LENGTH
}

enum SurfaceDistanceUnits {
  km,
  mi,
  __LENGTH
}

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;

  rawRow: IRawRow | undefined;
}
/**
 *
 */
export const NeoDetailsModal = ({ isShown, setIsShown, rawRow }: IProps) => {
  // State
  const [distanceUnit, setDistanceUnit] = useState<number>(DistanceUnits.LD);
  const [sizeUnit, setSizeUnit] = useState<number>(SizeUnits.m);
  const [surfaceDistance, setSurfaceDistance] = useState<number>(SurfaceDistanceUnits.km);

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
          { text: `Distance (${DistanceUnits[distanceUnit]})` },
          { text: convertAuTo(rawRow.dist) },
          { text: convertAuTo(rawRow.min_distance) },
          { text: convertAuTo(rawRow.max_distance) },
        ],
        onClick: incrementDistanceUnit
      },
      {
        elements: [
          { text: `Size (${SizeUnits[sizeUnit]})` },
          { text: convertKmTo(rawRow.nominal_size) },
          { text: convertKmTo(rawRow.minimum_size) },
          { text: convertKmTo(rawRow.maximum_size) },
        ],
        onClick: incrementSizeUnit
      },
      {
        elements: [
          { text: <span key={0}>Distance - R<sub>E</sub> ({SurfaceDistanceUnits[surfaceDistance]})</span> },
          { text: convertSurfaceDistanceAu(rawRow.dist) },
          { text: convertSurfaceDistanceAu(rawRow.min_distance) },
          { text: convertAuTo(rawRow.max_distance) },
        ],
        onClick: incrementSurfaceDistUnit
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

  const downloadPdfFactSheet = async () => {
    const res = await fetch(process.env.PUBLIC_URL + '/CloseApproachFactSheetForm.pdf');
    const buffer = await res.arrayBuffer();

    const doc = await PDFDocument.load(buffer);
    const form = doc.getForm();

    // Fill in form fields
    form.getTextField('Name').setText(`${rawRow?.fullname}`);
    form.getTextField('Date').setText(`Will pass by Earth on: ${rawRow?.cd.toUTCString()}`);
    rawRow?.min_distance &&
      form
        .getTextField('Distance')
        .setText(
          `At a minimum distance of: ${auToLd(
            parseFloat(rawRow.min_distance)
          ).toLocaleString('en-US', { maximumFractionDigits: 4 })} LD (${auToKm(
            parseFloat(rawRow.min_distance)
          ).toLocaleString('en-US', { maximumFractionDigits: 1 })} km)`
        );
    rawRow?.minimum_size &&
      rawRow?.maximum_size &&
      form
        .getTextField('Size')
        .setText(
          `${convertKmTo(rawRow.minimum_size, 1)}${SizeUnits[sizeUnit]} - ${convertKmTo(
            rawRow.maximum_size,
            1
          )}${SizeUnits[sizeUnit]}`
        );
    rawRow?.v_rel &&
      form
        .getTextField('Velocity')
        .setText(
          `${parseFloat(rawRow.v_rel).toLocaleString('en-US', { maximumFractionDigits: 1 })} km/s`
        );
    rawRow?.min_distance &&
      form.getTextField('MinDistance').setText(
        `${auToKm(parseFloat(rawRow.min_distance)).toLocaleString('en-US', {
          maximumFractionDigits: 1
        })} km`
      );
    form.getTextField('Magnitude').setText(`${rawRow?.h}`);

    const pdfDataUri = await doc.saveAsBase64({ dataUri: true });
    const link = document.createElement('a');
    link.download = `${rawRow?.fullname.replaceAll(' ', '')}-FactSheet.pdf`;
    link.href = pdfDataUri;
    link.click();
  };

  const convertAuTo = (value: string, digits?: number): string => {
    // Display dist as different formats depending on unit selected
    let dist: string; // rawRow.dist is in au by default

    switch (distanceUnit) {
      case DistanceUnits.LD: // ld selected
        dist = auToLd(parseFloat(value)).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 5
        });
        break;
      case DistanceUnits.km: // km selected
        dist = auToKm(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      case DistanceUnits.au: // au selected
        dist = parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: digits ?? 5 });
        break;
      case DistanceUnits.mi: // mi selected
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
      case SizeUnits.m:
        size = (parseFloat(value) * 1000).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 0
        });
        break;
      case SizeUnits.ft:
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
      case SurfaceDistanceUnits.km:
        dist = (auToKm(parseFloat(value)) - earthMeanRadiusKm).toLocaleString('en-US', {
          maximumFractionDigits: 0
        });
        break;
      case SurfaceDistanceUnits.mi:
        dist = auToMi(parseFloat(value) - kmToAu(earthMeanRadiusKm)).toLocaleString('en-US', {
          maximumFractionDigits: 0
        });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return dist;
  };

  const incrementDistanceUnit = () => {
    setDistanceUnit((distanceUnit + 1) % DistanceUnits.__LENGTH);
  };

  const incrementSizeUnit = () => {
    setSizeUnit((sizeUnit + 1) % SizeUnits.__LENGTH);
  };

  const incrementSurfaceDistUnit = () => {
    setSurfaceDistance((surfaceDistance + 1) % SurfaceDistanceUnits.__LENGTH);
  };

  const getSSDUrlFromFullName = (fullName: string): string => {
    const baseUrl = 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '%20');
    }
  };

  const getMPCUrlFromFullName = (fullName: string): string => {
    const baseUrl = 'https://minorplanetcenter.net/db_search/show_object?object_id=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '+');
    }
  };

  const getCNEOSOrbitViewerURLFromFullNameAndDate = (fullName: string, date: Date): string => {
    let designation = '';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      designation = nameParts[0];
    } else {
      designation = fullName.replaceAll(' ', '%20');
    }

    const time = date.getTime();
    const jd = time / 86400000 + 2440587.5;
    const url = `https://cneos.jpl.nasa.gov/ca/ov/#load=&orientation=0,0,0,1&lookat=Earth&interval=2&eclipticgrid=false&eclipticaxis=false&distance=29919.57414&pitch=0&roll=0&yaw=0&scale=0.5&rotateX=-30.20870289631195&rotateY=38.134339235185024&desig=${designation}&cajd=${jd}&largeFont=true&`;
    return url;
  };

  const downloadDataAsCSV = (): void => {
    if(!rawRow) {
      return;
    }

    const rows: string[][] = [];
    for (const [key, value] of Object.entries(rawRow)) {
      const tempRow: string[] = [];

      if (key.includes('_size')) {
        tempRow.push((rawRowKeyNames as any)[key] + ` (${SizeUnits[sizeUnit]})`);
      } else if (key.includes('dist')) {
        tempRow.push((rawRowKeyNames as any)[key] + ` (${DistanceUnits[distanceUnit]})`);
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
                href={getCNEOSOrbitViewerURLFromFullNameAndDate(rawRow.fullname, rawRow.cd)}
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
            <div className={styles.linkContainer} onClick={downloadPdfFactSheet}>
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