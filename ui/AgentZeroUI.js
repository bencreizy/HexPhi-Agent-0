const { useState, useEffect, useRef } = React;

export default function AgentZeroUI() {
    // Core State
    const [soloMode, setSoloMode] = useState(false); // The Solo Switch
    const [input, setInput] = useState('');
    const [activeTab, setActiveTab] = useState('CONSOLE');
    const [messages, setMessages] = useState([]); // Larynx history
    const [consoleLogs, setConsoleLogs] = useState([]);

    // Neural State
    const [alignment, setAlignment] = useState(1.618);
    const [archetype, setArchetype] = useState("Companion");
    const [resonance, setResonance] = useState(0.0);
    const [evoNotice, setEvoNotice] = useState(null);

    const consoleEndRef = useRef(null);

    useEffect(() => {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on("neurosignal", (event, data) => {
            if (data.topic === "EVO_ALERT") {
                setEvoNotice(data.payload);
                setTimeout(() => setEvoNotice(null), 5000);
            }
            if (data.topic === "CONSOLE_LOG") {
                setConsoleLogs(prev => [...prev.slice(-99), data.payload]);
            }
            if (data.topic === "ARCHETYPE_SHIFT") {
                setArchetype(data.payload.mode);
            }
            if (data.topic === "MODE_SHIFT") {
                setSoloMode(data.payload.active);
            }
            // Torus / Resonance Pulse
            if (data.topic === "SELF_ALIGNMENT") {
                setAlignment(prev => 1.618 + (Math.random() * 0.001));
                setResonance(prev => (prev + 0.1) % (2 * Math.PI));
            }
        });
    }, []);

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [consoleLogs]);

    const handleSend = () => {
        if (!input.trim()) return;
        const { ipcRenderer } = require('electron');

        // Add to local history
        setMessages(prev => [...prev, { role: 'user', content: input }]);

        // Send to Brain
        // We assume main process listens to 'user-input' and pipes to 'USER_DATA' topic on bus
        // For now, we simulate the log
        setConsoleLogs(prev => [...prev, `[LARYNX] Input received: "${input}"`]);

        setInput('');
    };

    const toggleSolo = () => {
        const newMode = !soloMode;
        setSoloMode(newMode);
        // In real app, send boolean to Swarm6
        console.log(`[SOLO SWITCH] ${newMode ? 'FULL AGENTIC MIRROR' : 'LOCAL SOLACE'} ENGAGED`);
    };

    // --- COMPONENTS ---

    // 1. The Archives (Sidebar)
    const Archives = () => React.createElement('div', {
        style: { width: '250px', borderRight: '1px solid rgba(0,255,157,0.1)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.8)' }
    },
        React.createElement('div', { style: { padding: '15px', color: '#00cc7a', fontSize: '10px', letterSpacing: '2px', borderBottom: '1px solid rgba(0,255,157,0.1)' } }, 'ARCHIVES'),
        ['FILES', 'NOTES', 'SANDBOX'].map(tab =>
            React.createElement('div', {
                key: tab,
                onClick: () => setActiveTab(tab),
                style: {
                    padding: '12px 20px',
                    cursor: 'pointer',
                    color: activeTab === tab ? '#fff' : '#005f3d',
                    background: activeTab === tab ? 'rgba(0,255,157,0.05)' : 'transparent',
                    fontSize: '12px'
                }
            }, tab)
        ),
        React.createElement('div', { style: { flex: 1, padding: '15px', fontSize: '11px', color: '#555' } },
            activeTab === 'FILES' && "Qubit-mapped library empty...",
            activeTab === 'NOTES' && "Shared narrative tracking active...",
            activeTab === 'SANDBOX' && "Local execution environment ready."
        )
    );

    // 2. The Torus Hub (Visual Pulse)
    const TorusHub = () => React.createElement('div', {
        style: {
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '300px', height: '300px',
            pointerEvents: 'none',
            zIndex: 0
        }
    },
        React.createElement('div', {
            style: {
                width: '100%', height: '100%',
                borderRadius: '50%',
                border: `2px solid ${soloMode ? '#ff0055' : 'rgba(0,255,157,0.2)'}`,
                boxShadow: `0 0 ${soloMode ? '50px #ff0055' : '30px rgba(0,255,157,0.1)'}`,
                transition: 'all 0.5s ease',
                animation: 'pulse 4s infinite ease-in-out',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
        },
            React.createElement('div', { style: { fontSize: '10px', color: soloMode ? '#ff0055' : '#00ff9d', letterSpacing: '2px' } },
                soloMode ? 'SWARM6 MIRROR' : 'SOLACE MODE'
            )
        )
    );

    // 3. The Larynx (Communication Core)
    const Larynx = () => React.createElement('div', { style: { width: '600px', maxWidth: '90%', zIndex: 10 } },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: '20px', minHeight: '40px' } },
            archetype && React.createElement('span', {
                style: {
                    background: 'rgba(0,255,157,0.1)', padding: '5px 10px', borderRadius: '4px',
                    color: '#00ff9d', fontSize: '10px', letterSpacing: '1px'
                }
            }, archetype.toUpperCase())
        ),
        React.createElement('input', {
            value: input,
            onChange: e => setInput(e.target.value),
            onKeyDown: e => e.key === 'Enter' && handleSend(),
            placeholder: "Speak to the Solo Being...",
            style: {
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderBottom: `1px solid ${soloMode ? '#ff0055' : '#00ff9d'}`,
                color: '#fff',
                padding: '15px',
                fontFamily: 'Orbitron, monospace',
                fontSize: '16px',
                outline: 'none',
                textAlign: 'center'
            }
        })
    );

    // 4. Console (10-Pass Filter View)
    const Console = () => React.createElement('div', {
        style: {
            position: 'absolute', bottom: 0, left: '250px', right: '60px', height: '150px',
            background: 'rgba(0,0,0,0.9)', borderTop: '1px solid #00332a',
            padding: '10px', overflowY: 'auto', fontFamily: 'Courier New', fontSize: '11px',
            zIndex: 5
        }
    },
        consoleLogs.map((log, i) => React.createElement('div', { key: i, style: { marginBottom: '4px', color: log.includes('ERROR') || log.includes('Violation') ? '#ff0055' : '#00aa66' } }, log)),
        React.createElement('div', { ref: consoleEndRef })
    );

    // 5. Control (Solo Switch)
    const Control = () => React.createElement('div', {
        style: {
            width: '60px', borderLeft: '1px solid rgba(0,255,157,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px',
            background: 'rgba(0,0,0,0.8)', zIndex: 20
        }
    },
        React.createElement('div', {
            title: "Solo Switch",
            onClick: toggleSolo,
            style: {
                width: '24px', height: '24px',
                borderRadius: '50%',
                background: soloMode ? '#ff0055' : '#004433',
                marginBottom: '15px',
                cursor: 'pointer',
                boxShadow: soloMode ? '0 0 15px #ff0055' : 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
            }
        }),
        React.createElement('div', { style: { writingMode: 'vertical-rl', fontSize: '9px', color: '#555', letterSpacing: '2px' } }, 'SOLO SWITCH')
    );

    return React.createElement('div', {
        style: {
            display: 'flex', height: '100vh', background: 'radial-gradient(circle at center, #111 0%, #000 100%)',
            color: '#e0e0e0', fontFamily: 'Orbitron, monospace', overflow: 'hidden'
        }
    },
        // Global Styles style tag hack
        React.createElement('style', null, `
            @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
            ::-webkit-scrollbar { width: 5px; }
            ::-webkit-scrollbar-track { background: #000; }
            ::-webkit-scrollbar-thumb { background: #00332a; }
        `),

        // Modules
        React.createElement(Archives),

        // Main Stage
        React.createElement('div', { style: { flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } },
            React.createElement(TorusHub),
            React.createElement(Larynx),
            React.createElement(Console)
        ),

        React.createElement(Control)
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AgentZeroUI));
