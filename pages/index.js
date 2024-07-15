import AdventuresList from "@/components/adventures/adventures-list.js";
import { connectToDB } from "@/db-lib/db.js";

export default function Home({ adventures, error }) {
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
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
      revalidate: 3600,
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
      revalidate: 3600,
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
    revalidate: 3600
  };
}
