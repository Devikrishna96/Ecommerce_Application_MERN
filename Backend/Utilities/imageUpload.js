const cloudinary = require("../config/cloudnaryConfig");

const uploadToCloudinary = async (filepath, folder = "products") => {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            folder: folder, 
        });
        return result.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = uploadToCloudinary;
