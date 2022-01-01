const Bree = require('bree');
const logger = require('./logger');
const server = require('./server');
const store = require('./store');
let monitor = require('./monitor');

const bree = new Bree({
    logger: logger,
    jobs: [
        {
            name: 'log-message',
            interval: '30s',
        },
        {
            name: 'log-message2',
            interval: '45s',
        },
        {
            name: 'log-message3',
        },
    ],
    workerMessageHandler(metadata) {
        if (metadata.message == 'done') {
            bree.emit('worker deleted', metadata.name);
        }
    },
});

store.init(bree);
monitor.init(bree);

bree.start();
server.start();