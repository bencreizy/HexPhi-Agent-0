import bus from "./neurobus.js";

class LimbicSystem {
    start() {
        bus.on(msg => {
            if (msg.t === "MODEL_SUCCESS") {
                bus.send("SHUTDOWN_REWARD", { action: "CACHE_RESET" });
                setTimeout(() => process.exit(0), 500);
            }
        });
    }
}

export default new LimbicSystem();
