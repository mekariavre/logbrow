// Log rendering functionality
class LogRenderer {
    constructor() {
        this.allLogs = [];
        this.expanded = {};
        this.prettyPrintMode = false;
    }

    setLogs(logs) {
        this.allLogs = logs;
    }

    render() {
        const search = document.getElementById('search').value.toLowerCase();
        const logsDiv = document.getElementById('logs');
        logsDiv.innerHTML = '';
        if (this.allLogs.length === 0) {
            logsDiv.className = '';
            return;
        }
        logsDiv.className = 'border border-gray-200 rounded-lg bg-white overflow-hidden';

        // Reverse the logs so newest is on top
        this.allLogs.slice().reverse().forEach((log, i) => {
            const idx = this.allLogs.length - 1 - i;
            let logStr = typeof log === 'string' ? log : JSON.stringify(log);
            if (search && logStr.toLowerCase().indexOf(search) === -1) return;

            const container = this.createLogContainer();

            if (this.prettyPrintMode) {
                // Show all logs pretty-printed, full width
                const prettyDiv = document.createElement('div');
                prettyDiv.className = 'px-4 py-2 font-mono text-xs text-gray-700 bg-gray-50 border-b border-gray-200 last:border-b-0';
                let pretty = '';
                try {
                    pretty = JSON.stringify(typeof log === 'string' ? JSON.parse(log) : log, null, 2);
                } catch {
                    pretty = logStr;
                }
                prettyDiv.innerHTML = `<pre class="overflow-x-auto">${pretty}</pre>`;
                container.appendChild(prettyDiv);
            } else {
                const header = this.createLogHeader(logStr, idx);
                if (this.expanded[idx]) {
                    const expandedDiv = this.createExpandedContent(log, logStr);
                    container.appendChild(header);
                    container.appendChild(expandedDiv);
                } else {
                    container.appendChild(header);
                }
            }
            logsDiv.appendChild(container);
        });
    }

    setPrettyPrintMode(on) {
        this.prettyPrintMode = on;
        this.render();
    }

    createLogContainer() {
        const container = document.createElement('div');
        // Remove margin and rounded corners for seamless joining
        container.className = 'border-b border-gray-200 last:border-b-0';
        return container;
    }

    createLogHeader(logStr, idx) {
        const header = document.createElement('div');
        // Tighter padding, no rounded corners, seamless look
        header.className = 'px-4 py-2 cursor-pointer font-mono text-xs text-gray-600 relative bg-white hover:bg-gray-50 transition-all duration-200';
        header.onclick = () => {
            this.expanded[idx] = !this.expanded[idx];
            this.render();
        };

        const short = logStr.length > 120 ? logStr.slice(0, 120) + '…' : logStr;
        const arrow = this.expanded[idx] ? '▼' : '▶';
        header.innerHTML = `${short}<span class="absolute right-4 top-2 text-gray-400 text-xs">${arrow}</span>`;

        return header;
    }

    createExpandedContent(log, logStr) {
        const expandedDiv = document.createElement('div');
        // Add a lighter, thinner border only above the expanded area for separation
        expandedDiv.className = 'bg-gray-50 px-4 pb-4 border-t border-gray-200';

        // Pretty print JSON if possible
        let pretty = '';
        try {
            pretty = JSON.stringify(typeof log === 'string' ? JSON.parse(log) : log, null, 2);
        } catch {
            pretty = logStr;
        }

        expandedDiv.innerHTML = `<pre class="font-mono text-xs overflow-x-auto text-gray-700">${pretty}</pre>`;
        return expandedDiv;
    }

    toggleExpanded(idx) {
        this.expanded[idx] = !this.expanded[idx];
        this.render();
    }
}
