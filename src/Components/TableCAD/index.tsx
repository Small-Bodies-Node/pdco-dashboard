import { useEffect, useRef, useState } from "react";
import * as numeralWithDefault from 'numeral';

import { useContainerDimensions } from "../../hooks/useContainerDimensions";
import { ICadData } from "../../models/ICadData";
import { IFilterSortData } from "../../models/IFilterSortData";
import { apiDateStringToJsDate } from "../../utils/apiDateStringToJsDate";
import { cadFieldIndices, secsInDay } from "../../utils/constants";
import { auToKm, auToLd, auToMi, kmToFt, kmToLd, magToSizeKm } from "../../utils/conversionFormulae";
import styles from "./styles.module.scss";
import Table from "../Table";
import { TTableHeadElements } from "../../models/TTableHeadElements";
import { TTableBodyElements } from "../../models/TTableBodyElements";
import { NeoDetailsModal } from "../NeoDetailsModal";

const numeral = numeralWithDefault.default;

interface ICol {
  id: keyof typeof cadFieldIndices;
  label: string;
  label_tooltip: string;
  minWidth?: number;
  maxWidth?: number;
  align: 'left';
  format: (value: string) => string;
  colClickHandler?: () => void;
}

export interface IRawRow {
  fullname: string;
  cd: Date;
  cd_sigma: string;
  h: string;

  diameter?: string;
  diameter_sigma?: string;

  nominal_size: string;
  minimum_size: string;
  maximum_size: string;

  dist: string;
  min_distance: string;
  max_distance: string;

  v_rel: string;
  v_inf: string;
}

interface IDisplayRow extends Omit<IRawRow, 'cd'> {
  cd: string;
  //
  fullname_tooltip: string;
  cd_tooltip: string;
  dist_tooltip: string;
  h_tooltip: string;
  size_tooltip: string;
}

const distanceUnits = [0, 1, 2, 3] as const;
const sizeUnits = [0, 1] as const;

type TDistUnit = typeof distanceUnits[number];
type TSizeUnit = typeof sizeUnits[number];

interface IProps {
  cadData: ICadData;
  dateAtDataFetch: string;
  period: 'recent' | 'future';
  isHeightAuto?: boolean;
  filterSortData: IFilterSortData;
}

 interface IProps {
  cadData: ICadData;
  dateAtDataFetch: string;
  period: 'recent' | 'future';
  isHeightAuto?: boolean;
  filterSortData: IFilterSortData;
}

/**
 * Component to take Close-Approach data (CAD) and draw a table
 * Each CAD entry is organized as an array of type (string|null)[]
 * So you need to test each entry for null, and convert the string to type number.
 * To make it easier to index on these arrays, I have created the object
 * 'cadFieldIndices'
 */
export const TableCAD = ({
  cadData,
  dateAtDataFetch,
  period,
  isHeightAuto,
  filterSortData
}: IProps) => {
  // --->>

  // State
  const [distUnit, setDistUnit] = useState<0 | 1 | 2 | 3>(0); // 0: 'ld', 1: 'km', 2: 'au', 3: 'mi'
  const [sizeUnit, setSizeUnit] = useState<0 | 1>(0); // 0: 'm', 1: 'ft'
  const [rawRows, setRawRows] = useState<IRawRow[]>();
  const [displayRows, setDisplayRows] = useState<IDisplayRow[]>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(containerRef);

  const [unchangedRawRows, setUnchangedRawRows] = useState<IRawRow[]>();
  const [isObjectModalShown, setIsObjectModalShown] = useState(false);
  const [selectedRawRow, setSelectedRawRow] = useState<IRawRow | undefined>();

  const [bodyElements, setBodyElements] = useState<TTableBodyElements>([]);

  // Define columns for our table
  const columns = getCols(distUnit, sizeUnit);

  // Set stateful click handlers on certain columns
  columns.forEach((col) => {
    if (col.id === 'dist') {
      col.colClickHandler = () =>
        setDistUnit((prev) => ((prev + 1) % distanceUnits.length) as TDistUnit);
    }
    if (col.id === 'size') {
      col.colClickHandler = () =>
        setSizeUnit((prev) => ((prev + 1) % sizeUnits.length) as TSizeUnit);
    }
  });

  // Whenever the API data changes, we need to re-filter it
  useEffect(() => {
    // --------->>>

    // Extract arrays of cad data and filter into 'recent' | 'future' categories
    const filteredDataArrays = cadData?.data.filter((datumArr: (string | null)[]) => {
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

    let newRawRows = filteredDataArrays?.map(
      (datumArr: (string | null)[]): IRawRow => {
        const name = datumArr[cadFieldIndices.fullname]!.replaceAll(/\(|\)/g, '').trim();

        let diameter = datumArr[cadFieldIndices.diameter];
        let min_size = (
          parseFloat(datumArr[cadFieldIndices.diameter]!) -
          parseFloat(datumArr[cadFieldIndices.diameter_sigma]!)
        ).toString();
        let max_size = (
          parseFloat(datumArr[cadFieldIndices.diameter]!) +
          parseFloat(datumArr[cadFieldIndices.diameter_sigma]!)
        ).toString();

        // If API does not return a diameter value, then estimate necessary values
        if (!diameter) {
          diameter = (
            (magToSizeKm(parseFloat(datumArr[cadFieldIndices.h] ?? '0'), 0.25) +
              magToSizeKm(parseFloat(datumArr[cadFieldIndices.h] ?? '0'), 0.05)) /
            2
          ).toString();

          min_size = magToSizeKm(parseFloat(datumArr[cadFieldIndices.h] ?? '0'), 0.25).toString();
          max_size = magToSizeKm(parseFloat(datumArr[cadFieldIndices.h] ?? '0'), 0.05).toString();
        }

        return {
          fullname: name,
          cd: apiDateStringToJsDate(datumArr[cadFieldIndices.cd]!),
          cd_sigma: datumArr[cadFieldIndices.t_sigma_f]!,
          h: datumArr[cadFieldIndices.h]!,
          diameter: datumArr[cadFieldIndices.diameter]!,
          diameter_sigma: datumArr[cadFieldIndices.diameter_sigma]!,
          nominal_size: diameter,
          minimum_size: min_size,
          maximum_size: max_size,
          dist: datumArr[cadFieldIndices.dist]!,
          min_distance: datumArr[cadFieldIndices.dist_min]!,
          max_distance: datumArr[cadFieldIndices.dist_max]!,
          v_rel: datumArr[cadFieldIndices.v_rel]!,
          v_inf: datumArr[cadFieldIndices.v_inf]!
        };
      }
    );

    // Filter data if selected
    if (!!filterSortData.sizeFilterMeters) {
      newRawRows =
        newRawRows?.filter((data) => {
          if (parseFloat(data.maximum_size) < (filterSortData.sizeFilterMeters ?? 0) / 1000) {
            return false;
          }

          return true;
        }) ?? [];
    }

    // Filter data based on h value
    if (!!filterSortData.hFilter) {
      newRawRows =
        newRawRows?.filter((data) => {
          if (parseFloat(data.h) > (filterSortData.hFilter ?? 30)) {
            return false;
          }

          return true;
        }) ?? [];
    }

    // Filter data if selected for uncertain NEOs
    // Filters to only show NEOs where distance (nominal, not minimum) is <1LD
    if (!filterSortData.showCloseApproachesWithMinLessThan1LD) {
      newRawRows =
        newRawRows?.filter((data) => {
          if (auToLd(parseFloat(data.dist)) < 1) {
            return true;
          }

          return false;
        }) ?? [];
    }

    // Sort data if selected
    if (!!filterSortData.column) {
      newRawRows.sort((a, b) => {
        const columnIndice = filterSortData.column === 'dist' ? 'dist' : 'nominal_size';

        if (parseFloat(a[columnIndice] ?? '0') < parseFloat(b[columnIndice] ?? '0')) {
          return filterSortData.direction === 'descending' ? 1 : -1;
        } else if (parseFloat(a[columnIndice] ?? '0') > parseFloat(b[columnIndice] ?? '0')) {
          return filterSortData.direction === 'descending' ? -1 : 1;
        }

        return 0;
      });
    }

    setUnchangedRawRows(newRawRows);
    setRawRows(newRawRows);
  }, [cadData, filterSortData]);

  /**
   * Update the displayed version of the data; we make this a separate effect
   * from the previous one that sets rawRows because the UI lets the user toggle
   * between displayed units, and we don't want to recompute filterings on each click
   */
  useEffect(() => {
    // --------->>>

    // Map raw-data rows to displayable text for table cells and tooltips
    const newDisplayRows = rawRows?.map(
      (rawRow): IDisplayRow => {
        // Show abbreviated fullname in cell, unabbreviated in tooltip
        const fullname = getAbbreviatedName(rawRow.fullname, width);
        const fullname_tooltip = rawRow.fullname;

        // Show date without time in cell, with time in tooltip
        const cd = `${rawRow.cd.getMonth() + 1}/${rawRow.cd.getDate()}/${rawRow.cd.getFullYear()}`;
        const cd_tooltip = rawRow.cd.toUTCString();

        // Show h as is in both cell and tooltip
        const h = numeral(parseFloat(rawRow.h)).format('0.0');
        const h_tooltip = rawRow.h;

        // Display dist as different formats depending on unit selected
        let dist: string; // rawRow.dist is in au by default
        let dist_tooltip: string;
        switch (distUnit) {
          case 0: // ld selected
            dist = auToLd(parseFloat(rawRow.dist)).toPrecision(3);
            dist_tooltip = `${auToLd(parseFloat(rawRow.dist))}`;
            break;
          case 1: // km selected
            /*             dist = ML(auToKm(parseFloat(rawRow.dist)), { precision: 0 });
            dist = numeral(auToKm(parseFloat(rawRow.dist))).format('0.0'); */
            dist = numeral(auToKm(parseFloat(rawRow.dist))).format();
            dist_tooltip = `${auToKm(parseFloat(rawRow.dist))}`;
            break;
          case 2: // au selected
            dist = parseFloat(rawRow.dist).toPrecision(3);
            dist_tooltip = rawRow.dist;
            break;
          case 3: // mi selected
            dist = auToMi(parseFloat(rawRow.dist)).toString();
            dist_tooltip = `${auToMi(parseFloat(rawRow.dist))}`;
            break;
          default:
            throw 'Not supposed to be possible';
        }

        // Display size as different formats depending on unit selected
        let minimum_size: string; // rawRow.size is in km by default
        let maximum_size: string; // rawRow.size is in km by default
        let nominal_size: string;
        let size_tooltip: string;

        let diameter: string | undefined;
        let diameter_sigma: string | undefined;
        switch (sizeUnit) {
          case 0: // m selected
            nominal_size = (parseFloat(rawRow.nominal_size) * 1000).toFixed(0);
            minimum_size = (parseFloat(rawRow.minimum_size) * 1000).toFixed(0);
            maximum_size = (parseFloat(rawRow.maximum_size) * 1000).toFixed(0);

            diameter = !rawRow.diameter
              ? undefined
              : (parseFloat(rawRow.diameter) * 1000).toFixed(0);
            diameter_sigma = !rawRow.diameter_sigma
              ? undefined
              : (parseFloat(rawRow.diameter_sigma) * 1000).toFixed(0);

            size_tooltip = `${rawRow.nominal_size}`;
            break;
          case 1: // ft selected
            nominal_size = kmToFt(parseFloat(rawRow.nominal_size)).toFixed(0);
            minimum_size = kmToFt(parseFloat(rawRow.minimum_size)).toFixed(0);
            maximum_size = kmToFt(parseFloat(rawRow.maximum_size)).toFixed(0);

            diameter = !rawRow.diameter
              ? undefined
              : kmToFt(parseFloat(rawRow.diameter)).toFixed(0);
            diameter_sigma = !rawRow.diameter_sigma
              ? undefined
              : kmToFt(parseFloat(rawRow.diameter_sigma)).toFixed(0);

            size_tooltip = `${kmToLd(parseFloat(rawRow.nominal_size))}`;
            break;
          default:
            throw 'Not supposed to be possible';
        }

        return {
          fullname,
          fullname_tooltip,
          cd,
          cd_sigma: rawRow.cd_sigma,
          cd_tooltip,
          dist,
          dist_tooltip,
          diameter,
          diameter_sigma,
          nominal_size,
          minimum_size,
          maximum_size,
          size_tooltip,
          h,
          h_tooltip,
          min_distance: rawRow.min_distance,
          max_distance: rawRow.max_distance,
          v_rel: rawRow.v_rel,
          v_inf: rawRow.v_inf
        };
      }
    );
    setDisplayRows(newDisplayRows);
  }, [rawRows, distUnit, sizeUnit, width, filterSortData]);

  // Map the display rows into the arrays for the table
  useEffect(() => {
    if(!displayRows) {
      return;
    }

    // Create the header array
    const bodyElements = displayRows.map((row, index) => {
      return {
        elements: columns.map((column, columnIndex) => {
          const value = (row as any)[column.id];
          const tooltip = (row as any)[column.id + '_tooltip'];

          return column.id === 'size' && !!row.diameter && !!row.diameter_sigma
          ? `${row.diameter} ± ${row.diameter_sigma}`
          : column.id === 'size' &&
            !isNaN(parseFloat(row.minimum_size)) &&
            !isNaN(parseFloat(row.maximum_size))
          ? `${column.format(row.minimum_size)} - ${column.format(
              row.maximum_size
            )}`
          : column.id === 'size'
          ? column.format(row.nominal_size)
          : column.format(value) + (column.id === 'dist' ?
          auToLd(parseFloat(rawRows ? rawRows[index]?.dist : '0')) -
            auToLd(parseFloat(row.min_distance)) >
            0.1 ? '*' : '' : '')
        }),
        color: rawRows && auToKm(parseFloat(rawRows[index]?.min_distance)) < 42164 ? 'yellow' : undefined,
        onClick: () => {
          setIsObjectModalShown(true);
          unchangedRawRows && setSelectedRawRow(unchangedRawRows[index]);
        }
      }
    });

    setBodyElements(bodyElements);
  }, [displayRows]);

  return (
    <>
      <NeoDetailsModal
        isShown={isObjectModalShown}
        setIsShown={setIsObjectModalShown}
        rawRow={selectedRawRow}
      />

      <div className={styles.container} ref={containerRef}>
        <div className={styles.tableContainer}>
          <Table
            headElements={columns.map(col => (
              {
                element: col.label
              }
            ))}
            bodyElements={bodyElements}
          />
        </div>

        <div className={styles.total}>Total: {displayRows ? displayRows.length : -1}</div>
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
    label: `Dist (${!distUnit ? 'LD' : distUnit === 1 ? 'km' : distUnit === 2 ? 'au' : 'mi'})`,
    label_tooltip: 'Close Approach nominal distance',
    minWidth: 0,
    align: 'left',
    format: (value: string) =>
      !distUnit
        ? (Math.round(parseFloat(value) * 100) / 100).toString()
        : distUnit === 3
        ? Math.round(parseFloat(value)).toLocaleString('en-US')
        : value
  },
  {
    id: 'size',
    label: `Size (${!sizeUnit ? 'm' : 'ft'})`,
    label_tooltip: 'Diameter from API, or average value using H of 0.25 and 0.05',
    minWidth: 0,
    align: 'left',
    format: (value: string) => value
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