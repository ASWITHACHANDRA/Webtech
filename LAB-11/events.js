
const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`Hello ${name}, welcome!`);
});

eventEmitter.on('greet', (name) => {
    console.log(`Have a great day, ${name}!`);
});

eventEmitter.emit('greet', 'Ashuu');