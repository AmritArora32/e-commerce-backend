import { testCloudinaryConnection } from '../config/cloudinary.js';

// Test Cloudinary connection endpoint
export const testConnection = async (req, res) => {
    try {
        const result = await testCloudinaryConnection();
        if (result.success) {
            return res.status(200).json({
                success: true,
                message: 'Cloudinary is connected and working',
                data: result.data
            });
        } else {
            return res.status(500).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error testing Cloudinary connection',
            error: error.message
        });
    }
};

