import Head from "next/head.js";

import HomeContent from "@/components/adventures/home-content.js";

export default function Home() {

  return (
    <>
      <Head>
        <title>Adventures</title>
        <meta name="description" content="Amazing adventures all over the World." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/world-map.ico" /> */}
      </Head>
      <HomeContent />
    </>
  );
}

