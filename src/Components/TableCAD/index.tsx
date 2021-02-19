import React, { useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles';
import { ICadData } from '../../Models/apiData.model';
import { cadFieldIndices, secsInDay } from '../../Utils/constants';
import { withStyles, Theme } from '@material-ui/core';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';
import { auToKm, auToLd, kmToAu, kmToLd } from '../../Utils/conversionFormulae';

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
  minWidth: number;
  align: 'left';
  format: (value: string) => string;
}
type TDistUnit = 0 | 1 | 2;

const getCols: (distUnit: TDistUnit) => ICol[] = (distUnit: TDistUnit) => [
  ///////////////////////////////////////
  // Displayed Cols
  ///////////////////////////////////////
  {
    id: 'fullname',
    label: 'Object',
    minWidth: 130,
    align: 'left',
    format: (value: string) => value
  },
  {
    id: 'cd',
    label: 'Close Approach Date',
    minWidth: 190,
    align: 'left',
    format: (value: string) => value
  },
  {
    id: 'dist',
    label: `CA Distance (${!distUnit ? 'km' : distUnit === 1 ? 'ld' : 'au'})`,
    minWidth: 170,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(5)
  },
  {
    id: 'size',
    label: `Size (${!distUnit ? 'km' : distUnit === 1 ? 'ld' : 'au'})`,
    minWidth: 120,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(5)
  },
  {
    id: 'h',
    label: 'H (mag)',
    minWidth: 100,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(1)
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

interface IRow {
  fullname: string;
  cd: string;
  dist: number;
  h: number;
  size: number;
}
interface IProps {
  cadData: ICadData;
  period: 'recent' | 'future';
}

/**
 * Component to take CAD data and draw a table
 * CAD data is organized into one array of type (string|null)[] for each NEO
 * So you need to test each entry for null, and convert the string to type number.
 * To make it easier to index on these arrays, I have created the object
 * 'cadFieldIndices'
 */
export const TableCAD = ({ cadData, period }: IProps) => {
  // -------------------------------------------------->>>

  // Track clicks on column-title cells to toggle between units
  const [distUnit, setDistUnit] = useState<0 | 1 | 2>(0); // 0: 'km', 1: 'ld', 2: 'au'
  const [rawRows, setRawRows] = useState<IRow[]>();
  const [displayedRows, setDisplayedRows] = useState<IRow[]>();

  const columns = getCols(distUnit);

  useEffect(() => {
    // --------->>>

    // Filter data into 'recent' | 'future' categories;
    const filteredData = cadData.data.filter((datumArr: (string | null)[]) => {
      // --------->>>

      // Remove any datumArr's with null entries in our displayed cols
      const colHeaderIds = columns.map((col) => col.id);
      const colDatumEntries = datumArr.reduce<string[]>((acc, el, ind, arr) => {
        const indicesOfDisplayedCols = colHeaderIds.map(
          (colHeaderId) => cadFieldIndices[colHeaderId]
        );
        return !!el && indicesOfDisplayedCols.includes(ind) ? [...acc, el] : acc;
      }, []);
      if (!colDatumEntries.every(Boolean)) return false;

      const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
      if (!dateIsStringOrNull) return false;
      const dateFromData = apiDateStringToJsDate(dateIsStringOrNull);
      const dDays = (+new Date() - +dateFromData) / (secsInDay * 1000); // dMillSecs => Days
      return period === 'recent' ? 0 <= dDays && dDays <= 7 : dDays <= 0;
    });

    const filteredDataRows = filteredData.map(
      (datumArr: (string | null)[]): IRow => {
        return {
          fullname: datumArr[cadFieldIndices.fullname]!,
          cd: datumArr[cadFieldIndices.cd]!,
          dist: parseFloat(datumArr[cadFieldIndices.dist]!),
          h: parseFloat(datumArr[cadFieldIndices.h]!),
          size: parseFloat(datumArr[cadFieldIndices.size]!)
        };
      }
    );
    setRawRows(filteredDataRows);
  }, [cadData]);

  console.log('Debug 0');

  // Map display data to rows
  useEffect(() => {
    console.log('???');
    const newDisplayedRows = rawRows?.map(
      (rawRow): IRow => {
        // ----------->>>

        let size = rawRow.size; // km by default
        let dist = rawRow.dist; // au by default

        // If km selected
        if (distUnit === 0) {
          size = size;
          dist = auToLd(auToKm(dist));
        }
        // If ld selected
        if (distUnit === 1) {
          size = kmToLd(size);
          dist = auToLd(dist);
        }
        // If au selected
        if (distUnit === 2) {
          size = kmToAu(size);
          dist = dist;
        }
        console.log('distUnit', size);
        return { ...rawRow, dist, size };
      }
    );
    setDisplayedRows(newDisplayedRows);
  }, [rawRows, distUnit]);

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align as any}
                    style={{
                      //
                      minWidth: column.minWidth
                    }}
                    onClick={() => setDistUnit((prev) => ((prev + 1) % 3) as 0 | 1 | 2)}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows &&
                displayedRows.map((row, ind) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={ind}>
                      {columns.map((column) => {
                        const value = (row as any)[column.id];
                        return (
                          <StyledTableCell key={column.id} align={(column.align || 'left') as any}>
                            {column.format(value)}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            textAlign: 'start',
            padding: 20
          }}
        >
          Total: {displayedRows ? displayedRows.length : -1}
        </div>
      </div>
    </>
  );
};

function formatDist(value: string) {
  const distAU = parseFloat(value);
  const distLD = auToLd(distAU);
  const displayValue = `${distLD.toFixed(2)} | ${distAU.toFixed(5)}`;
  return displayValue;
}
