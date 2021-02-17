/**
 * Convert abs mag H into estimated size
 * Source of equation: https://cneos.jpl.nasa.gov/tools/ast_size_est.html
 * Source of meanAlbedo value: https://arxiv.org/abs/2001.03550
 */
export const magToSize = (H: number) => {
  // ------------------------>>>

  const meanAlbedo = 0.147;
  const diameterKm = 10 ** (3.1236 - 0.5 * Math.log10(meanAlbedo) - 0.2 * H);
  return diameterKm;
};
