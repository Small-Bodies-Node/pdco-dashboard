import type { NextPage } from "next";
import Head from "next/head";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { PageQuickLinks } from "../../components/PageQuickLinks";

const QuickLinks: NextPage = () => {
  return (
    <div className={""}>
      <Head>
        <title>Quick Links Page</title>
        <meta name="description" content="Quick links" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageQuickLinks />
    </div>
  );
};

export default QuickLinks;
