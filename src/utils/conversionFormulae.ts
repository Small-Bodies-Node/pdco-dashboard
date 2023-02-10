import {
  oneAuEqualsThisManyKms,
  oneAuEqualsThisManyLds,
  oneAuEqualsThisManyMi,
  oneKmEqualsThisManyFt
} from './constants';

//////////////////////////////////////////////////

export const kmToAu = (distKm: number) => {
  return distKm / oneAuEqualsThisManyKms;
};

export const auToKm = (distAu: number) => {
  return distAu * oneAuEqualsThisManyKms;
};

export const auToMi = (distAu: number) => {
  return distAu * oneAuEqualsThisManyMi;
};

//////////////////////////////////////////////////

export const ldToAu = (distLd: number) => {
  return distLd / oneAuEqualsThisManyLds;
};

export const auToLd = (distAu: number) => {
  return distAu * oneAuEqualsThisManyLds;
};

//////////////////////////////////////////////////

export const ldToKm = (distLd: number) => {
  return auToKm(ldToAu(distLd));
};

export const kmToLd = (distKm: number) => {
  return auToLd(kmToAu(distKm));
};

export const kmToFt = (distKm: number) => {
  return distKm * oneKmEqualsThisManyFt;
};

/**
 * Convert abs mag H into estimated size in km
 * Source of equation: https://cneos.jpl.nasa.gov/tools/ast_size_est.html
 * Source of meanAlbedo value: https://arxiv.org/abs/2001.03550
 */
export const magToSizeKm = (H: number, meanAlbedo: number = 0.147) => {
  // ----------------------------------->>>

  const albedo = meanAlbedo ?? 0.147;
  const diameterKm = 10 ** (3.1236 - 0.5 * Math.log10(albedo) - 0.2 * H);
  return diameterKm;
};
