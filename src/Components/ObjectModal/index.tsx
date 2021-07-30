import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTable, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TitledCell } from '../TitledCell';

import { useStyles } from './styles';
import { IRawRow } from '../TableCAD/index';
import { Theme, withStyles } from '@material-ui/core';
import { auToKm, auToLd, auToMi, kmToAu, kmToFt } from '../../Utils/conversionFormulae';
import { earthMeanRadiusKm } from '../../Utils/constants';

import { PDFDocument } from 'pdf-lib';

// See: https://material-ui.com/components/tables/#CustomizedTables.tsx
const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: `#181b2e`,
    color: theme.palette.common.white
  },
  body: {
    backgroundColor: `rgba(255,255,255,0.05)`,
    fontSize: 14
  }
}))(TableCell);

type IRawRowKeyNames = Omit<IRawRow, 'cd'> & { cd: string };
const rawRowKeyNames: IRawRowKeyNames = {
  fullname: 'Name',
  cd: 'Close Approach Date/Time',
  cd_sigma: 'Close Approach Date/Time Uncertainty',
  dist: 'Nominal Distance',
  h: 'H (mag)',
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
export const ObjectModal = ({ isShown, setIsShown, rawRow }: IProps) => {
  const classes = useStyles();

  const downloadPdfFactSheet = async () => {
    const res = await fetch(process.env.PUBLIC_URL + '/CloseApproachFactSheetForm.pdf');
    const buffer = await res.arrayBuffer();

    const doc = await PDFDocument.load(buffer);
    const form = doc.getForm();

    // Fill in form fields
    form.getTextField('Name').setText(`Close Approach Fact Sheet - ${rawRow?.fullname}`);
    form.getTextField('Date').setText(`Will pass by Earth on: ${rawRow?.cd.toUTCString()}`);
    rawRow?.min_distance &&
      form
        .getTextField('Distance')
        .setText(
          `At a minimum distance of: ${auToLd(
            parseFloat(rawRow.min_distance)
          ).toLocaleString('en-US', { maximumFractionDigits: 4 })} ld (${auToKm(
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

  // State
  const [distanceUnit, setDistanceUnit] = useState<number>(DistanceUnits.LD);
  const [sizeUnit, setSizeUnit] = useState<number>(SizeUnits.m);
  const [surfaceDistance, setSurfaceDistance] = useState<number>(SurfaceDistanceUnits.km);

  if (!isShown || !rawRow) {
    return null;
  }

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
    const baseUrl = 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=';
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

  const downloadDataAsCSV = (): void => {
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
    link.setAttribute('download', `${rawRow.fullname.replaceAll(' ', '+')}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={classes.backgroundContainer} onClick={() => setIsShown(false)}>
      <div className={classes.mainContentContainer} onClick={(e) => e.stopPropagation()}>
        <div className={classes.closeButtonContainer}>
          <FontAwesomeIcon
            className={classes.closeButton}
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
          <div className={classes.rowContainer}>
            {/** LINK TO SBDB SITE */}
            <div className={classes.linkContainer}>
              <a
                href={getSSDUrlFromFullName(rawRow.fullname)}
                className={classes.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View SBDB Data
              </a>
            </div>

            {/** LINK TO SBDB SITE WITH ORBIT DIAGRAM */}
            <div className={classes.linkContainer}>
              <a
                href={getSSDUrlFromFullName(rawRow.fullname) + ';orb=1;cov=0;log=0;cad=0#orb'}
                className={classes.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Orbit Diagram
              </a>
            </div>

            {/** LINK TO MPC SITE */}
            <div className={classes.linkContainer}>
              <a
                href={getMPCUrlFromFullName(rawRow.fullname)}
                className={classes.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on MPC
              </a>
            </div>

            {/** LINK TO CNEOS CA PAGE */}
            <div className={classes.linkContainer}>
              <a
                href="https://cneos.jpl.nasa.gov/ca/"
                className={classes.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CNEOS CA
              </a>
            </div>

            {/** BUTTON TO DOWNLOAD AS CSV */}
            <div className={classes.linkContainer} onClick={downloadDataAsCSV}>
              <FontAwesomeIcon icon={faDownload} size="sm" />

              <p style={{ marginLeft: '9px' }}>CSV</p>
            </div>

            {/** BUTTON TO DOWNLOAD AS PDF
            <div className={classes.linkContainer} onClick={downloadPdfFactSheet}>
              <FontAwesomeIcon icon={faDownload} size="sm" />

              <p style={{ marginLeft: '9px' }}>PDF (Fact Sheet)</p>
            </div>*/}
          </div>

          {/** DISTANCE & SIZE TABLE */}
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              size="small"
              aria-label="sticky table"
              style={{ tableLayout: 'auto' }}
            >
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>

              <TableHead>
                <TableRowWithCells
                  title="Data Point"
                  cellOneData="Nominal"
                  cellTwoData="Minimum"
                  cellThreeData="Maximum"
                />
              </TableHead>

              <TableBody>
                <TableRowWithCells
                  title={`Distance (${DistanceUnits[distanceUnit]})`}
                  cellOneData={convertAuTo(rawRow.dist)}
                  cellTwoData={convertAuTo(rawRow.min_distance)}
                  cellThreeData={convertAuTo(rawRow.max_distance)}
                  onClick={incrementDistanceUnit}
                />

                <TableRowWithCells
                  title={`Size (${SizeUnits[sizeUnit]})`}
                  // Shows sizes from API (nominal, min, and max sizes)
                  cellOneData={convertKmTo(rawRow.nominal_size)}
                  cellTwoData={convertKmTo(rawRow.minimum_size)}
                  cellThreeData={convertKmTo(rawRow.maximum_size)}
                  onClick={incrementSizeUnit}
                />

                <TableRowWithCells
                  title={
                    <span>
                      Distance - R<sub>E</sub> ({SurfaceDistanceUnits[surfaceDistance]})
                    </span>
                  }
                  // Shows size from API (nominal size) or just size (which is calculated)
                  // With Earth radius subtracted
                  cellOneData={convertSurfaceDistanceAu(rawRow.dist)}
                  cellTwoData={convertSurfaceDistanceAu(rawRow.min_distance)}
                  cellThreeData={convertSurfaceDistanceAu(rawRow.max_distance)}
                  onClick={incrementSurfaceDistUnit}
                />
              </TableBody>
            </Table>
          </TableContainer>

          {/** OTHER VALUES TABLE */}
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              size="small"
              aria-label="sticky table"
              style={{ tableLayout: 'auto' }}
            >
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '75%' }} />
              </colgroup>

              <TableHead>
                <TableRowWithCells title="Data Point" cellOneData="Value" />
              </TableHead>

              <TableBody>
                <TableRowWithCells
                  title="Close Approach Date"
                  cellOneData={`${rawRow.cd.toUTCString()} ± ${rawRow.cd_sigma}`}
                />

                <TableRowWithCells title="H (mag)" cellOneData={rawRow.h} />

                <TableRowWithCells
                  title="V-rel (km/s)"
                  cellOneData={parseFloat(rawRow.v_rel).toLocaleString('en-US', {
                    maximumFractionDigits: 5
                  })}
                />

                <TableRowWithCells
                  title="V-inf (km/s)"
                  cellOneData={parseFloat(rawRow.v_inf).toLocaleString('en-US', {
                    maximumFractionDigits: 5
                  })}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </TitledCell>
      </div>
    </div>
  );
};

// const TableRowWithCells = ({
//   title,
//   data,
//   onClick
// }: {
//   title: string;
//   data: string;
//   onClick?: () => void;
// }) => {
//   const cellPadding = `5px 5px 3px 3px`;
//   const cellFont = ''; // "'Roboto Mono', monospace";

//   return (
//     <TableRow hover role="checkbox" tabIndex={-1} onClick={onClick}>
//       <StyledTableCell
//         align="left"
//         style={{
//           cursor: 'pointer',
//           fontFamily: cellFont,
//           padding: cellPadding
//         }}
//       >
//         {title}
//       </StyledTableCell>

//       <StyledTableCell
//         align="left"
//         style={{
//           cursor: 'pointer',
//           fontFamily: cellFont,
//           padding: cellPadding
//         }}
//       >
//         {data}
//       </StyledTableCell>
//     </TableRow>
//   );
// };

const TableRowWithCells = ({
  title,
  cellOneData,
  cellTwoData,
  cellThreeData,
  onClick
}: {
  title: string | JSX.Element;
  cellOneData: string;
  cellTwoData?: string;
  cellThreeData?: string;
  onClick?: () => void;
}) => {
  const cellPadding = `5px 5px 3px 3px`;
  const cellFont = ''; // "'Roboto Mono', monospace";

  return (
    <TableRow hover role="checkbox" tabIndex={-1} onClick={onClick}>
      <StyledTableCell
        align="left"
        style={{
          cursor: 'pointer',
          fontFamily: cellFont,
          padding: cellPadding
        }}
      >
        {title}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        style={{
          cursor: 'pointer',
          fontFamily: cellFont,
          padding: cellPadding
        }}
      >
        {cellOneData}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        style={{
          cursor: 'pointer',
          fontFamily: cellFont,
          padding: cellPadding
        }}
      >
        {cellTwoData}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        style={{
          cursor: 'pointer',
          fontFamily: cellFont,
          padding: cellPadding
        }}
      >
        {cellThreeData}
      </StyledTableCell>
    </TableRow>
  );
};
