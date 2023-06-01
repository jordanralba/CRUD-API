//Base Node Modules
const express = require('express'); 
const multer = require('multer'); //File Upload and Form Data Parsing
const cors = require('cors'); //Allows use of different http methods (put, delete) and removes ability to request from a different origin
const { check, validationResult } = require('express-validator'); //Validation of form elements

//DB Models
const account = require('./Model/Jordan/account');
const company = require('./Model/Jordan/company');
const permission_level = require('./Model/Jordan/permission_level');


//App Constants
const app = express();
app.use(cors()); 
app.use(express.static('View')); //Serves HTML files from the declared string's path
const port = process.env.port || 80;
const upload = multer(); 

//API End Points Required 
app.get('/account/', upload.none(), async (request, response)=>{
    console.log("CRUD Action: READ All Rows");
    try {
       const result = await account.getAllRows(request.query);
        return response.json({data: result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });}});
app.get('/account/:id/', upload.none(), async (request, response)=>{
    console.log("CRUD Action: READ ById");
    try {
       const result = await account.getById(request.params.id);
        return response.json({data: result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });}});
app.post('/account/', upload.none(), 
check('first_name', 'Input a First Name').isLength({min:3}),
check('last_name', 'Input a Last Name').isLength({min:3}),
check('company_id', 'Input a Company Choice').isLength({min:1}),
check('permission_level_id', 'Input a Permission Level').isLength({min:1}),
check('preferred_contact', 'Input a Contact Method').isLength({min:3}),
check('date_of_birth', 'Format of Date: yyyy-mm-dd').isLength({min:10}),
check('balance', 'Input a Valid Total').isLength({min:1}),
async (request, response)=>{ 
    console.log("CRUD Action: CREATE Row");
    //Validate Request from check() functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors);
        return response.status(400).json({message: 'Request fields or files are invalid.', errors: errors.array()});
    }
    try {
        const result = await account.postRow(request.body);
        console.log(result);
        return response.json({message: 'Succesfully Created Row'});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });}});
app.put('/account/:id/', upload.none(), 
check('first_name', 'Input a First Name').isLength({min:3}),
check('last_name', 'Input a Last Name').isLength({min:3}),
check('company_id', 'Input a Company Choice').isLength({min:1}),
check('permission_level_id', 'Input a Permission Level').isLength({min:1}),
check('preferred_contact', 'Input a Contact Method').isLength({min:3}),
check('date_of_birth', 'Format of Date: yyyy-mm-dd').isLength({min:10}),
check('balance', 'Input a Valid Total').isLength({min:1}),
async (request, response)=>{ 
    console.log("CRUD Action: UPDATE Row");
    //Validate Request from check() functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors);
        return response.status(400).json({message: 'Request fields or files are invalid.', errors: errors.array()});
    }
    try {
        const result = await account.putRow(request);
        console.log(result);
        return response.json({message: 'Succesfully Updated Row'});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });
    }});
app.delete('/account/:id/', upload.none(), async (request, response)=>{
    console.log("CRUD Action: DELETE Row");
    try {
       const result = await account.deleteRow(request.params.id);
        return response.json({message: 'Succesfully Deleted Row '+result.id});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });
    }});

//Additional endpoint for structure or <option> population
app.get('/structure/:database/:table/', upload.none(), async (request, response)=>{
    console.log("CRUD Action: NONE Table Structure");
    try {
       const result = await account.getStructure(request);
        return response.json({data:result, structure: 'Succesfully Requested Row Structure'});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Something went wrong with the server.' });
    }});






//Starts the app and provides a port of access
app.listen(port, () => {console.log(`CRUD Application listening at http://localhost:${port}/`);});