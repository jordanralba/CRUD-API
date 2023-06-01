const connection = require('../Connections/jordan');

async function getAllRows(parameters = {}){
    let selectSql = 'SELECT a.id AS id, first_name, last_name, c.name AS company, p.level, preferred_contact, date_of_birth, a.balance AS balance FROM accounts a INNER JOIN companys c ON company_id = c.id INNER JOIN permission_levels p ON permission_level_id = p.id';
    const queryParameters = [],
        whereStatements = [],
        orderByStatements = [];

    if (typeof parameters.first_name !== 'undefined') {
        const name = parameters.first_name;
        whereStatements.push("first_name LIKE ?");
        queryParameters.push('%' + name + '%');
    }
    if (typeof parameters.company !== 'undefined') {
        whereStatements.push("company_id = ?");
        queryParameters.push(parameters.company);
    }
    if (typeof parameters.dob !== 'undefined') {
        const dob = parameters.dob;
        whereStatements.push('date_of_birth LIKE ?');
        queryParameters.push('%'+dob+'%');
    }
    if (typeof parameters.sort !== 'undefined') {
        const sort = parameters.sort;
        if (sort === 'ASC') {
            orderByStatements.push('permission_level_id ASC');
        } else if (sort === 'DESC') {
            orderByStatements.push('permission_level_id DESC')
        }
    }

    //Dynamically add WHERE expressions to SELECT statements if needed
    if (whereStatements.length > 0) {
        selectSql += ' WHERE ' + whereStatements.join(' AND ');
    }

    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (orderByStatements.length > 0) {
        selectSql += ' ORDER BY ' + orderByStatements.join(', ');
    }

    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (typeof parameters.limit !== 'undefined' && parameters.limit > 0 && parameters.limit < 6) {
        selectSql += ' LIMIT ' + parameters.limit;
    }

    return await connection.query(selectSql, queryParameters);
}
async function getById(id){
    const sql = 'SELECT * FROM accounts a WHERE a.id = ?';
    const queryParameters = [id];
    return await connection.query(sql, queryParameters);
}
async function postRow(parameters = {}){
    const sql = 'INSERT INTO accounts (first_name, last_name, company_id, permission_level_id, preferred_contact, date_of_birth, balance) VALUES (?,?,?,?,?,?,?)';
    const queryParameters = [
        parameters.first_name,
        parameters.last_name,
        parameters.company_id,
        parameters.permission_level_id,
        parameters.preferred_contact,
        parameters.date_of_birth,
        parameters.balance
    ];
    return await connection.query(sql, queryParameters);
}
async function putRow(parameters = {}){
    const sql = 'UPDATE accounts SET first_name = ?, last_name = ?, company_id = ?, permission_level_id = ?, preferred_contact = ?, date_of_birth = ?, balance = ? WHERE id = ?';
    const queryParameters = [
        parameters.body.first_name,
        parameters.body.last_name,
        parameters.body.company_id,
        parameters.body.permission_level_id,
        parameters.body.preferred_contact,
        parameters.body.date_of_birth,
        parameters.body.balance,
        parameters.params.id
    ];
    return await connection.query(sql, queryParameters);
}
async function deleteRow(id){
    const sql = 'DELETE FROM accounts WHERE id = ?';
    const queryParameters = [id];
    return await connection.query(sql, queryParameters);
}

async function getStructure(parameters = {}){
    //Run a for(column of parameters.query)
    //const sql = `SELECT id, ${parameters.query.column} FROM ${parameters.params.table};`;
    const sql = `SELECT * FROM ${parameters.params.table}`;
    const queryParameters = [];
    return await connection.query(sql, queryParameters);
}

module.exports = {
    getAllRows,
    getById,
    postRow,
    putRow,
    deleteRow,
    getStructure
}