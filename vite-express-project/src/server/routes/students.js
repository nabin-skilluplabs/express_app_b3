import express from "express";
import { add, getAll, getById, remove, update } from "../models/student.js";

const route = express.Router();

route.get('/', async(req, res) => {
    res.json({
        data: await getAll()
    });
});

route.get('/:id', async (req, res) => {
    const id = req.params.id;
    const student = await getById(id);
    if (student) {
        return res.json({ data: student });
    }
    else {
        return res.status(404).json({ error: 'Student not found!' });
    }
});

route.post('/', async (req, res) => {
    const student = req.body;
    const newStudent = await add(student);
    res.json({ data: newStudent });
});

route.put('/:id', async(req, res) => {

    const id = req.params.id;
   
    const student = req.body;
    try {
        let updatedStudent = await update({...student, id});
        return res.json({ data: updatedStudent });
    }
    catch(error) {
        return res.status(404).json({ error: error.message});
    }
});

route.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await remove(id);
        return res.send('OK');
    }
    catch(error) {
        return res.status(404).json({ error: error.message});
    }
});

export default route;