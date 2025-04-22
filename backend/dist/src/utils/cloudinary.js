"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Click 'View API Keys' above to copy your cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
exports.default = cloudinary_1.v2;
// This code imports the `v2` module from the `cloudinary` package and configures it with the cloud name, API key, and API secret. The configuration is done using environment variables, which are typically stored in a `.env` file for security reasons. The configured `cloudinary` instance is then exported for use in other parts of the application. This setup allows you to interact with Cloudinary's services, such as uploading and managing images and videos.
