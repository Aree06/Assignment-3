// Load environment variables from .env and export the MongoDB URI for use in the app
require('dotenv').config();

module.exports = {
    URI : process.env.URI
};