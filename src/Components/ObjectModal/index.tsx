import React, { useEffect, useRef, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTable } from '@fortawesome/free-solid-svg-icons';

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
import { auToKm, auToLd, auToMi } from '../../Utils/conversionFormulae';

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

// Types for distance (values will count up from 0)
enum DistanceUnits {
  ld,
  km,
  au,
  mi
}

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;

  rawRow: IRawRow | undefined;
}
export const ObjectModal = ({ isShown, setIsShown, rawRow }: IProps) => {
  const classes = useStyles();

  // State
  const [distanceUnit, setDistanceUnit] = useState<number>(DistanceUnits.ld);

  if (!isShown || !rawRow) {
    return null;
  }

  const cellPadding = `5px 5px 3px 3px`;
  const cellFont = ''; // "'Roboto Mono', monospace";

  const convertAuTo = (value: string): string => {
    // Display dist as different formats depending on unit selected
    let dist: string; // rawRow.dist is in au by default

    switch (distanceUnit) {
      case DistanceUnits.ld: // ld selected
        dist = auToLd(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 5 });
        break;
      case DistanceUnits.km: // km selected
        dist = auToKm(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      case DistanceUnits.au: // au selected
        dist = parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 5 });
        break;
      case DistanceUnits.mi: // mi selected
        dist = auToMi(parseFloat(value)).toLocaleString('en-US', { maximumFractionDigits: 0 });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return dist;
  };

  const incrementDistanceUnit = () => {
    setDistanceUnit((distanceUnit + 1) % 4);
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
          title={`${rawRow.fullname} DETAILED DATA`}
          //link="https://cneos.jpl.nasa.gov/ca/"
          tooltip={'Detailed data for ' + rawRow.fullname}
          icon={() => <FontAwesomeIcon icon={faTable} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    width={50}
                    align="left"
                    style={{
                      cursor: 'pointer',
                      fontFamily: cellFont,
                      padding: cellPadding
                    }}
                  >
                    Data Point
                  </StyledTableCell>

                  <StyledTableCell
                    width={50}
                    align="left"
                    style={{
                      cursor: 'pointer',
                      fontFamily: cellFont,
                      padding: cellPadding
                    }}
                  >
                    Value
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRowWithCells
                  title={`Nominal Distance (${DistanceUnits[distanceUnit]})`}
                  data={convertAuTo(rawRow.dist)}
                  onClick={incrementDistanceUnit}
                />
                <TableRowWithCells
                  title={`Minimum Distance (${DistanceUnits[distanceUnit]})`}
                  data={convertAuTo(rawRow.min_distance)}
                  onClick={incrementDistanceUnit}
                />
                <TableRowWithCells
                  title={`Maximum Distance (${DistanceUnits[distanceUnit]})`}
                  data={convertAuTo(rawRow.max_distance)}
                  onClick={incrementDistanceUnit}
                />

                <TableRowWithCells
                  title="Minimum Size (m)"
                  data={(parseFloat(rawRow.size) - parseFloat(rawRow.sigma)).toFixed(3)}
                />
                <TableRowWithCells
                  title="Maximum Size (m)"
                  data={(parseFloat(rawRow.size) + parseFloat(rawRow.sigma)).toFixed(3)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </TitledCell>
      </div>
    </div>
  );
};

const TableRowWithCells = ({
  title,
  data,
  onClick
}: {
  title: string;
  data: string;
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
        {data}
      </StyledTableCell>
    </TableRow>
  );
};
