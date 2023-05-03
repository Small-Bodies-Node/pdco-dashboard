import { ICadData } from "../models/ICadData";
import { IFetchedData } from "../models/IFetchedData";
import { ISentryData } from "../models/ISentryData";
import { secsInDay } from "./constants";

/**
 * Function to grab all data from NASA API at once
 * At the moment, we're using two routes('sentry' and 'cad'), and calling
 * cad twice with different params
 */
export async function fetchAllDataReal(noCache: boolean): Promise<IFetchedData | null> {
  // Urls for data fetching
  const cadUrl = getCadUrl();
  const largeDistantCadUrl = getDistantLargeCadUrl();

  // stores max age of HTTP respones
  let maxAge = 0;

  // Structured with promise chain to avoid rate limit
  let [sentryData, cadData, largeDistantCadData]: [
    ISentryData?,
    ICadData?,
    ICadData?
  ] = [undefined, undefined, undefined];
  return fetch('/api/getSentryData', { cache: noCache ? "no-cache" : "default" })
    .then(async (res) => {
      // get age of response and store it, if bigger
      const resTimestamp = Date.parse(res.headers.get("Date") ?? "0");
      const age = Date.now() - resTimestamp;
      maxAge = Math.max(maxAge, age);

      sentryData = (await res.json()) as ISentryData;
    })
    .then(async () => {
      return fetch(cadUrl, { cache: noCache ? "no-cache" : "default" }).then(async (res) => {
        // get age of response and store it, if bigger
        const resTimestamp = Date.parse(res.headers.get("Date") ?? "0");
        const age = Date.now() - resTimestamp;
        maxAge = Math.max(maxAge, age);

        cadData = (await res.json()) as ICadData;
      });
    })
    .then(async () => {
      return fetch(largeDistantCadUrl, { cache: noCache ? "no-cache" : "default" }).then(async (res) => {
        // get age of response and store it, if bigger
        const resTimestamp = Date.parse(res.headers.get("Date") ?? "0");
        const age = Date.now() - resTimestamp;
        maxAge = Math.max(maxAge, age);

        largeDistantCadData = (await res.json()) as ICadData;
      });
    })
    .then(() => {
      // Return null if error occurred
      if (!sentryData || !cadData || !largeDistantCadData) return null;

      // Return data otherwise
      return {
        sentryData,
        cadData,
        largeDistantCadData,
        timestamp: new Date().toUTCString(),
        maxAge
      };
    });
}

function getCadUrl() {
  const baseUrl =
    "/api/getCadData";

  // Build string for future date
  const d = new Date();
  const futureDaysFromNow = 365 * 10; // 10 Years requested from KF
  const futureDate = new Date(
    d.setUTCSeconds(d.getUTCSeconds() + futureDaysFromNow * secsInDay)
  );
  const futureDateStr = futureDate.toISOString().split("T")[0];

  // Assemble final url
  const res = `?minDistMax=1LD&dateMin=-365&dateMax=${futureDateStr}`;
  return baseUrl + res;
}

function getDistantLargeCadUrl() {
  const baseUrl =
    "/api/getCadData";

  // Build string for future date
  const d = new Date();
  const futureDaysFromNow = 365; // 15 Years requested from KF
  const futureDate = new Date(
    d.setUTCSeconds(d.getUTCSeconds() + futureDaysFromNow * secsInDay)
  );
  const futureDateStr = futureDate.toISOString().split("T")[0];

  // Assemble final url
  const res = `?distMax=19LD&hMax=24&dateMin=-365&dateMax=${futureDateStr}`;
  return baseUrl + res;
}
