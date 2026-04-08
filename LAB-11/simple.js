
const http = require('http');


const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/plain');

    res.write('Hello! This is my Node.js server.');

    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});