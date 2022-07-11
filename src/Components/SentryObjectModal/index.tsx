import React, { useEffect, useState } from 'react';

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
import { Theme, withStyles } from '@material-ui/core';
import { kmToFt } from '../../Utils/conversionFormulae';

import { ISentryData } from '../../Models/apiData.model';

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

enum SizeUnits {
  m,
  ft,
  __LENGTH
}

interface ISentryDetailsData {
  energy: string;
  pdate: string;
  ts_max: string;
  ps_cum: string;
}

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;

  rawData: ISentryData['data'][0] | undefined;
}
export const SentryObjectModal = ({ isShown, setIsShown, rawData }: IProps) => {
  const classes = useStyles();

  // State
  const [sizeUnit, setSizeUnit] = useState<number>(SizeUnits.m);
  const [detailsData, setDetailsData] = useState<ISentryDetailsData>();

  useEffect(() => {
    if (!rawData) {
      return;
    }

    fetch(`https://ssd-api.jpl.nasa.gov/sentry.api?des=${rawData.des.replaceAll(' ', '%20')}`).then(
      async (res) => {
        setDetailsData((await res.json())['summary'] as ISentryDetailsData);
      }
    );
  }, [rawData]);

  if (!isShown || !rawData) {
    return null;
  }

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

  const incrementSizeUnit = () => {
    setSizeUnit((sizeUnit + 1) % SizeUnits.__LENGTH);
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

  const getSentryURLFromFullName = (fullName: string): string => {
    const baseUrl = 'https://cneos.jpl.nasa.gov/sentry/details.html#?des=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '%20');
    }
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
          title={rawData.fullname}
          //link={getSSDUrlFromFullName(rawRow.fullname)}
          tooltip={'Detailed data for ' + rawData.fullname}
          icon={() => <FontAwesomeIcon icon={faTable} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
          <div className={classes.rowContainer}>
            {/** LINK TO MPC SITE */}
            <div className={classes.linkContainer}>
              <a
                href={getSentryURLFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
                className={classes.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Sentry
              </a>
            </div>

            {/** LINK TO SBDB SITE */}
            <div className={classes.linkContainer}>
              <a
                href={getSSDUrlFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
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
                href={
                  getSSDUrlFromFullName(rawData.fullname.replaceAll('(', '').replaceAll(')', '')) +
                  '&view=VOP'
                }
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
                href={getMPCUrlFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
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
          </div>

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
                  title={`Size (${SizeUnits[sizeUnit]})`}
                  cellOneData={convertKmTo(rawData.diameter)}
                  onClick={incrementSizeUnit}
                />
                {!!detailsData && (
                  <TableRowWithCells title="Date" cellOneData={detailsData.pdate} />
                )}

                <TableRowWithCells title="ip" cellOneData={rawData.ip} />
                <TableRowWithCells title="n_imp" cellOneData={rawData.n_imp} />
                <TableRowWithCells title="H (mag)" cellOneData={rawData.h} />

                {!!detailsData && (
                  <>
                    <TableRowWithCells title="Energy" cellOneData={detailsData.energy} />
                    <TableRowWithCells title="ts_max" cellOneData={detailsData.ts_max} />
                    <TableRowWithCells title="ps_cum" cellOneData={detailsData.ps_cum} />
                  </>
                )}

                {/* <TableRowWithCells
                  title="V-rel (km/s)"
                  cellOneData={parseFloat(rawData.v_rel).toLocaleString('en-US', {
                    maximumFractionDigits: 5
                  })}
                /> */}

                <TableRowWithCells
                  title="V-inf (km/s)"
                  cellOneData={parseFloat(rawData.v_inf).toLocaleString('en-US', {
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
