import type { NextPage } from "next";
import Head from "next/head";

import { MainUI } from "../../components/MainUI";

const Home: NextPage = () => {
  return (
    <div className={""}>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainUI />
    </div>
  );
};

export default Home;
