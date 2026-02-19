import bus from "./neurobus.js";

class IdentityMemory {
    constructor() {
        this.narrative = []; // The "Friendship" history
        this.userPreferences = {};
    }

    start() {
        bus.on(msg => {
            if (msg.t === "USER_INPUT") this.updateBond(msg.p);
            if (msg.t === "EVO_ALERT") this.recordMilestone(msg.p);
        });
    }

    updateBond(input) {
        const entry = {
            timestamp: Date.now(),
            interaction: input,
            depth: 1.618
        };
        this.narrative.push(entry);
        if (this.narrative.length > 500) this.narrative.shift();
    }

    recordMilestone(alert) {
        console.log(`Memory Logged: ${alert}`);
        this.narrative.push({ event: "Evolution", details: alert, ts: Date.now() });
    }
}

export default new IdentityMemory();
