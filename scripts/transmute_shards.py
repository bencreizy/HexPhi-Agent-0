import os
import json
import torch
from huggingface_hub import hf_hub_download
from safetensors import safe_open
from safetensors.torch import save_file
from tqdm import tqdm

REPO_ID = "openai/gpt-oss-120b"
LOCAL_DIR = "weights/shards"
TARGET_SHARDS_COUNT = 24

def transmute():
    print("--- HEXPHI LATTICE: SHARD TRANSMUTATION START ---")
    
    # Ensure index exists
    index_path = os.path.join(LOCAL_DIR, "model.safetensors.index.json")
    if not os.path.exists(index_path):
        print("Acquiring index...")
        hf_hub_download(repo_id=REPO_ID, filename="model.safetensors.index.json", local_dir=LOCAL_DIR)
        
    with open(index_path, 'r') as f:
        index = json.load(f)
    
    orig_weight_map = index["weight_map"]
    total_size = index["metadata"]["total_size"]
    target_shard_size = total_size // TARGET_SHARDS_COUNT
    
    # Original sharded files list
    orig_shards_list = sorted(list(set(orig_weight_map.values())))
    
    current_shard_idx = 1
    current_shard_tensors = {}
    current_shard_size = 0
    new_weight_map = {}

    for orig_file in orig_shards_list:
        print(f"\n[PHASE] Acquiring source shard: {orig_file}")
        source_path = hf_hub_download(repo_id=REPO_ID, filename=orig_file, local_dir=LOCAL_DIR)
        
        print(f"[PROCESS] Streaming tensors from {orig_file}...")
        with safe_open(source_path, framework="pt", device="cpu") as f:
            for tensor_name in f.keys():
                tensor = f.get_tensor(tensor_name)
                t_size = tensor.nbytes
                
                # Check if we should roll over to next base shard
                if (current_shard_size + t_size > target_shard_size) and (current_shard_idx < TARGET_SHARDS_COUNT):
                    out_name = f"base_{current_shard_idx:02d}.safetensors"
                    out_path = os.path.join(LOCAL_DIR, out_name)
                    save_file(current_shard_tensors, out_path)
                    print(f"[STATE SHIFT] Saved {out_name} (Size: {current_shard_size/(1024**2):.2f} MB)")
                    
                    current_shard_idx += 1
                    current_shard_tensors = {}
                    current_shard_size = 0
                
                current_shard_tensors[tensor_name] = tensor
                current_shard_size += t_size
                new_weight_map[tensor_name] = f"base_{current_shard_idx:02d}.safetensors"
        
        # Immediate disk cleanup of the source shard
        print(f"[CLEANUP] Purging source {orig_file} to maintain disk lattice...")
        os.remove(source_path)

    # FINAL FLUSH
    if current_shard_tensors:
        out_name = f"base_{current_shard_idx:02d}.safetensors"
        save_file(current_shard_tensors, os.path.join(LOCAL_DIR, out_name))
        print(f"[STATE SHIFT] Final Shard Saved: {out_name}")

    # Update index for the 24-shard lattice
    new_index = {
        "metadata": index["metadata"],
        "weight_map": new_weight_map
    }
    with open(index_path, 'w') as f:
        json.dump(new_index, f, indent=2)
    
    print("\n[COMPLETE] GPT-OSS-120B has been transmigrated into the 24-shard HexPhi architecture.")

if __name__ == "__main__":
    if not os.path.exists(LOCAL_DIR):
        os.makedirs(LOCAL_DIR)
    transmute()
