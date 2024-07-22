import bcrypt from "bcrypt";

import { connectToDB, insertDocument, checkUserExists } from "@/db-lib/db.js";

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(422).json({ message: 'Invalid method' });
        return;
    }

    const { email, password } = req.body;
    const isValid = email && email.includes('@') && password && password.trim().length > 5;

    if (!isValid) {
        res.status(422).json({ message: 'Invalid user data.' });
        return;
    }

    let client;
    try {
        client = await connectToDB();
    } catch (error) {
        res.status(500).json({ message: 'Connection to the DB failed.' });
        return;
    }

    try {
        const existingUser = await checkUserExists(client, 'users',email);
        if (existingUser) {
            res.status(422).json({ message: 'User registered already.' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "DB connection failed." });
        await client.close();
        return;
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        res.status(500).json({ message: 'Password hashing failed.' });
        return;
    }

    const userData = {
        email,
        password: hashedPassword
    };

    try {
        const result = await insertDocument(client, 'users', userData);
        res.status(201).json({ message: 'User created.', data: result });
    } catch (error) {
        res.status(500).json({message: 'User registration failed.'});
        return;
    } finally {
        if(client){
           await client.close();
        }
    }

}

export default handler;