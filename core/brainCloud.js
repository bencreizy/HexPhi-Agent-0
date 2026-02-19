import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bus from './neurobus.js';

class BrainCloud {
    constructor() {
        this.db = null;
    }

    async init() {
        try {
            this.db = await open({
                filename: './knowledge/brain_cloud.db',
                driver: sqlite3.Database
            });
            // Creating the 'Lore' table for persistent agentic memory
            await this.db.exec('CREATE TABLE IF NOT EXISTS lore (id INTEGER PRIMARY KEY, event TEXT, ts DATETIME, archetype TEXT)');
            console.log("BrainCloud: CIGOL Persistence Active.");
        } catch (err) {
            console.error("BrainCloud Init Error:", err);
        }

        // Listen for new lore
        bus.on(msg => {
            if (msg.t === "LORE_UPDATE") {
                this.record(msg.p);
            }
        });
    }

    async record(data) {
        if (!this.db) return;
        const { event, archetype } = data;
        const ts = new Date().toISOString();
        try {
            await this.db.run('INSERT INTO lore (event, ts, archetype) VALUES (?, ?, ?)', event, ts, archetype || 'System');
        } catch (e) {
            console.error("Lore Record Error:", e);
        }
    }
}

export default new BrainCloud();
