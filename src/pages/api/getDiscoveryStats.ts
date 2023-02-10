import type { NextApiRequest, NextApiResponse } from 'next';
import { IDiscoveryStatsData } from '../../models/IDiscoveryStatsData';

/**
 * Get discovery stats for the specified date range. Takes numberStartDate
 * and numbersEndDate parameters, in YYYY-MM-DD format.
 */
const getDiscoveryStats = (req: NextApiRequest, res: NextApiResponse) => {
	const query = req.query;
	const { numbersStartDate, numbersEndDate } = query;

	// Return 400 if neither required parameters are specified
	if(!numbersStartDate || !numbersEndDate) {
		res.statusCode = 400;
		res.end(null);
	}

  return getDataInternal(numbersStartDate as string, numbersEndDate as string).then(result => {
		// Return 404 if the data fetching failed (likely due to invalid dates)
		if(!result) {
			res.statusCode = 400;
			res.end(result);
		}
		else {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		}
	});
}

const getDataInternal = async (numbersStartDate: string, numbersEndDate: string): Promise<IDiscoveryStatsData | null> => {
	// Fetch the numbers data
	const numbersData = await (await fetch('https://cneos.jpl.nasa.gov/stats/numbers.json')).json();

	let startRow = null;
	let endRow = null;
	// Search for and store the data rows matching the passed
	// start and end dates
	for(let i = 0; i < numbersData.data.length; i++) {
		const row = numbersData.data[i];

		if(row[0] === numbersStartDate) {
			startRow = row;
		}
		else if(row[0] === numbersEndDate) {
			endRow = row;
		}
	}

	// Fetch NEA totals data
	const neaTotals = await (await fetch('https://cneos.jpl.nasa.gov/stats/nea_totals.json')).json();

	// Both rows were successfully found
	if(startRow && endRow) {
		return {
			neasDiscovered140m: (parseInt(endRow[9]) - parseInt(startRow[9])),
			neasDiscovered1km: (parseInt(endRow[8]) - parseInt(startRow[8])),
			neasDiscovered: (parseInt(endRow[10]) - parseInt(startRow[10])),
			cometsDiscovered: (parseInt(endRow[1]) - parseInt(startRow[1])),

			neasDiscovered140mAllTime: neaTotals['140m+'],
			neasDiscovered1kmAllTime: neaTotals['1km+'],
			neasDiscoveredAllTime: neaTotals['all'],
		}
	}
	// One or both rows not found (likely due to invalid date passed)
	else {
		return null;
	}
}

export default getDiscoveryStats;