import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file buffer to Cloudinary
export const uploadToCloudinary = async (fileBuffer, folder = 'ecommerce') => {
    return new Promise((resolve, reject) => {
        // Convert buffer to stream for Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                use_filename: true,
                unique_filename: true,
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        
        // Create readable stream from buffer
        const stream = Readable.from(fileBuffer);
        stream.pipe(uploadStream);
    });
};

// Test Cloudinary connection
export const testCloudinaryConnection = async () => {
    try {
        const result = await cloudinary.api.ping();
        return { success: true, message: 'Cloudinary connected', data: result };
    } catch (error) {
        return { success: false, message: 'Cloudinary connection failed', error: error.message };
    }
};

export default cloudinary;

