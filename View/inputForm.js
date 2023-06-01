const inputForm = document.getElementById('input-form');    
const divNode = document.createElement('div');
const headerNode = document.createElement('h1');
const inputNode = document.createElement('input');
const labelNode = document.createElement('label');
const selectNode = document.createElement('select');
const buttonN = document.createElement('button');
const rowNode = divNode.cloneNode(true);
    rowNode.setAttribute('class', 'row');
const colNode = divNode.cloneNode(true);
    colNode.setAttribute('class', 'col-sm-12');
const headerRow = rowNode.cloneNode(true);
const headerCol = colNode.cloneNode(true);
const header = headerNode.cloneNode(true);
    header.setAttribute('class', 'form-header');
    header.innerHTML = 'Create and Read Accounts';
    headerCol.appendChild(header.cloneNode(true));
    headerRow.appendChild(headerCol.cloneNode(true));
    inputForm.appendChild(headerRow);
const errorBan = divNode.cloneNode(true);
    errorBan.setAttribute('id', 'error-banner');
    errorBan.style.opacity = 0;
    inputForm.appendChild(errorBan);
let testArray = [],
    testObject = {},
    iterVal = 0;


const getAllValidators = ()=>{

    return errorMessages;
} 

const unsuccessfulValidation = (json)=>{
    for (error of json.errors) {
        const errorId = error.param + '-error';
        document.getElementById(errorId).innerHTML = error.msg;
        document.getElementById(errorId).hidden = false;
    }
}

const serverMessedUp = (banner)=>{
banner.style.opacity = 100;
banner.innerText = 'The server had an error.';
}

/*const newDataStructure = (json)=>{
const tableStructs = [];
const names = Object.entries(json.data[0]);
console.log(names);
console.log(json);
console.log(json.data);
console.log(json.data[0]);
for(row of json.data){
    tableStructs.push(row);
    //testArray.push(row);
}
console.log(tableStructs);
return tableStructs;
}*/

const newForm = async (json)=>{
    const data = Object.entries(json.data[0]);
    const prettyLabels = [];
    const prettyValues = [];
    let z = 0;
    for (x=1; x<data.length;x++){
        //console.log(x)
        z++;
    prettyLabels.push(await newFormRow(data, x, json));
    prettyValues.push(data[x][1])
    }
    console.log(prettyLabels);
    console.log(prettyValues);

    //createTable(json, display, prettyLabels, prettyValues);

    newButtonRow('insert');
    document.getElementById('insert').addEventListener('click', (event)=>{
        insertDatabase('account', 'jordan');
    });
   
}



const loadResponseHandlers = (status, json)=>{
    const errorBanner = document.getElementById('error-banner');

    if(status === 500){
        serverMessedUp(errorBanner);
    }
    //Succesful data request
    else if(status === 200 && typeof json.structure === 'undefined'){
        //newDataStructure(json);
        newForm(json);
    }
    //Succesful structure request
    else if(status === 200 && typeof json.structure !== 'undefined'){
        //const tableStructs = newDataStructure(json);
        getOptions(json);
    }
}
const postResponseHandlers = (status, json)=>{
    const errorBanner = document.getElementById('error-banner');
    const errorMessages = document.getElementsByClassName('error-message');
    //console.log(errorMessages);
    for (htmlElement of errorMessages) {
        //console.log(htmlElement.id);
        htmlElement.innerHTML = '&nbsp;';
        htmlElement.hidden = true;
    }
    //Validation error
    if(status === 400){
        errorBanner.innerText = 'Form has errors. Please correct them and resubmit.';
        errorBanner.style.opacity = 100;
        unsuccessfulValidation(json);
    }
    //Server error
    else if(status === 500){
        serverMessedUp(errorBanner);
    }
    //Succesful data request
    else if(status === 200){
        errorBanner.innerText = 'Succesfully Inserted';
        errorBanner.style.opacity = 100;
    }
}

const newFormRow = async (tRow, column, json)=>{
    const row = rowNode.cloneNode(true);
    const col4 = divNode.cloneNode(true);
        col4.setAttribute('class', 'col-sm-4');
    const inputColumn = col4.cloneNode(true);
        inputColumn.className += ' inputs';
    const labelColumn = col4.cloneNode(true);
        labelColumn.className += ' labels'
    const validatorColumn = col4.cloneNode(true);
        validatorColumn.hidden = true;
        //validatorColumn.setAttribute('hidden', 'true')
        validatorColumn.className += ' error-message';
    const name = tRow[column][0];
    const words = name.split('_');
    //console.log(words);
    const trimmed = words.filter(word => !word.includes('id'));
    //console.log(trimmed);
    const labelArr = trimmed.map(word => word.replace(word.at(0), word.at(0).toUpperCase()));
    //console.log(labelArr);
    const labelString = labelArr.join(' ');
    //console.log(labelString);
    const label = labelNode.cloneNode(true);
        label.innerHTML = labelString;
        labelColumn.appendChild(label.cloneNode(true));
    const val = tRow[column][1];
    //console.log(val);
    //const foreignTable = trimmed.join('_');
    const foreignTable = trimmed.join('_').concat('s');
        //console.log(foreignTable);
    if(name.includes('_id')){
        console.log(name);
        const input = selectNode.cloneNode(true);
            input.setAttribute('id', name);
            input.setAttribute('name', foreignTable);
            input.setAttribute('class', 'foreign-key form-input');
        inputColumn.appendChild(input.cloneNode(true));
        //console.log(inputColumn);
        //informationWanted(foreignTable, 1);
        //testArray.push(foreignTable);
    }else{
        const input = inputNode.cloneNode(true);
        if(typeof val === 'number'){
            input.setAttribute('type', 'number');
        }else{
            input.setAttribute('type', 'text');
        }
        input.setAttribute('id', name);
        input.setAttribute('class', 'form-input');
        inputColumn.appendChild(input.cloneNode(true));
    }
    validatorColumn.setAttribute('id', name + "-error");
    row.appendChild(labelColumn.cloneNode(true));
    row.appendChild(inputColumn.cloneNode(true));
    row.appendChild(validatorColumn.cloneNode(true));
    //console.log(row);
    inputForm.appendChild(row.cloneNode(true));
    return labelString;
}

const newButtonRow = (...type)=>{
    const buttonRow = rowNode.cloneNode(true);
    buttonRow.className += ' button-row';
    const colAuto = divNode.cloneNode(true);
        colAuto.setAttribute('class', 'col-auto');
    const button = buttonN.cloneNode(true);
        button.setAttribute('id', type);
        button.setAttribute('class', 'col-auto form-button');
        button.innerHTML = type.map(word => word.replace(word.at(0), word.at(0).toUpperCase()));
    const buttonColumn = colAuto.cloneNode(true);
        buttonColumn.appendChild(button.cloneNode(true));
        buttonRow.appendChild(button.cloneNode(true));
    
    return inputForm.appendChild(buttonRow);
}

const getOptions = async (json)=>{
    
        const optionsNode = document.createElement('option');
        //await informationWanted(containers[i].name, 1);
        
        const container = document.getElementsByClassName('foreign-key');
        container[i].appendChild(optionsNode.cloneNode(true));
        console.log(json);
        for(row of json.data){
            const literals = Object.keys(row);
            //console.log(row);console.log(literals);
            const option = optionsNode.cloneNode(true);
            option.value = row[literals[0]];
            option.text = row[literals[1]];
            container[i].appendChild(option.cloneNode(true));
            console.log(option);
        }
        
    return;
} 

const insertDatabase = async (table, database) => {
    const formData = new FormData();
    const formElements = document.getElementsByClassName('form-input');
    console.log(formElements);
    for(element of formElements){
        console.log(element);
        formData.append(element.id, element.value);
    }            
    let fetchSettings = {
        method: 'POST',
        body: formData
    }
    await fetch('http://localhost/'+table, fetchSettings)
    .then((response)=>{
        return new Promise((resolve)=>{
            response.json().then((json) => resolve({status: response.status, json}))});
    }).then(({status, json})=>{
        postResponseHandlers(status, json);
    }).catch((error)=>{
        console.error('Error:', error);
    });
}
const rowWanted = async (table, database) => {
    await fetch('http://localhost/'+table+'/1?database='+database, {method: 'GET'})
    .then((response)=>{
        return new Promise((resolve)=>{
            response.json().then((json) => resolve({status: response.status, json}))});
    }).then(({status, json})=>{
        loadResponseHandlers(status, json);
    }).catch((error)=>{
        console.error('Error:', error);
    });
}

const structureWanted = async (table, database) => {
    await fetch('http://localhost/structure/'+database+'/'+table, {method: 'GET'})
    .then((response)=>{
        return new Promise((resolve)=>{
            response.json().then((json) => resolve({status: response.status, json}))});
    }).then(({status, json})=>{
        loadResponseHandlers(status, json);
    }).catch((error)=>{
        console.error('Error:', error);
    });
}

const createForm = async (database_table_name, database_name) => {
    await rowWanted(database_table_name, database_name);
    const fTables = document.getElementsByClassName('foreign-key');
    console.log(fTables);
    for(i=0;i<fTables.length;i++){
        console.log(i);
        //await informationWanted(fTables[i].name, 1, database_name);
        await structureWanted(fTables[i].name, database_name);
    }
}

window.addEventListener('load', async (event)=>{
    await createForm('account', 'jordan');
});




