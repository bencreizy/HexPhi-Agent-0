import { spawn } from "child_process";
import bus from "./neurobus.js";
import brainstem from "./brainstem.js";
import latentCortex from "./latentCortex.js";
import limbicSystem from "./limbicSystem.js";
import frontalLobe from "./frontalLobe.js";
import parietalLobe from "./parietalLobe.js";
import temporalLobe from "./temporalLobe.js";
import volitionCore from "./volitionCore.js";
import identityMemory from "./identityMemory.js";

async function boot() {
    console.log("Igniting Digital Brain...");

    await bus.start();

    // Start Python Kernel
    const kernel = spawn("python", ["core/kernel.py"], {
        stdio: 'inherit'
    });

    kernel.on("error", (err) => {
        console.error("Failed to start Python Kernel:", err);
    });

    brainstem.start();
    latentCortex.start();
    limbicSystem.start();
    frontalLobe.start();
    parietalLobe.start();
    temporalLobe.start();
    volitionCore.start();
    identityMemory.start();

    console.log("All lobes operational. CNS Synchronized.");
}

boot().catch(err => {
    console.error("Critical Failure in Brain Boot Sequence:", err);
    process.exit(1);
});
