// mongodb+srv://admin:admin@cluster0.9nwah.mongodb.net/sample_betp2b?retryWrites=true&w=majority

const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const dotenv = require('dotenv').config();

//TODO: cambiar por variables de entorno

//const uriMongo = 'mongodb+srv://admin:admin@cluster0.9nwah.mongodb.net/sample_betp2b?retryWrites=true&w=majority';
const uriMongo = process.env.URIMONGO;
console.log(uriMongo);
const client = new mongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser: true });

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.red(err)));
}

module.exports = {getConnection};