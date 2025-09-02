// Main application logic
class LogBrowApp {
    constructor() {
        this.logs = [];
        this.freezeAtIndex = -1;
        this.renderer = new LogRenderer();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startFetching();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            this.renderer.render();
        });

        const prettyToggle = document.getElementById('toggle-pretty');
        prettyToggle.addEventListener('toggle', (e) => {
            this.renderer.setPrettyPrintMode(e.detail.pretty);
        });

        const jsonOnlyToggle = document.getElementById('toggle-json-only');
        jsonOnlyToggle.addEventListener('toggle', (e) => {
            this.renderer.setJsonOnlyMode(e.detail.on);
        });

        const freezeToggle = document.getElementById('toggle-freeze');
        freezeToggle.addEventListener('toggle', (e) => {
            this.toggleFreeze();
        });
    }

    async toggleFreeze() {
        this.freezeAtIndex = this.freezeAtIndex >= 0 ? -1 : this.logs.length;
    }

    async fetchLogs() {
        try {
            const res = await fetch('/logs');
            const data = await res.json();
            this.logs = data;
            this.renderLogs();
        } catch (error) {
            console.error('Failed to fetch logs:', error);
            this.logs = [];
            this.renderer.render();
        }
    }

    async renderLogs() {
        const visibleLogs = this.freezeAtIndex >= 0 ? this.logs.slice(0, this.freezeAtIndex) : this.logs;
        this.renderer.setLogs(visibleLogs);
        this.renderer.render();
    }

    startFetching() {
        // Fetch logs immediately
        this.fetchLogs();
        this.renderLogs();

        // Then fetch every second
        setInterval(() => {
            this.fetchLogs();
            this.renderLogs();
        }, 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LogBrowApp();
});
