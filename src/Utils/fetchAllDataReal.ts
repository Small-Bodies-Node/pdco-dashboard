import { ISentryData, ICadData, IFetchedData } from '../Models/apiData.model';

/**
 * Function to grab all data from NASA API at once
 * At the moment, we're using two routes('sentry' and 'cad'), and calling
 * cad twice with different params
 */
export async function fetchAllDataReal(): Promise<IFetchedData | null> {
  // Urls for data fetching
  const sentryUrl = 'https://ssd-api.jpl.nasa.gov/sentry.api';
  const cad1LDUrl = getCadUrl('1LD');
  const cad0p05AUUrl = getCadUrl('0p05AU');

  // Fetch data from apis
  const [sentryData, cadData1LD, cadData0p05AU] = await Promise.all([
    fetch(sentryUrl).then((res) => res.json()),
    fetch(cad1LDUrl).then((res) => res.json()),
    fetch(cad0p05AUUrl).then((res) => res.json())
  ]).catch((err) => [null, null, null]);

  // Return null if error occurred
  if (!sentryData || !cad1LDUrl || !cad0p05AUUrl) return null;

  // Return data otherwise
  return {
    sentryData,
    cadData1LD,
    cadData0p05AU,
    timestamp: new Date().toUTCString()
  };
}

function getCadUrl(dist: '1LD' | '0p05AU') {
  const baseUrl = 'https://ssd-api.jpl.nasa.gov/cad.api?www=1&nea-comet=Y&fullname=true';

  // Build string for future date
  const secsInDay = 60 * 60 * 24;
  const d = new Date();
  const futureDaysFromNow = 60;
  const futureDate = new Date(d.setUTCSeconds(d.getUTCSeconds() + futureDaysFromNow * secsInDay));
  const futureDateStr = futureDate.toISOString().split('T')[0];

  // Assemble final url
  const res =
    dist === '1LD'
      ? `&dist-max=1LD&date-min=-365&date-max=now`
      : `&dist-max=0.05&date-min=-30&date-max=${futureDateStr}`;
  return baseUrl + res;
}
