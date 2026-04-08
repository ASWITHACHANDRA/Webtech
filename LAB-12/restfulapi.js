const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "Ashuu" },
    { id: 2, name: "Riya" }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.json(newUser);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.send("User not found");
    }
});

app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send("User deleted");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});