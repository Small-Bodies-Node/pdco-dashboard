import React, { useEffect, useRef, useState } from 'react';

import { withStyles, Theme, Tooltip, Zoom } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles';
import { ICadData } from '../../Models/apiData.model';
import { cadFieldIndices, secsInDay } from '../../Utils/constants';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';
import { useContainerDimensions } from '../../Hooks/useContainerDimensions';
import { getDisplayRows } from '../../Utils/getDisplayRows';

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

interface ICol {
  id: keyof typeof cadFieldIndices;
  label: string;
  label_tooltip: string;
  minWidth?: number;
  maxWidth?: number;
  align: 'left';
  format: (value: string) => string;
  formatWithSigma?: (value: string, sigma: string) => string;
  colClickHandler?: () => void;
}

export interface IRawRow {
  fullname: string;
  cd: Date;
  dist: string;
  h: string;
  size: string;
  sigma: string;
}

export interface IDisplayRow extends Omit<IRawRow, 'cd'> {
  cd: string;
  //
  fullname_tooltip: string;
  cd_tooltip: string;
  dist_tooltip: string;
  h_tooltip: string;
  size_tooltip: string;
}

export type TDistUnit = 0 | 1 | 2 | 3;
export type TSizeUnit = 0 | 1;

interface IProps {
  cadData: ICadData;
  dateAtDataFetch: string;
  period: 'recent' | 'future';
  isHeightAuto?: boolean;
}

/**
 * Component to take Close-Approach data (CAD) and draw a table
 * Each CAD entry is organized as an array of type (string|null)[]
 * So you need to test each entry for null, and convert the string to type number.
 * To make it easier to index on these arrays, I have created the object
 * 'cadFieldIndices'
 */
export const TableCAD = ({ cadData, dateAtDataFetch, period, isHeightAuto }: IProps) => {
  // -------------------------------------------------->>>

  // State
  const classes = useStyles(!!isHeightAuto)();
  const [distUnit, setDistUnit] = useState<0 | 1 | 2 | 3>(0); // 0: 'ld', 1: 'km', 2: 'au', 3: 'mi'
  const [sizeUnit, setSizeUnit] = useState<0 | 1>(0); // 0: 'm', 1: 'ft'
  const [rawRows, setRawRows] = useState<IRawRow[]>();
  const [displayRows, setDisplayRows] = useState<IDisplayRow[]>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(containerRef);

  // Define columns for our table
  const columns = getCols(distUnit, sizeUnit);

  // Set stateful click handlers on certain columns
  columns.forEach((col) => {
    if (col.id === 'dist') {
      col.colClickHandler = () => setDistUnit((prev) => ((prev + 1) % 4) as TDistUnit);
    }
    if (col.id === 'size') {
      col.colClickHandler = () => setSizeUnit((prev) => ((prev + 1) % 2) as TSizeUnit);
    }
  });

  // Whenever the API data changes, we need to re-filter it
  useEffect(() => {
    // --------->>>

    // Extract arrays of cad data and filter into 'recent' | 'future' categories
    const filteredDataArrays = cadData.data.filter((datumArr: (string | null)[]) => {
      // Logic to remove any datumArr's with  any null entries in our displayed cols
      const colIds = columns.map((col) => col.id);
      const colDatumEntries = datumArr.reduce<string[]>((acc, el, ind) => {
        const indicesOfDisplayedCols = colIds.map((colId) => cadFieldIndices[colId]);
        return !!el && indicesOfDisplayedCols.includes(ind) ? [...acc, el] : acc;
      }, []);
      if (!colDatumEntries.every(Boolean)) return false;

      // Logic to filter out entries NOT in this table's 'period' defn
      const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
      if (!dateIsStringOrNull) return false;
      const dateFromData = apiDateStringToJsDate(dateIsStringOrNull);
      const dDays = (+new Date(dateAtDataFetch) - +dateFromData) / (secsInDay * 1000); // dMillSecs => Days
      return period === 'recent' ? 0 <= dDays && dDays <= 7 : dDays <= 0;
    });

    const newRawRows = filteredDataArrays.map(
      (datumArr: (string | null)[]): IRawRow => {
        const name = datumArr[cadFieldIndices.fullname]!.replaceAll(/\(|\)/g, '').trim();
        return {
          fullname: name,
          cd: apiDateStringToJsDate(datumArr[cadFieldIndices.cd]!),
          dist: datumArr[cadFieldIndices.dist]!,
          h: datumArr[cadFieldIndices.h]!,
          size: datumArr[cadFieldIndices.diameter]!,
          sigma: datumArr[cadFieldIndices.diameter_sigma]!
        };
      }
    );
    setRawRows(newRawRows);
  }, [cadData]);

  /**
   * Update the displayed version of the data; we make this a separate effect
   * from the previous one that sets rawRows because the UI lets the user toggle
   * between displayed units, and we don't want to recompute filterings on each click
   */
  useEffect(() => {
    // --------->>>

    // Map raw-data rows to displayable text for table cells and tooltips
    const newDisplayRows = getDisplayRows(rawRows, width, sizeUnit, distUnit);
    setDisplayRows(newDisplayRows);
  }, [rawRows, distUnit, sizeUnit, width]);

  const cellPadding = `5px 5px 3px 3px`;
  const cellFont = ''; // "'Roboto Mono', monospace";

  return (
    <>
      <div className={classes.container} ref={containerRef}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    width={50}
                    key={column.id}
                    align={column.align as any}
                    style={{
                      cursor: 'pointer',
                      fontFamily: cellFont,
                      padding: cellPadding,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth
                    }}
                    onClick={column.colClickHandler}
                  >
                    <Tooltip
                      title={column.label_tooltip}
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      classes={{ tooltip: classes.noMaxWidth }}
                    >
                      <span
                        style={{
                          // whiteSpace: 'nowrap',
                          display: 'inline-block',
                          overflow: 'hidden'
                        }}
                      >
                        {column.label}
                      </span>
                    </Tooltip>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayRows &&
                displayRows.map((row, ind) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={ind}>
                      {columns.map((column) => {
                        const value = (row as any)[column.id];
                        const tooltip = (row as any)[column.id + '_tooltip'];
                        return (
                          <StyledTableCell
                            key={column.id}
                            align={(column.align || 'left') as any}
                            style={{
                              cursor: 'pointer',
                              fontFamily: cellFont,
                              padding: cellPadding,
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth
                            }}
                          >
                            <Tooltip
                              title={tooltip}
                              placement="top"
                              TransitionComponent={Zoom}
                              arrow
                              classes={{ tooltip: classes.noMaxWidth }}
                            >
                              <span
                                style={{
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                  overflow: 'hidden'
                                }}
                              >
                                {column.id === 'size' && (value === '0' || value == 'NaN')
                                  ? '-'
                                  : column.id === 'size' && parseInt(row.sigma) != 0
                                  ? column.formatWithSigma &&
                                    column.formatWithSigma(value, row.sigma)
                                  : column.format(value)}
                              </span>
                            </Tooltip>
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.total}>Total: {displayRows ? displayRows.length : -1}</div>
      </div>
    </>
  );
};

const getCols: (distUnit: TDistUnit, sizeUnit: TDistUnit) => ICol[] = (
  distUnit: TDistUnit,
  sizeUnit: TDistUnit
) => [
  ///////////////////////////////////////
  // Displayed Cols
  ///////////////////////////////////////
  {
    id: 'fullname',
    label: 'Object',
    label_tooltip: 'Name of comet or asteroid',
    minWidth: 90,
    maxWidth: 90,
    align: 'left',
    format: (value: string) => value
  },
  {
    id: 'cd',
    label: 'Date',
    label_tooltip: 'Date of closest approach',
    minWidth: 0,
    align: 'left',
    format: (value: string) => value
  },
  {
    id: 'dist',
    label: `Dist (${!distUnit ? 'ld' : distUnit === 1 ? 'km' : distUnit === 2 ? 'au' : 'mi'})`,
    label_tooltip: 'Close Approach nominal distance',
    minWidth: 0,
    align: 'left',
    format: (value: string) =>
      !distUnit
        ? (Math.round(parseFloat(value) * 100) / 100).toString()
        : distUnit === 3
        ? Math.round(parseFloat(value)).toLocaleString('en-us')
        : value
  },
  {
    id: 'size',
    label: `Size (${!sizeUnit ? 'm' : 'ft'})`,
    label_tooltip: 'Diameter derived from H with assumed albedo 0.114',
    minWidth: 0,
    align: 'left',
    format: (value: string) => value,
    formatWithSigma: (value: string, sigma: string) =>
      `${Math.round(parseFloat(value) - parseFloat(sigma))} -  ${Math.round(
        parseFloat(value) + parseFloat(sigma)
      )}`
  },
  {
    id: 'h',
    label: 'H (mag)',
    label_tooltip: 'Absolute magnitude',
    minWidth: 0,
    align: 'left',
    format: (value: string) => value
  }

  ///////////////////////////////////////
  // Non-Displayed Cols
  ///////////////////////////////////////

  // {
  //   id: 'des',
  //   label: 'Designation',
  //   minWidth: 170,
  //   format: (value: string) => value
  // },
  // {
  //   id: 'orbit_id',
  //   label: 'Orbit ID',
  //   minWidth: 100,
  // },
  // {
  //   id: 'jd',
  //   label: 'JD Ephemeris Time',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: string) => value
  // },
  // {
  //   id: 'dist_max',
  //   label: 'Max Approach Distance',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: string) => value
  // },
  // {
  //   id: 'dist_min',
  //   label: 'CA Distance Mininum (LD|AU)',
  //   minWidth: 170,
  //   align: 'left',
  //   format: formatDist
  // },
  // {
  //   id: 't_sigma_f',
  //   label: '3-Sigma Uncertainty',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: string) => value
  // },
  // {
  //   id: 'body',
  //   label: 'Name of Body',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: string) => value
  // },
  // {
  //   id: 'v_rel',
  //   label: 'V Relative (km/s)',
  //   minWidth: 120,
  //   align: 'left',
  //   format: (value: string) => parseFloat(value).toFixed(2)
  // },
  // {
  //   id: 'v_inf',
  //   label: 'V Infinity (km/s)',
  //   minWidth: 120,
  //   align: 'left',
  //   format: (value: string) => parseFloat(value).toFixed(2)
  // },
];

const getAbbreviatedName = (name: string, componentWidth: number) => {
  // ----------------------------------------------------->>>

  // Perform some screen-responsive calcs
  // Following numbers determined empirically
  let maxNameLength = 16;
  if (componentWidth <= 700) maxNameLength = 14;
  if (componentWidth <= 570) maxNameLength = 12;
  if (componentWidth <= 520) maxNameLength = 10;
  if (componentWidth <= 490) maxNameLength = 8;
  if (componentWidth <= 410) maxNameLength = 6;

  const nameLength = name.length;
  if (nameLength <= maxNameLength + 0) return name;
  if (nameLength <= maxNameLength + 1) return name.substring(0, maxNameLength + 1) + '';
  if (nameLength <= maxNameLength + 2) return name.substring(0, maxNameLength + 2) + '';
  if (nameLength <= maxNameLength + 3) return name.substring(0, maxNameLength + 3) + '';
  if (nameLength <= maxNameLength + 4) return name.substring(0, maxNameLength + 4) + '';
  if (nameLength <= maxNameLength + 5) return name.substring(0, maxNameLength + 5) + '';
  if (nameLength <= maxNameLength + 6) return name.substring(0, maxNameLength + 3) + '...';
  return name.substring(0, maxNameLength + 3) + '...';
};

/* console.log(getAbbreviatedName('abcdefghijklmnopqrs'));
console.log(getAbbreviatedName('abcdefghijklmnopqr'));
console.log(getAbbreviatedName('abcdefghijklmnopq'));
console.log(getAbbreviatedName('abcdefghijklmnop'));
console.log(getAbbreviatedName('abcdefghijklmno'));
console.log(getAbbreviatedName('abcdefghijklmn'));
console.log(getAbbreviatedName('abcdefghijklm'));
console.log(getAbbreviatedName('abcdefghijkl'));
console.log(getAbbreviatedName('abcdefghijk'));
console.log(getAbbreviatedName('abcdefghij'));
console.log(getAbbreviatedName('abcdefghi'));
console.log(getAbbreviatedName('abcdefgh'));
console.log(getAbbreviatedName('abcdefg')); */
