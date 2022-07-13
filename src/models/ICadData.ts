/**
 * Interface for "Close Approach" data received from API:
 * API Docs: https://ssd-api.jpl.nasa.gov/doc/cad.html
 * API Base: https://ssd-api.jpl.nasa.gov/cad.api?...
 */
export interface ICadData {
  signature: {
    source: string;
    version: string;
  };
  count: string;
  fields: string[];
  data: (string | null)[][];
}
