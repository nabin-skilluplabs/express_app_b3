import express from "express";
import ViteExpress from "vite-express";
import studentRoute from './routes/students.js';
import subjectRoute from './routes/subjects.js';


const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to express app!");
});

app.use('/students', studentRoute);
app.use('/subjects', subjectRoute);

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001..."),
);
