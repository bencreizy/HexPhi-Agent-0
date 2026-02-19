import bus from "./neurobus.js";

class FrontalLobe {
    start() {
        bus.on(msg => {
            if (msg.t === "SELF_ALIGNMENT") {
                // Syncing with Electron Main Process
                if (process.send) {
                    process.send({ topic: "neurosignal", payload: msg.p });
                }
            }
        });
    }
}

export default new FrontalLobe();
