const fs = require('fs').promises;
const PATHMOCInventors = __dirname + '/inventors.json';
const connection = require('./connectionMongo');

async function readMocInventor() {
    return JSON.parse(await fs.readFile(PATHMOCInventors, 'utf-8'));
}

async function writeMocInventor(inventors) {
    await fs.writeFile(PATHMOCInventors, JSON.stringify(inventors, null, ' '));
}

async function getAllInventors() {
    //return (await readMocInventor());
    const connectionMongo = await connection.getConnection();
    const inventors = await connectionMongo
        .db('sample_betp2b')
        .collection('inventors')
        .find()
        .toArray();
    return inventors;
}

async function getInventor(id) {
    /*let data = await getAllInventors();
    let inventor = data.inventors.find(inventor => inventor._id == id);
    return inventor;*/
    const connectionMongo = await connection.getConnection();
    const inventor = await connectionMongo
        .db('sample_betp2b')
        .collection('inventors')
        .findOne({ _id: parseInt(id) });
    return inventor;
}

async function pushInventor(inventor) {
    /*const data = await getAllInventors();
    data.inventors.push(inventor);
    await writeMocInventor(data);*/
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo
        .db('sample_betp2b')
        .collection('inventors')
        .insertOne(inventor);
    return result;
}

async function updateInventor(inventor) {
    /*const data = await getAllInventors();
    const index = data.inventors.findIndex(value => value._id == inventor._id);
    data.inventors[index].first = inventor.first;
    data.inventors[index].last = inventor.last;
    data.inventors[index].year = inventor.year;
    data.inventors[index].img = inventor.img;

    await writeMocInventor(data);*/

    const connectionMongo = await connection.getConnection();
    const query = {_id: parseInt(inventor._id)}; 
    const newValues = {$set: {
        first: inventor.first,
        last: inventor.last,
        year: inventor.year,
        img: inventor.img         
        }
    };
    const result = await connectionMongo.db('sample_betp2b')
                            .collection('inventors')
                            .updateOne(query, newValues)
    return result;
    
}

async function deleteInventor(id) {
    /*const data = await getAllInventors();
    data.inventors.splice(
        data.inventors.findIndex(value => value._id == id),
        1
    );
    await writeMocInventor(data);*/
    
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('sample_betp2b')
                            .collection('inventors')
                            .deleteOne({_id: parseInt(id)});
    return result;
}

module.exports = { getAllInventors, getInventor, pushInventor, updateInventor, deleteInventor }

