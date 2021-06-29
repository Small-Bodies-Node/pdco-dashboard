import numeral from 'numeral';
import { IDisplayRow, IRawRow, TDistUnit, TSizeUnit } from '../Components/TableCAD';
import { auToKm, auToLd, auToMi, kmToFt, kmToLd, magToSizeKm } from './conversionFormulae';

export const getDisplayRows = (
  rawRows: IRawRow[] | undefined,
  width: number,
  sizeUnit: TSizeUnit,
  distUnit: TDistUnit
): IDisplayRow[] | undefined => {
  // Map raw-data rows to displayable text for table cells and tooltips
  const newDisplayRows = rawRows?.map(
    (rawRow): IDisplayRow => {
      // Show abbreviated fullname in cell, unabbreviated in tooltip
      const fullname = getAbbreviatedName(rawRow.fullname, width);
      const fullname_tooltip = rawRow.fullname;

      // Show date without time in cell, with time in tooltip
      const cd = rawRow.cd.toLocaleDateString();
      const cd_tooltip = rawRow.cd.toString();

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
          /**
           * Can be quite large, and toLocaleString preserves number
           * w/o scientific notation while toPrecision does not
           */
          dist = auToMi(parseFloat(rawRow.dist)).toString();
          dist_tooltip = `${auToMi(parseFloat(rawRow.dist))}`;
          break;
        default:
          throw 'Not supposed to be possible';
      }

      // Calculate size and sigma from h if there is no size from API
      if (!rawRow.size && !rawRow.sigma) {
        rawRow.sigma = (
          (magToSizeKm(parseFloat(rawRow.h), 0.05) - magToSizeKm(parseFloat(rawRow.h), 0.25)) /
          2
        ).toString();
        rawRow.size = (
          (magToSizeKm(parseFloat(rawRow.h), 0.25) + magToSizeKm(parseFloat(rawRow.h), 0.05)) /
          2
        ).toString();
      }

      // Display size as different formats depending on unit selected
      let size: string; // rawRow.size is in km by default
      let size_tooltip: string;
      switch (sizeUnit) {
        case 0: // m selected
          size = (parseFloat(rawRow.size) * 1000).toFixed(2);
          size_tooltip = `${rawRow.size}`;
          break;
        case 1: // ft selected
          size = kmToFt(parseFloat(rawRow.size)).toFixed(3);
          size_tooltip = `${kmToLd(parseFloat(rawRow.size))}`;
          break;
        default:
          throw 'Not supposed to be possible';
      }

      let sigma: string; // rawRow.sigma is in km by default
      switch (sizeUnit) {
        case 0: // m selected
          sigma = (parseFloat(rawRow.sigma) * 1000).toFixed(2);
          break;
        case 1: // ft selected
          sigma = kmToFt(parseFloat(rawRow.sigma)).toFixed(3);
          break;
        default:
          throw 'Not supposed to be possible';
      }

      return {
        fullname,
        fullname_tooltip,
        cd,
        cd_tooltip,
        dist,
        dist_tooltip,
        size,
        size_tooltip,
        h,
        h_tooltip,
        sigma
      };
    }
  );

  return newDisplayRows;
};

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
