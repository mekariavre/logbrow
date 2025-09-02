let logs: string[] = [];

export function addLog(line: string) {
    logs.push(line);
    if (logs.length > 1000) logs.shift(); // Keep last 1000 lines
}

export function getLogs(): string[] {
    return logs;
}
