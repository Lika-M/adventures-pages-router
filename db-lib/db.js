const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

export async function connectToDB() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    console.log("Connected successfully to database");
    return client;
}

export async function insertDocument(client, collectionName, document) {
    const db = client.db('adventures');
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
}

