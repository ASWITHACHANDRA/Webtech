const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Serve current folder
app.use(express.static(__dirname));

let students = [];

// CREATE
app.post('/students', (req, res) => {
    const student = req.body;

    if (!student.id || !student.name) {
        return res.status(400).json({ message: "Invalid Data" });
    }

    students.push(student);
    res.status(200).json({ message: "Student Added Successfully" });
});

// READ
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// UPDATE
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(s => s.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Student Not Found" });
    }

    students[index] = req.body;
    res.status(200).json({ message: "Student Updated Successfully" });
});

// DELETE
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(s => s.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Student Not Found" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student Deleted Successfully" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
