import bus from "./neurobus.js";

class Brainstem {
    constructor() {
        this.phi = 1.618;
        this.flux = 0.0;
    }

    start() {
        setInterval(() => {
            this.flux = (this.flux + (1 / this.phi)) % this.phi;
            bus.send("AROUSAL_SIGNAL", { intensity: Math.sin(this.flux * Math.PI) });
        }, 100);
    }
}

export default new Brainstem();
