import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles';
import { ICadData } from '../../Models/apiData.model';
import { cadFieldIndices, au2ld } from '../../Utils/constants';
import { withStyles, Theme } from '@material-ui/core';
import { apiDateStringToJsDate } from '../../Utils/apiDateStringToJsDate';

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

const columns = [
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
    label: 'CA Distance Nominal (LD|AU)',
    minWidth: 170,
    align: 'left',
    format: formatDist
  },
  {
    id: 'dist_min',
    label: 'CA Distance Mininum (LD|AU)',
    minWidth: 170,
    align: 'left',
    format: formatDist
  },
  {
    id: 'v_rel',
    label: 'V Relative (km/s)',
    minWidth: 120,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(2)
  },
  {
    id: 'v_inf',
    label: 'V Infinity (km/s)',
    minWidth: 120,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(2)
  },
  {
    id: 'h',
    label: 'H (mag)',
    minWidth: 100,
    align: 'left',
    format: (value: string) => parseFloat(value).toFixed(1)
  }
  ///////////////////////////////////////
  // Not-displayed
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

  //   format: (value: string) => value
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
  // }
];

interface IProps {
  cadData: ICadData;
  period: 'recent' | 'future';
}

export const TableCAD = ({ cadData, period }: IProps) => {
  // -------------------------------------------------->>>

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // We fetch data at once for both recent and future, which means
  // we have to separate out items here into their respective tables
  const displayData = cadData.data.filter((datumArr: (string | null)[]) => {
    // Filter out CA's that aren't in the designated period
    const dateIsStringOrNull = datumArr[cadFieldIndices.cd];
    if (!dateIsStringOrNull) return false;
    const dateFromData = apiDateStringToJsDate(dateIsStringOrNull);
    const dDays = +new Date() - +dateFromData;
    return period === 'future' ? dDays < 0 : dDays >= 0;
  });

  const rows = displayData.map((datumArr: (string | null)[]) => {
    return {
      fullname: datumArr[cadFieldIndices.fullname],
      des: datumArr[cadFieldIndices.des],
      orbit_id: datumArr[cadFieldIndices.orbit_id],
      jd: datumArr[cadFieldIndices.jd],
      cd: datumArr[cadFieldIndices.cd],
      dist: datumArr[cadFieldIndices.dist],
      dist_min: datumArr[cadFieldIndices.dist_min],
      dist_max: datumArr[cadFieldIndices.dist_max],
      v_rel: datumArr[cadFieldIndices.v_rel],
      v_inf: datumArr[cadFieldIndices.v_inf],
      t_sigma_f: datumArr[cadFieldIndices.t_sigma_f],
      h: datumArr[cadFieldIndices.h]
    };
  });

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
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, ind) => {
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
          Total: {rows.length}
        </div>
      </div>
    </>
  );
};

function formatDist(value: string) {
  const distAU = parseFloat(value);
  const distLD = distAU * au2ld;
  const displayValue = `${distLD.toFixed(2)} | ${distAU.toFixed(5)}`;
  return displayValue;
}
