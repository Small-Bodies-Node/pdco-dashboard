import { IFetchedData } from "../models/IFetchedData";
import { getMockData } from "./getMockData";

/**
 * Function to simulate getting data from an API
 * The data was copy/pasted Feb 2021
 */
export async function fetchAllDataMock(): Promise<IFetchedData> {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve(getMockData());
    }, 1000);
  });
}
