import fs from 'fs';
import { STUDENTS_FILE_PATH, SUBJECTS_FILE_PATH } from './constants.js';

export  function readDataFromFile(filePath) {
    const data =  fs.readFileSync(filePath, {encoding: "utf8"});
    return data;
}

export function getStudents() {
    const data =  readDataFromFile(STUDENTS_FILE_PATH);
    const dataJSON = JSON.parse(data);
    return dataJSON.data;
}

export function getSubjects() {
    const data =  readDataFromFile(SUBJECTS_FILE_PATH);
    const dataJSON = JSON.parse(data);
    return dataJSON.data;
}

export function writeDataToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify({
        data
    }));
}