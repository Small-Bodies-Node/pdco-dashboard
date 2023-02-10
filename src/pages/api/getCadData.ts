import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get discovery stats for the specified date range. Takes numberStartDate
 * and numbersEndDate parameters, in YYYY-MM-DD format.
 */
const getCadData = async (req: NextApiRequest, res: NextApiResponse) => {
	const baseUrl =
    "https://ssd-api.jpl.nasa.gov/cad.api?www=1&nea-comet=Y&fullname=true&diameter=true";

	const query = req.query;
	const { minDistMax, distMax, dateMin, dateMax, hMax } = query;

	const url = baseUrl + (minDistMax ? `&min-dist-max=${minDistMax}` : '') + (distMax ? `&dist-max=${distMax}` : '') + (dateMin ? `&date-min=${dateMin}` : '') + (dateMax ? `&date-max=${dateMax}` : '') + (hMax ? `&h-max=${hMax}` : '');
	const data = await(await fetch(url)).json();
	res.status(200).json(data);
};

export default getCadData;