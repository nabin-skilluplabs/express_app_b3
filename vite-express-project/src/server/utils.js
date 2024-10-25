import fs from 'fs';

export  function readDataFromFile(filePath) {
    const data =  fs.readFileSync(filePath, {encoding: "utf8"});
    return data;
}

export function getStudents() {
    const data =  readDataFromFile('./src/server/data.json');
    const dataJSON = JSON.parse(data);
    return dataJSON.data;
}

export function writeDataToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify({
        data
    }));
}