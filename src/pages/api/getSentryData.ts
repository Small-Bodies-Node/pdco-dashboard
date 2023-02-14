// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IDiscoveryStats } from "../../models/IDiscoveryStats";

export default async function getSentryData(
  req: NextApiRequest,
  res: NextApiResponse<IDiscoveryStats | null>
): Promise<void> {
  // const sentryData = await (
  // 	await fetch('https://ssd-api.jpl.nasa.gov/sentry.api')
  // ).json();

  const httpResponse = await fetch(
    "https://ssd-api.jpl.nasa.gov/sentry.api"
  ).catch((err: Error) => {
    console.log("Fetch Error >>>", err.message);
    return err;
  });

  if (httpResponse instanceof Response) {
    const data = await httpResponse.json();
    res.status(200).send(data);
  } else {
    res.status(400).end(httpResponse);
  }
}
