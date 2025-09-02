#!/usr/bin/env node

// Sample log producer: outputs a JSON log line every second
const services = ['auth', 'billing', 'time_off_service', 'user'];
const levels = ['info', 'warn', 'error', 'debug'];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

setInterval(() => {
    const log = {
        level: randomItem(levels),
        ts: new Date().toISOString(),
        msg: 'Sample log message',
        resource: {
            'service.name': randomItem(services),
            'service.env': 'local'
        }
    };
    console.log(JSON.stringify(log));
}, 1000);
