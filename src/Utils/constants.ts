import { kmToAu } from './conversionFormulae';

// export const mobileWidthPxl = 600;
export const mobileWidthPxl = 730;

export const borderColor = 'rgba(100,100,100,0.3)';
// export const borderColor = 'rgba(0,0,0,1)';
// export const borderColor = 'transparent';

export const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

// Helps in referencing data from array returned by API:
// https://ssd-api.jpl.nasa.gov/doc/cad.html
export const cadFieldIndices = {
  des: 0,
  orbit_id: 1,
  jd: 2,
  cd: 3,
  dist: 4, // nominal approach distance (au)
  dist_min: 5, // minimum (3-sigma) approach distance (au)
  dist_max: 6, // maximum (3-sigma) approach distance (au)
  v_rel: 7,
  v_inf: 8,
  t_sigma_f: 9,
  h: 10,
  // Added March 21
  diameter: 11,
  diameter_sigma: 12,
  fullname: 13,
  //
  // Entries added to each data array client-side
  //
  size: 12 // Size computed in km
};

/**
 * Physical Quantities
 */

export const oneAuEqualsThisManyLds = 389.17037554435;
export const oneAuEqualsThisManyKms = 149598000;
export const secsInDay = 60 * 60 * 24;
export const geoDistanceAu = kmToAu(42000);
