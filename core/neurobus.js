import zmq from "zeromq";
import { createHash } from "crypto";

class NeuroBus {
    constructor() {
        this.pub = new zmq.Publisher();
        this.sub = new zmq.Subscriber();
        this.omegaSecret = "OMEGA_KEY_V2_ACTIVE";
    }

    async start() {
        await this.pub.bind("tcp://127.0.0.1:5556");
        this.sub.connect("tcp://127.0.0.1:5557");
        this.sub.subscribe("");
    }

    send(topic, payload) {
        const packet = JSON.stringify(payload);
        const signature = createHash('sha256').update(packet + this.omegaSecret).digest('hex');
        this.pub.send(JSON.stringify({ t: topic, p: payload, s: signature }));
    }

    on(fn) {
        (async () => {
            for await (const [msg] of this.sub) {
                const decoded = JSON.parse(msg.toString());
                if (decoded.s) fn(decoded);
            }
        })();
    }
}

export default new NeuroBus();
