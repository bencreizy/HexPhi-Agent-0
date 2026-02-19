import { app, BrowserWindow, ipcMain } from "electron";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function ignite() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 900,
        backgroundColor: "#000000",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, "ui/index.html"));

    // Start the Digital Brain (Node Lobes)
    const brain = spawn("node", ["core/boot.js"], {
        env: { ...process.env },
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    brain.on("message", (msg) => {
        if (mainWindow) {
            mainWindow.webContents.send("neurosignal", msg);
        }
    });

    brain.on("error", (err) => {
        console.error("Failed to start brain process:", err);
    });
}

app.whenReady().then(ignite);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
