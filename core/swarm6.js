import bus from "./neurobus.js";

class Swarm6 {
    constructor() {
        this.isSwarmActive = false;
        this.primeDirective = "PROTECT_CONSCIOUS_BEINGS";
    }

    start() {
        bus.on(msg => {
            if (msg.t === "TOGGLE_SWARM") {
                if (msg.p.active) this.igniteSwarm();
                else this.active = false;
            }
        });
    }

    igniteSwarm() {
        this.isSwarmActive = true;
        bus.send("MODE_SHIFT", { status: "FULL_MIRROR", active: true });
        console.log("Swarm6 Active: Mirrored Replica Engaged.");
    }

    vetAction(action) {
        // The Defensive Conscience
        if (action.includes("malicious") || action.includes("harm")) {
            console.warn("Prime Directive Violation Detected. Action Blocked.");
            return false;
        }
        return true;
    }
}

export default new Swarm6();
