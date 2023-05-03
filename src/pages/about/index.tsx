import type { NextPage } from "next";
import Head from "next/head";
import { PageAbout } from "../../components/PageAbout";
import '@fortawesome/fontawesome-svg-core/styles.css';

const About: NextPage = () => {
  return (
    <div className={""}>
      <Head>
        <title>About Page</title>
        <meta name="description" content="About the PDCO Dashboard website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageAbout />
    </div>
  );
};

export default About;
