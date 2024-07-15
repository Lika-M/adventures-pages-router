import { ObjectId } from 'mongodb';

import AdventureDetail from "@/components/adventures/adventure-detail.js";
import { connectToDB } from "@/db-lib/db.js";

export default function Details({ adventure, loading, error }) {
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Adventure not found!</p>;
    }

    return <AdventureDetail {...adventure} />;
}

export async function getStaticProps(context) {
    const adventureId = context.params.adventureId;

    let client;
    let adventure = {};
    let loading = true;
    let error = null;

    try {
        client = await connectToDB();
    } catch (err) {
        return {
            props: {
                adventure,
                loading: false,
                error: { message: 'Could not connect to database.' }
            },
            revalidate: 3600,
        };
    }

    try {
        const db = client.db('adventures');
        const collection = db.collection('destinations');
        const objectId =  ObjectId.createFromHexString(adventureId);
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

        loading = false;

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
            loading,
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
