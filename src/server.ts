import express from 'express';
import path from 'path';
import { addLog, getLogs } from './log-store';

const app = express();
const PORT = process.env.PORT || 3100;

// Serve static HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Logs API
app.get('/logs', (req, res) => {
    res.status(200).json(getLogs());
});

// Read from stdin and store logs
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
    chunk.toString().split('\n').forEach(line => {
        if (line.trim()) addLog(line);
    });
});

app.listen(PORT, () => {
    console.log(`LogBrowse server running at http://localhost:${PORT}`);
});
