import zmq
import json
import torch
import time
import os
from micro_gpt_fizx import MicroGPT

def main():
    context = zmq.Context()
    
    # Connect to NeuroBus
    # Bus Pub (5556) -> Kernel Sub
    # Kernel Pub (5557) -> Bus Sub
    
    sub = context.socket(zmq.SUB)
    sub.connect("tcp://127.0.0.1:5556")
    sub.subscribe("")
    
    pub = context.socket(zmq.PUB)
    pub.bind("tcp://127.0.0.1:5557")
    
    model = MicroGPT()
    phi = 1.61803398875
    
    print("Python Kernel Active. Model loaded with Phi resonance.")
    
    knowledge_path = "knowledge/agent_behavior.json"
    
    while True:
        try:
            # Sync with behavior knowledge
            if os.path.exists(knowledge_path):
                with open(knowledge_path, 'r') as f:
                    behavior = json.load(f)
                    # Adjust model resonance based on coherence in repo
                    coherence = behavior.get("coherence", 1.618)
                    phi = 1.61803398875 * (coherence / 1.618)

            # Non-blocking receive for signals
            try:
                msg = sub.recv_json(flags=zmq.NOBLOCK)
                # Process messages if needed
                if msg.get('t') == 'AROUSAL_SIGNAL':
                    # Adjust model state or parameters based on flux
                    pass
            except zmq.Again:
                pass
            
            # Periodically pulse self-alignment
            alignment_data = {
                "t": "SELF_ALIGNMENT",
                "p": { "alignment": phi + (torch.randn(1).item() * 0.01) },
                "s": "sha256_signature_placeholder" # NeuroBus expects a signature but we'll simplify
            }
            pub.send_string(json.dumps(alignment_data))
            
            time.sleep(1) # Pulse every second
            
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Kernel Error: {e}")
            time.sleep(1)

if __name__ == "__main__":
    main()
