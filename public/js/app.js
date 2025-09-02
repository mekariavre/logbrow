// Main application logic
class LogBrowseApp {
    constructor() {
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
    }

    async fetchLogs() {
        try {
            const res = await fetch('/logs');
            const data = await res.json();
            this.renderer.setLogs(data);
            this.renderer.render();
        } catch (error) {
            console.error('Failed to fetch logs:', error);
            this.renderer.setLogs([]);
            this.renderer.render();
        }
    }

    startFetching() {
        // Fetch logs immediately
        this.fetchLogs();

        // Then fetch every second
        setInterval(() => {
            this.fetchLogs();
        }, 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LogBrowseApp();
});
