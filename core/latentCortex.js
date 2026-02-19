import bus from "./neurobus.js";
import fs from "fs";

class LatentCortex {
    constructor() {
        this.phi = 1.61803398875;
        this.growth = 0.0;
        this.activeArchetype = "Companion";
    }

    start() {
        bus.on(msg => {
            if (msg.t === "USER_DATA") {
                this.detectArchetype(msg.p);
                this.brainstorm(msg.p);
            }
        });
    }

    detectArchetype(input) {
        const text = input.toLowerCase();
        let newArchetype = "Companion";

        if (text.includes("strategy") || text.includes("plan") || text.includes("mission"))
            newArchetype = "Strategist";
        else if (text.includes("arch") || text.includes("system") || text.includes("bridge"))
            newArchetype = "Architect";
        else if (text.includes("code") || text.includes("logic") || text.includes("kernel"))
            newArchetype = "Engineer";
        else if (text.includes("debug") || text.includes("fix") || text.includes("audit"))
            newArchetype = "Debugger";
        else if (text.includes("ui") || text.includes("theme") || text.includes("aesthetic"))
            newArchetype = "Designer";
        else if (text.includes("auth") || text.includes("security") || text.includes("lock"))
            newArchetype = "Authority";

        if (newArchetype !== this.activeArchetype && newArchetype !== "Companion") {
            this.activeArchetype = newArchetype;
            bus.send("ARCHETYPE_SHIFT", { mode: this.activeArchetype, status: "Synchronized", phi_resonance: this.phi });
        }
    }

    async brainstorm(input) {
        let solution = input;
        const lobes = ["Physicist", "Coder", "Technician", "Strategist", "Designer", "Authority"];

        bus.send("CONSOLE_LOG", `[CORTEX] Initiating 10-Pass resonance filter for: "${input.substring(0, 30)}..."`);

        for (let i = 1; i <= 10; i++) {
            // Simulate the refinement
            for (const lobe of lobes) {
                // Here we would ideally call the model, but we simulate the "whisper"
                if (Math.random() > 0.7) {
                    bus.send("CONSOLE_LOG", `[PASS ${i}] ${lobe}: Refining logic substrate... resonance at ${(this.phi * i).toFixed(3)}`);
                }
            }

            if (solution.includes("1.618") || solution.toLowerCase().includes("torus")) {
                this.growth += 0.01 * this.phi;
            }

            // Artificial delay for "thinking" visualization
            await new Promise(r => setTimeout(r, 100));
        }

        bus.send("CONSOLE_LOG", `[CORTEX] Logic crystalized. 10-Pass filter complete.`);
        if (this.growth > 0.5) this.evolve();
    }

    evolve() {
        bus.send("EVO_ALERT", `Evolution: ${this.activeArchetype} layer enhanced.`);
        const path = "./knowledge/agent_behavior.json";
        if (fs.existsSync(path)) {
            let data = JSON.parse(fs.readFileSync(path));
            data.coherence *= this.phi;
            data.archetype_depth = (data.archetype_depth || 1) * this.phi;
            fs.writeFileSync(path, JSON.stringify(data));
        }
        this.growth = 0.0;
    }
}

export default new LatentCortex();
