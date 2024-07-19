import { insertDocument } from "@/db-lib/db.js";
import { connectToDB } from "@/db-lib/db.js";

async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const adventure = req.body;
    console.log(adventure);

    if (Object.values(adventure).some(a => a === '')) {
        res.status(422).json({ message: 'Invalid input' });
        return;
    }

    let client;

    try {
        client = await connectToDB();
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }

    try {
        const result = await insertDocument(client, 'destinations', adventure);
        res.status(201).json({ message: 'Created new destination successfully', result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    } finally {
        if (client) {
            client.close();
        }
    }
}

export default handler;