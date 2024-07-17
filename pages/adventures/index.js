import Head from "next/head.js";
import { useRouter } from "next/router.js";

import AdventuresList from "@/components/adventures/adventures-list.js";
import { connectToDB } from "@/db-lib/db.js";

export default function Adventures({ adventures, error }) {
  const router = useRouter();
  if (router.isFallback) {
    //TODO add spinner
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <Head>
        <title>Adventures</title>
        <meta name="description" content="Amazing adventures all over the World." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="world-map.ico" />
      </Head>
      <AdventuresList adventures={adventures} />
    </>
  );
}

export async function getStaticProps() {
  // avoid unnecessary http request to inner API
  let client;
  let adventures = [];

  try {
    client = await connectToDB();
  } catch (error) {
    return {
      props: {
        adventures: [],
        error: { message: 'Could not connect to database.' }
      },
      revalidate: 60,
    };
  }

  try {
    const db = client.db('adventures');
    const collection = db.collection('destinations');
    adventures = await collection.find().toArray();
    adventures = adventures.map(adventure => ({
      id: adventure._id.toString(),
      title: adventure.title,
      image: adventure.image,
      address: adventure.address
    }));

    console.log(adventures.id)
  } catch (error) {
    return {
      props: {
        adventures: [],
        error: { message: 'Could not fetch data.' }
      },
      revalidate: 60,
    };
  } finally {
    if (client) {
      client.close();
    }
  }

  return {
    props: {
      adventures
    },
    revalidate: 60
  };
}
