// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IDiscoveryStats } from "../../models/IDiscoveryStats";
import { ISentryData } from "../../models/ISentryData";

export default async function getSentryData(
  req: NextApiRequest,
  res: NextApiResponse<IDiscoveryStats>
): Promise<ISentryData | null> {
  // const sentryData = await (
  // 	await fetch('https://ssd-api.jpl.nasa.gov/sentry.api')
  // ).json();

  const httpResponse = await fetch(
    "https://ssd-api.jpl.nasa.gov/sentry.api"
  ).catch((err: Error) => {
    console.log("Fetch Erro >>>", err.message);
    const r = new Response();
    return r;
  });

  if (httpResponse.body) {
    const data = await httpResponse.json();
    res.status(200).send(data);
  } else {
    res.status(400).send({
      //
    });
  }

  // const data = await http
}
