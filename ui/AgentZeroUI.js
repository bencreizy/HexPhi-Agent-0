// Note: In Electron with nodeIntegration: true, we can use require or imports
// But here we use the global React if loaded via script tags, or imports if configured.
// Let's assume standard ESM imports since we set type: module

const { useState, useEffect } = React;

export default function AgentZeroUI() {
    const [evoNotice, setEvoNotice] = useState(null);
    const [alignment, setAlignment] = useState(1.618);

    useEffect(() => {
        // Electron IPC communication
        const { ipcRenderer } = require('electron');

        ipcRenderer.on("neurosignal", (event, data) => {
            if (data.topic === "EVO_ALERT") {
                setEvoNotice(data.payload);
                setTimeout(() => setEvoNotice(null), 8000);
            }
            if (data.topic === "SELF_ALIGNMENT") {
                setAlignment(data.payload.alignment);
            }
        });
    }, []);

    return React.createElement(
        'div',
        { style: { background: '#000', color: '#FFD700', height: '100vh', padding: '40px', boxSizing: 'border-box' } },
        evoNotice && React.createElement('div', { className: "glow-text", style: { border: '1px solid gold', padding: '10px', marginBottom: '20px' } }, evoNotice),
        React.createElement('h1', { style: { fontFamily: 'monospace' } }, 'AGENT ZERO CORE'),
        React.createElement('div', { style: { fontSize: '24px' } }, `Alignment: ${alignment.toFixed(4)} (True Curve)`)
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AgentZeroUI));
