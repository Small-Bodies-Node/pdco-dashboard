// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDiscoveryStats } from '../../models/IDiscoveryStats';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDiscoveryStats>
) {
	const neaTotals = await (
		await fetch('https://cneos.jpl.nasa.gov/stats/nea_totals.json')
	).json();

	res.setHeader('Cache-Control', 'public, max-age=43200');
  res.status(200).json({
		neosDiscovered: neaTotals['all'],
		neosGreaterThan140m: neaTotals['140m+'],
		neosGreaterThan1km: neaTotals['1km+']
	});
}
