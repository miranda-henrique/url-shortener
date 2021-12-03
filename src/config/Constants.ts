require('dotenv').config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const databaseName = process.env.DB_NAME;

export const config = {
    API_URL: process.env.API_URL,
    MONGO_CONNECTION: 
    `mongodb+srv://${username}:${password}@url-shortener-dio.1pn9a.mongodb.net/${databaseName}?retryWrites=true&w=majority`
}