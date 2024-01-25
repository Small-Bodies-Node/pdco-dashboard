import type { NextPage } from "next";
import Head from "next/head";
import { PageReference } from "../../components/PageReference";
import '@fortawesome/fontawesome-svg-core/styles.css';

const Reference: NextPage = () => {
  return (
    <div className={""}>
      <Head>
        <title>Reference Page</title>
        <meta name="description" content="Useful reference information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageReference />
    </div>
  );
};

export default Reference;
