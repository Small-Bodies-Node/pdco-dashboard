import { ICadData } from "./ICadData";
import { ISentryData } from "./ISentryData";

/**
 * Interface for combining all fetched data into one obj
 */
export interface IFetchedData {
  sentryData: ISentryData;
  cadData: ICadData;
  largeDistantCadData: ICadData;
  timestamp: string;
  maxAge: number; // maximum age of HTTP response, in ms
}
