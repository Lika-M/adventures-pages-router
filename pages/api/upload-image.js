import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not set');
}

if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('CLOUDINARY_API_KEY is not set');
}

if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error('CLOUDINARY_API_SECRET is not set');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {
            const { file } = req.body;
            const result = await cloudinary.uploader.upload(file, {
                folder: 'adventures',
            });

            res.status(200).json({ url: result.secure_url });
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong!' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    },
};
