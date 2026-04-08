const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});

app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});