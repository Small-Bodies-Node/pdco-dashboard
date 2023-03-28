// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDiscoveryStats } from '../../models/IDiscoveryStats';

export default async function getSentryData(
  req: NextApiRequest,
  res: NextApiResponse<IDiscoveryStats>
) {
	const sentryData = await (
		await fetch('https://ssd-api.jpl.nasa.gov/sentry.api')
	).json();

	res.setHeader('Cache-Control', 'public, max-age=43200');
  res.status(200).json(sentryData);
}
