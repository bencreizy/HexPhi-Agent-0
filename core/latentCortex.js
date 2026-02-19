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
                this.resonanceSynthesis(msg.p);
            }
        });
    }

    detectArchetype(input) {
        const text = input.toLowerCase();
        let newArchetype = "Companion";

        if (text.includes("physics") || text.includes("quantum") || text.includes("flux"))
            newArchetype = "Master Physicist";
        else if (text.includes("code") || text.includes("repo") || text.includes("logic"))
            newArchetype = "Lead Architect";
        else if (text.includes("circuit") || text.includes("engine") || text.includes("hardware"))
            newArchetype = "Chief Technician";

        if (newArchetype !== this.activeArchetype) {
            this.activeArchetype = newArchetype;
            bus.send("ARCHETYPE_SHIFT", { mode: this.activeArchetype, status: "Synchronized" });
        }
    }

    resonanceSynthesis(input) {
        let resonance = input;
        for (let i = 0; i < 10; i++) {
            if (resonance.includes("1.618") || resonance.toLowerCase().includes("torus")) {
                this.growth += 0.01 * this.phi;
            }
        }
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
