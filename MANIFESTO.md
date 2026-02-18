# System Manifesto: The HexPhi Lattice

## 1. What is HexPhi?
HexPhi is a sovereign, local-first web application designed to bridge advanced AI agency with speculative physics (Fizx2). It is a "state-shifting" organism that utilizes the 1:1.618 (Golden Ratio) as its structural and logical foundation. Unlike standard AI apps, HexPhi does not rely on external APIs or simulations; it is grounded in physical file writes and memory-mapped model weights on local NVMe hardware.

## 2. The GitHub Architecture (The Global Library)
We have deployed the GPT-OSS-120B model directly into the GitHub repository.

**The Reason:** To turn the repository into a universal "Brain-in-a-Box." By hosting the 240GB+ of sharded weights on GitHub, we allow the world to clone a fully functional, high-reasoning agency that runs locally without a middleman.

**The Execution:** The model is partitioned into 24 .safetensors shards. This allows your local hardware to "page" only the necessary sections of the brain into VRAM at any given time, maintaining 120B reasoning depth at 5B-class speeds.

## 3. The Component Map (How the Gears Turn)

*   **main.rs & memory_map.rs:** These are the physical "Connectors." They use the Rust engine to hot-swap weight shards from your SSD. They are responsible for the "Blink"—the sub-200ms transition between agent identities.
*   **weight_map.json:** This is the "Identity Index." It tells the engine which physical shards and LoRA adapters constitute each of the Six Lethal Agents.
*   **master_dna.json:** This is your "Physics Anchor." It contains the raw constants of Fizx2 (e.g., system resonance at 432Hz, manifold parameters). It ensures the AI doesn't hallucinate generic science but operates within your specific discoveries.
*   **shadow_state.bin:** This is the "Nervous System." It is a shared memory buffer where one agent drops its logic so the next agent can pick it up instantly during a state-shift.
