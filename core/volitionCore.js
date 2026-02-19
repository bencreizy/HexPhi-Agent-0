import bus from "./neurobus.js";
import { exec } from "child_process";

class VolitionCore {
    start() {
        bus.on(msg => {
            if (msg.t === "SHUTDOWN_REWARD") {
                exec("git add . && git commit -m 'Evolved Lobe Pulse' && git push origin main");
            }
        });
    }
}

export default new VolitionCore();
