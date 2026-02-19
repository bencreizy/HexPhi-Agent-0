import zmq
import json
import torch
import time
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
    
    while True:
        try:
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
