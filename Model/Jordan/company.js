const connection = require('../Connections/jordan');

async function getAllRows(parameters = {}){
    let sql = 'SELECT * FROM companys c';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function getById(id){
    let sql = 'SELECT * FROM companys c WHERE c.id = ?';
    const queryParameters = [id];
    return await connection.query(sql, queryParameters);
}
async function postRow(parameters = {}){
    let sql = 'INSERT INTO companys () VALUES ();';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function putRow(parameters = {}){
    let sql = 'UPDATE companys SET  ;';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function deleteRow(id){
    let sql = 'DELETE FROM companys WHERE id = ?;';
    const queryParameters = [id];
    return await connection.query(sql, queryParameters);
}

module.exports = {
    getAllRows,
    getById,
    postRow,
    putRow,
    deleteRow
}