import { ISentryData, ICadData, IFetchedData } from '../Models/apiData.model';
import { secsInDay } from './constants';

/**
 * Function to grab all data from NASA API at once
 * At the moment, we're using two routes('sentry' and 'cad'), and calling
 * cad twice with different params
 */
export async function fetchAllDataReal(): Promise<IFetchedData | null> {
  // Urls for data fetching
  const sentryUrl = 'https://ssd-api.jpl.nasa.gov/sentry.api';
  const cadUrl = getCadUrl();
  const largeDistantCadUrl = getDistantLargeCadUrl();

  // // Fetch data from apis
  // const [sentryData, cadData]:
  //   | [ISentryData, ICadData]
  //   | [null, null] = await Promise.all([
  //   fetch(sentryUrl).then((res) => res.json()),
  //   fetch(cadUrl).then((res) => res.json()),
  //   //fetch(largeDistantCadUrl).then((res) => res.json())
  // ])
  // .catch((err) => {
  //   console.log('An error occurred', JSON.stringify(err));
  //   return [null, null];
  // });

  // Structured with promise chain to avoid rate limit
  let [sentryData, cadData, largeDistantCadData]: [ISentryData?, ICadData?, ICadData?] = [
    undefined,
    undefined,
    undefined
  ];
  return fetch(sentryUrl)
    .then(async (res) => {
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
        timestamp: new Date().toUTCString()
      };
    });
}

function getCadUrl() {
  const baseUrl =
    'https://ssd-api.jpl.nasa.gov/cad.api?www=1&nea-comet=Y&fullname=true&diameter=true';

  // Build string for future date
  const d = new Date();
  const futureDaysFromNow = 365 * 10; // 10 Years requested from KF
  const futureDate = new Date(d.setUTCSeconds(d.getUTCSeconds() + futureDaysFromNow * secsInDay));
  const futureDateStr = futureDate.toISOString().split('T')[0];

  // Assemble final url
  const res = `&min-dist-max=1LD&date-min=-365&date-max=${futureDateStr}`;
  return baseUrl + res;
}

function getDistantLargeCadUrl() {
  const baseUrl =
    'https://ssd-api.jpl.nasa.gov/cad.api?www=1&nea-comet=Y&fullname=true&diameter=true';

  // Build string for future date
  const d = new Date();
  const futureDaysFromNow = 365; // 15 Years requested from KF
  const futureDate = new Date(d.setUTCSeconds(d.getUTCSeconds() + futureDaysFromNow * secsInDay));
  const futureDateStr = futureDate.toISOString().split('T')[0];

  // Assemble final url
  const res = `&dist-max=19LD&h-max=24&date-min=-365&date-max=${futureDateStr}`;
  return baseUrl + res;
}
