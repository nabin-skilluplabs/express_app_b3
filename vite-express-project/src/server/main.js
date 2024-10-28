import express from "express";
import ViteExpress from "vite-express";

import { getStudents, writeDataToFile } from "./utils.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to express app!");
});

app.get('/students',  (req, res) => {
  res.json({
    data: getStudents()
  });
});

app.get('/students/:id', (req, res) => {
  const id = req.params.id;

  const student = getStudents().find(student => student.id == id);

  if(student) {
    return res.json({data: student});
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});

app.post('/students', (req, res) => {
  const student = req.body;
  const students = getStudents();
  const newStudent = {id:students.length + 1, ...student};
  students.push(newStudent);
  writeDataToFile('./src/server/data.json', students);
  res.json({data: newStudent});
});

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const students = getStudents();
  const existing = students.find(student => student.id == id);

  if(existing) {
    let updatedStudent = {};
    const updatedStudents = students.map(item => {
      if(item.id == id) {
        updatedStudent = {...item, ...student};
        return updatedStudent;
      }
      return item;
    });
    writeDataToFile('./src/server/data.json', updatedStudents);
    return res.json({data: updatedStudent});
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  const students = getStudents();
  const student = students.find(student => student.id == id);

  if(student) {
    const updatedStudents = students.filter(item => item.id != id);
    writeDataToFile('./src/server/data.json', updatedStudents);
    return res.send('OK');
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});


ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001..."),
);
