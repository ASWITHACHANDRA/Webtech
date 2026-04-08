
const fs = require('fs');

fs.writeFile('sample.txt', 'Hello, this is initial content.\n', (err) => {
    if (err) throw err;
    console.log('File created and data written.');

    fs.appendFile('sample.txt', 'This is appended content.\n', (err) => {
        if (err) throw err;
        console.log('Data appended.');

        fs.readFile('sample.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log('File content:\n' + data);

            fs.unlink('sample.txt', (err) => {
                if (err) throw err;
                console.log('File deleted.');
            });
        });
    });
});