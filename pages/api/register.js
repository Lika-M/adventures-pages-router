import { connectToDB, insertDocument } from "@/db-lib/db.js";

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

  const userData = {email, password}
  console.log(userData)


}


export default handler;