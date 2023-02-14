import type { NextPage } from "next";
import Head from "next/head";

import { MainUI } from "../../components/MainUI";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="Home Page" content="PDCO Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainUI />
    </>
  );
};

export default Home;
