// Log rendering functionality
class LogRenderer {
    constructor() {
        this.allLogs = [];
        this.expanded = {};
    }

    setLogs(logs) {
        this.allLogs = logs;
    }

    render() {
        const search = document.getElementById('search').value.toLowerCase();
        const logsDiv = document.getElementById('logs');
        logsDiv.innerHTML = '';

        // Reverse the logs so newest is on top
        this.allLogs.slice().reverse().forEach((log, i) => {
            // Adjust index for expanded state
            const idx = this.allLogs.length - 1 - i;
            let logStr = typeof log === 'string' ? log : JSON.stringify(log);
            if (search && logStr.toLowerCase().indexOf(search) === -1) return;

            const container = this.createLogContainer();
            const header = this.createLogHeader(logStr, idx);

            if (this.expanded[idx]) {
                const expandedDiv = this.createExpandedContent(log, logStr);
                container.appendChild(header);
                container.appendChild(expandedDiv);
            } else {
                container.appendChild(header);
            }

            logsDiv.appendChild(container);
        });
    }

    createLogContainer() {
        const container = document.createElement('div');
        container.className = 'border border-gray-200 rounded-lg mb-2 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200';
        return container;
    }

    createLogHeader(logStr, idx) {
        const header = document.createElement('div');
        header.className = 'p-4 cursor-pointer font-mono text-sm text-gray-600 relative';
        header.onclick = () => {
            this.expanded[idx] = !this.expanded[idx];
            this.render();
        };

        const short = logStr.length > 120 ? logStr.slice(0, 120) + '…' : logStr;
        const arrow = this.expanded[idx] ? '▼' : '▶';
        header.innerHTML = `${short}<span class="absolute right-4 top-4 text-gray-400 text-xs">${arrow}</span>`;

        return header;
    }

    createExpandedContent(log, logStr) {
        const expandedDiv = document.createElement('div');
        expandedDiv.className = 'border-t border-gray-200';

        // Pretty print JSON if possible
        let pretty = '';
        try {
            pretty = JSON.stringify(typeof log === 'string' ? JSON.parse(log) : log, null, 2);
        } catch {
            pretty = logStr;
        }

        expandedDiv.innerHTML = `<pre class="bg-gray-50 p-4 rounded-b-lg font-mono text-xs overflow-x-auto text-gray-700">${pretty}</pre>`;
        return expandedDiv;
    }

    toggleExpanded(idx) {
        this.expanded[idx] = !this.expanded[idx];
        this.render();
    }
}
