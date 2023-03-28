import type { NextPage } from "next";
import Head from "next/head";
import { PageAbout } from "../../Components/PageAbout";
import { SidebarMenu } from "../../Components/SidebarMenu";

const About: NextPage = () => {
  return (
    <div className={""}>
      <Head>
        <title>About Page</title>
        <meta name="description" content="About the PDCO Dashboard website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/** Icon in top left and slide-out navigation menu */}
      <SidebarMenu />

      <PageAbout />
    </div>
  );
};

export default About;
