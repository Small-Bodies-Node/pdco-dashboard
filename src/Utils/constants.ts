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
  dist: 4,
  dist_min: 5,
  dist_max: 6,
  v_rel: 7,
  v_inf: 8,
  t_sigma_f: 9,
  h: 10,
  fullname: 11,
  //
  // Entries added to each data array clientside
  //
  size: 12
};

// Convert distances in AU to LD
export const au2ld = 389.17037554435;

// This is how often we check to see if the data we fetched needs to be refreshed
export const intervalToCheckForDataSecs = 2;
