import { ICadData } from "./ICadData";
import { ISentryData } from "./ISentryData";

/**
 * Interface for combining all fetched data into one obj
 */
export interface IFetchedData {
  sentryData: ISentryData | null;
  cadData: ICadData | null;
  largeDistantCadData: ICadData | null;
  timestamp: string;
}
