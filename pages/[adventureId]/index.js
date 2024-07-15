import { ObjectId } from 'mongodb';
import Head from 'next/head.js';

import AdventureDetail from "@/components/adventures/adventure-detail.js";
import { connectToDB } from "@/db-lib/db.js";

export default function Details({ adventure, error }) {

    return (
        <>
            <Head>
                <title>{adventure ? 'Lovely place' : 'Loading...'}</title>
                <meta name="description" content={adventure ? adventure.description : 'Loading...'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/world-map.ico" />
            </Head>
            {error && <p>Adventure not found!</p>}
            {!error && !adventure && <p>Loading...</p>}
            {!error && adventure && <AdventureDetail {...adventure} />}
        </>
    );
}

export async function getStaticProps(context) {
    const adventureId = context.params.adventureId;

    let client;
    let adventure = null;
    let error = null;

    try {
        client = await connectToDB();
    } catch (err) {
        return {
            props: {
                adventure,
                error: { message: 'Could not connect to database.' }
            },
            revalidate: 3600,
        };
    }

    try {
        const db = client.db('adventures');
        const collection = db.collection('destinations');
        const objectId = ObjectId.createFromHexString(adventureId);
        adventure = await collection.findOne({ _id: objectId });

        if (!adventure) {
            throw new Error('Adventure not found');
        }

        adventure = {
            id: adventure._id.toString(),
            title: adventure.title,
            image: adventure.image,
            address: adventure.address,
            description: adventure.description
        }

    } catch (err) {
        error = { message: 'Could not fetch adventure data.' };
    } finally {
        if (client) {
            client.close();
        }
    }

    return {
        props: {
            adventure,
            error
        },
        revalidate: 300
    }
}

export async function getStaticPaths() {
    let client;
    let adventures = [];

    try {
        client = await connectToDB();
    } catch (error) {
        return {
            fallback: false,
            paths: [],
        };
    }

    try {
        const db = client.db('adventures');
        const collection = db.collection('destinations');
        adventures = await collection.find({}, { _id: 1 }).toArray();

    } catch (error) {
        return {
            fallback: false,
            paths: []
        }
    } finally {
        if (client) {
            client.close();
        }
    }

    const paths = adventures.map(adventure => ({
        params: {
            adventureId: adventure._id.toString()
        }
    }))

    return {
        fallback: false,
        paths
    }
}
