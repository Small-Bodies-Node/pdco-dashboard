import { ICadData } from "../models/ICadData";
import { IFetchedData } from "../models/IFetchedData";
import { ISentryData } from "../models/ISentryData";
import { secsInDay } from "./constants";

/**
 * Function to grab all data from NASA API at once
 * At the moment, we're using two routes('sentry' and 'cad'), and calling
 * cad twice with different params
 */
export async function fetchAllDataReal(): Promise<IFetchedData | null> {
  // --->>

  // Urls for data fetching
  const cadUrl = getCadUrl();
  const largeDistantCadUrl = getDistantLargeCadUrl();
  const sentryUrl = "/api/getSentryData";

  const urls = [cadUrl, largeDistantCadUrl, sentryUrl];

  const promisedData = urls.map((url) =>
    fetch(url)
      .then((res) => {
        if (res.status > 200) {
          throw new Error();
        }
        return res.json();
      })
      .catch((err: Error) => {
        console.log("Error fetching from " + url, ">>>", err.message, "<<<");
        return null;
      })
  );

  const data = await Promise.all(promisedData);

  const [cadData, largeDistantCadData, sentryData]: [
    ICadData | null,
    ICadData | null,
    ISentryData | null
  ] = data as any;

  return {
    sentryData,
    cadData,
    largeDistantCadData,
    timestamp: new Date().toUTCString(),
  };

  /*
  // Structured with promise chain to avoid rate limit
  let [sentryData, cadData, largeDistantCadData]: [
    ISentryData?,
    ICadData?,
    ICadData?
  ] = [undefined, undefined, undefined];
  return fetch("/api/getSentryData")
    .then(async (res) => {
      if (res) {
        return;
      }
      sentryData = (await res.json()) as ISentryData;
    })
    .then(async () => {
      return fetch(cadUrl).then(async (res) => {
        cadData = (await res.json()) as ICadData;
      });
    })
    .then(async () => {
      return fetch(largeDistantCadUrl).then(async (res) => {
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
      };
    });
    */
}

function getCadUrl() {
  const baseUrl = "/api/getCadData";

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
  const baseUrl = "/api/getCadData";

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
