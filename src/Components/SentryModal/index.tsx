import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShieldAlt, faColumns } from '@fortawesome/free-solid-svg-icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TitledCell } from '../TitledCell';

import { useStyles } from './styles';
import { Theme, withStyles } from '@material-ui/core';
import { ISentryData } from '../../Models/apiData.model';
import { ObjectModal } from '../ObjectModal';
import { IRawRow } from '../TableCAD';
import { SentryObjectModal } from '../SentryObjectModal';

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

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
  sentryData: ISentryData;
}
export const SentryModal = ({ isShown, setIsShown, sentryData }: IProps) => {
  const classes = useStyles();

  const [parsedSentryData, setParsedSentryData] = useState<ISentryData['data']>([]);

  const [isObjectModalShown, setIsObjectModalShown] = useState(false);
  const [selectedRawData, setSelectedRawData] = useState<ISentryData['data'][0] | undefined>();

  useEffect(() => {
    const parsedData = sentryData.data.filter((i) => {
      return parseInt(i.ts_max || '0') > 0;
    });

    setParsedSentryData(parsedData);
  }, [sentryData]);

  const onClickSentryObject = (data: ISentryData['data'][0]) => {
    console.log('i have been clicked');
    setSelectedRawData(data);
    setIsObjectModalShown(true);
  };

  if (!isShown) {
    return null;
  }

  const cellPadding = `5px 5px 3px 3px`;
  const cellFont = ''; // "'Roboto Mono', monospace";

  if (parsedSentryData.length === 0) {
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
            title="Sentry Objects"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Visit sentry page"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={true}
            isHeightAuto={true}
          >
            No objects to display.
          </TitledCell>
        </div>
      </div>
    );
  }

  return (
    <>
      <SentryObjectModal
        isShown={isObjectModalShown}
        setIsShown={setIsObjectModalShown}
        rawData={selectedRawData}
      />

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
            title="Sentry Objects"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Visit sentry page"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
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
                      Name
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parsedSentryData &&
                    parsedSentryData.map((row, ind) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={ind}
                          onClick={() => {
                            onClickSentryObject(row);
                          }}
                        >
                          <StyledTableCell
                            key={row.id}
                            align="left"
                            style={{
                              cursor: 'pointer',
                              fontFamily: cellFont,
                              padding: cellPadding
                            }}
                          >
                            {row.fullname}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </TitledCell>
        </div>
      </div>
    </>
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
