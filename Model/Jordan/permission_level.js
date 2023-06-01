const connection = require('../Connections/jordan');

async function getAllRows(parameters = {}){
    let sql = 'SELECT * FROM permission_levels p;';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function getById(id){
    let sql = 'SELECT * FROM permission_levels p WHERE p.id = ?;';
    const queryParameters = [id];
    return await connection.query(sql, queryParameters);
}
async function postRow(parameters = {}){
    let sql = 'INSERT INTO permission_levels () VALUES ();';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function putRow(parameters = {}){
    let sql = 'UPDATE permission_levels SET  ;';
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}
async function deleteRow(id){
    let sql = 'DELETE FROM permission_levels WHERE id = ?;';
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