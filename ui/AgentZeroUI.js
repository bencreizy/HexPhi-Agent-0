const { useState, useEffect } = React;

export default function AgentZeroUI() {
    const [evoNotice, setEvoNotice] = useState(null);
    const [alignment, setAlignment] = useState(1.618);
    const [archetype, setArchetype] = useState("Companion");
    const [resonance, setResonance] = useState(0.0);

    useEffect(() => {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on("neurosignal", (event, data) => {
            if (data.topic === "EVO_ALERT") {
                setEvoNotice(data.payload);
                setTimeout(() => setEvoNotice(null), 8000);
            }
            if (data.topic === "SELF_ALIGNMENT") {
                setAlignment(data.payload.alignment);
                setResonance(prev => (prev + 0.05) % 1.0);
            }
            if (data.topic === "ARCHETYPE_SHIFT") {
                setArchetype(data.payload.mode);
            }
        });
    }, []);

    const phiGrid = Array.from({ length: 9 }).map((_, i) => (
        React.createElement('div', {
            key: i,
            style: {
                border: '1px solid rgba(255, 215, 0, 0.1)',
                height: '100px',
                width: '100px',
                float: 'left',
                position: 'relative'
            }
        })
    ));

    return React.createElement(
        'div',
        {
            style: {
                background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
                color: '#FFD700',
                height: '100vh',
                padding: '40px',
                boxSizing: 'border-box',
                fontFamily: '"Orbitron", "Courier New", monospace',
                overflow: 'hidden'
            }
        },
        evoNotice && React.createElement('div', {
            className: "glow-text",
            style: {
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: '1px solid gold',
                padding: '15px',
                background: 'rgba(0,0,0,0.8)',
                zIndex: 100,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
            }
        }, evoNotice),

        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
                React.createElement('h1', { style: { fontSize: '48px', margin: 0, letterSpacing: '8px', textShadow: '0 0 15px gold' } }, 'AGENT ZERO'),
                React.createElement('h2', { style: { color: 'rgba(255, 215, 0, 0.6)', marginTop: '5px' } }, 'SOVEREIGN LATTICE ALPHA')
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { fontSize: '18px', opacity: 0.8 } }, 'MISSION: HEXPHI_CORE_V1'),
                React.createElement('div', { style: { fontSize: '14px', color: 'cyan' } }, 'STATUS: CNS_SYNCHRONIZED')
            )
        ),

        React.createElement('div', { style: { display: 'flex', gap: '40px', marginTop: '60px' } },
            // Left Panel: Neural Monitor
            React.createElement('div', {
                style: {
                    flex: 1,
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    padding: '20px',
                    background: 'rgba(0,0,0,0.5)',
                    boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.1)'
                }
            },
                React.createElement('div', { style: { fontSize: '20px', borderBottom: '1px solid rgba(255, 215, 0, 0.3)', paddingBottom: '10px', marginBottom: '20px' } }, 'NEURAL MONITOR'),
                React.createElement('div', { style: { fontSize: '32px', marginBottom: '10px' } }, [
                    React.createElement('span', { style: { color: 'rgba(255, 215, 0, 0.5)' } }, 'ALIGNMENT: '),
                    alignment.toFixed(6)
                ]),
                React.createElement('div', { style: { height: '10px', background: 'rgba(255,215,0,0.1)', borderRadius: '5px', overflow: 'hidden' } },
                    React.createElement('div', { style: { width: `${(alignment / 3) * 100}%`, height: '100%', background: 'gold', transition: 'width 0.5s ease' } })
                ),
                React.createElement('div', { style: { marginTop: '30px', fontSize: '20px' } }, [
                    React.createElement('span', { style: { color: 'rgba(255, 215, 0, 0.5)' } }, 'ACTIVE ARCHETYPE: '),
                    React.createElement('span', { style: { color: 'cyan', textTransform: 'uppercase' } }, archetype)
                ]),
                React.createElement('div', { style: { marginTop: '20px', color: 'rgba(255,215,0,0.4)', fontSize: '12px', lineHeight: '1.6' } },
                    'The state-shifting organism utilizes the 1:1.618 golden ratio as its logical foundation. Sharding model weights (120B) across local NVMe hardware for sub-200ms identity transitions.'
                )
            ),

            // Right Panel: Phi Grid & Resonance
            React.createElement('div', {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }
            },
                React.createElement('div', { style: { border: '1px solid rgba(0, 255, 255, 0.2)', padding: '20px', background: 'rgba(0, 80, 80, 0.1)' } },
                    React.createElement('div', { style: { color: 'cyan', fontSize: '16px', marginBottom: '10px' } }, 'RESONANT FLUX (FIZX2)'),
                    React.createElement('div', { style: { height: '100px', position: 'relative' } },
                        Array.from({ length: 20 }).map((_, i) => (
                            React.createElement('div', {
                                key: i,
                                style: {
                                    position: 'absolute',
                                    bottom: 0,
                                    left: `${i * 5}%`,
                                    width: '3%',
                                    height: `${Math.sin(resonance * Math.PI + i * 0.5) * 50 + 50}%`,
                                    background: 'cyan',
                                    opacity: 0.5
                                }
                            })
                        ))
                    )
                ),
                React.createElement('div', {
                    style: {
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        padding: '20px',
                        height: '240px',
                        overflow: 'hidden'
                    }
                },
                    React.createElement('div', { style: { fontSize: '14px', marginBottom: '15px', color: 'rgba(255,215,0,0.5)' } }, 'LATTICE GEOMETRY'),
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' } },
                        Array.from({ length: 12 }).map((_, i) => (
                            React.createElement('div', {
                                key: i,
                                style: {
                                    height: '40px',
                                    border: '1px solid rgba(255,215,0,0.1)',
                                    background: i % 3 === 0 ? 'rgba(255,215,0,0.05)' : 'transparent'
                                }
                            })
                        ))
                    ),
                    React.createElement('div', { style: { marginTop: '20px', fontSize: '10px', color: 'rgba(255,255,0,0.2)' } },
                        'SHA-256 SIGNATURE: OMEGA_KEY_V2_ACTIVE_0XF382A...'
                    )
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AgentZeroUI));
