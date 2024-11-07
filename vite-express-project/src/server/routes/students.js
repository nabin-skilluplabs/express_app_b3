import express from "express";

import { getStudents, writeDataToFile } from "../utils.js";
const route = express.Router();
import { STUDENTS_FILE_PATH } from "../constants.js";

const FILE_PATH = STUDENTS_FILE_PATH;

route.get('/', (req, res) => {
    res.json({
        data: getStudents()
    });
});

route.get('/:id', (req, res) => {
    const id = req.params.id;

    const student = getStudents().find(student => student.id == id);

    if (student) {
        return res.json({ data: student });
    }
    else {
        return res.status(404).json({ error: 'Student not found!' });
    }
});

route.post('/', (req, res) => {
    const student = req.body;
    const students = getStudents();
    const newStudent = { id: students[students.length - 1] ? ( students[students.length - 1].id + 1) : 1 , ...student };
    students.push(newStudent);

    writeDataToFile(FILE_PATH, students);
    res.json({ data: newStudent });
});

route.put('/:id', (req, res) => {
    const id = req.params.id;
    const student = req.body;
    const students = getStudents();
    const existing = students.find(student => student.id == id);

    if (existing) {
        let updatedStudent = {};
        const updatedStudents = students.map(item => {
            if (item.id == id) {
                updatedStudent = { ...item, ...student };
                return updatedStudent;
            }
            return item;
        });
        writeDataToFile(FILE_PATH, updatedStudents);
        return res.json({ data: updatedStudent });
    }
    else {
        return res.status(404).json({ error: 'Student not found!' });
    }
});

route.delete('/:id', (req, res) => {
    const id = req.params.id;
    const students = getStudents();
    const student = students.find(student => student.id == id);

    if (student) {
        const updatedStudents = students.filter(item => item.id != id);
        writeDataToFile(FILE_PATH, updatedStudents);
        return res.send('OK');
    }
    else {
        return res.status(404).json({ error: 'Student not found!' });
    }
});

export default route;