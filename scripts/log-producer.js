#!/usr/bin/env node

// Sample log producer: outputs a log line every second
const services = ['auth', 'billing', 'time_off_service', 'user'];
const levels = ['info', 'warn', 'error', 'debug'];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function produceLog() {
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
}

function produceNonJsonLog() {
    const lines = [];
    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        lines.push(`${new Date().toISOString()} ${randomItem(levels)} Sample non-JSON log message ${i}`);
    }
    console.log(lines.join('\n'));
}

setInterval(() => {
    if (Math.random() < 0.5) {
        produceLog();
    } else {
        produceNonJsonLog();
    }
}, 3000);

