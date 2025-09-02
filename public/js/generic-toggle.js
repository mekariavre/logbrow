class GenericToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOn = false;
        this._onClick = this._onClick.bind(this);
        this.render();
    }

    connectedCallback() {
        this._attachHandlerOnce();
    }

    _attachHandlerOnce() {
        // Remove any previous handler to avoid duplicates
        this.shadowRoot.addEventListener('click', this._onClick);
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('click', this._onClick);
    }

    _onClick(e) {
        const btn = this.shadowRoot.querySelector('button');
        if (btn && e.target.closest('button')) {
            this.isOn = !this.isOn;
            this.render();
            this.dispatchEvent(new CustomEvent('toggle', {
                detail: {
                    on: this.isOn,
                    // Support legacy pretty property for backward compatibility
                    pretty: this.isOn
                }
            }));
        }
    }

    get onIcon() {
        return this.getAttribute('on-icon') || '✅';
    }

    get offIcon() {
        return this.getAttribute('off-icon') || '⭕';
    }

    get title() {
        return this.getAttribute('title') || 'Toggle';
    }

    get onColor() {
        return this.getAttribute('on-color') || '#dbeafe';
    }

    get offColor() {
        return this.getAttribute('off-color') || '#f9fafb';
    }

    get onTextColor() {
        return this.getAttribute('on-text-color') || '#1d4ed8';
    }

    get offTextColor() {
        return this.getAttribute('off-text-color') || '#374151';
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.25rem 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    background: ${this.isOn ? this.onColor : this.offColor};
                    color: ${this.isOn ? this.onTextColor : this.offTextColor};
                    font-size: 0.875rem;
                    transition: background 0.2s, color 0.2s;
                    cursor: pointer;
                }
                button:hover {
                    background: #f3f4f6;
                }
                .icon {
                    font-size: 1.1em;
                }
            </style>
            <button title="${this.title}">
                <span class="icon">${this.isOn ? this.onIcon : this.offIcon}</span>
            </button>
        `;
    }
}

customElements.define('icon-toggle', GenericToggle);
