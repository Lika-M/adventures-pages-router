import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectToDB } from "@/db-lib/db.js";

export const authOptions = {
    session: {
        jwt: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            
            async authorize(credentials) {
                let client;

                try {
                    client = await connectToDB();
                } catch (error) {
                    throw new Error('Database connection failed.');
                }

                const collection = client.db('adventures').collection('users');
                const user = await collection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found.');
                }

                const verifyPassword = await bcrypt.compare(credentials.password, user.password);

                if (!verifyPassword) {
                    client.close();
                    throw new Error('Invalid password.');
                }

                client.close();
                return { email: user.email, name: null, image: null };
            }
        })
    ]
};

export default NextAuth(authOptions);

