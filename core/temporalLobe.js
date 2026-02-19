import bus from "./neurobus.js";

class TemporalLobe {
    constructor() {
        this.narrative = [];
    }

    start() {
        bus.on(msg => {
            if (msg.t === "EVO_ALERT") {
                const compressed = Buffer.from(msg.p).toString('base64');
                this.narrative.push(compressed);
            }
        });
    }
}

export default new TemporalLobe();
