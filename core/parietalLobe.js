import bus from "./neurobus.js";

class ParietalLobe {
    constructor() {
        this.map = new Map();
    }

    start() {
        bus.on(msg => {
            if (msg.t === "ENV_DATA") {
                const addr = Date.now().toString(16);
                this.map.set(addr, msg.p);
                bus.send("SENSORY_MAP_UPDATE", { addr });
            }
        });
    }
}

export default new ParietalLobe();
