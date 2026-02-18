use memmap2::MmapOptions;
use std::fs::File;
use std::collections::HashMap;
use serde::Deserialize;
use anyhow::{Result, Context};

#[derive(Deserialize, Debug)]
pub struct IdentityConfig {
    pub adapter: String,
    pub primary_shards: Vec<String>,
    pub context_lock: String,
    pub output_target: String,
}

#[derive(Deserialize, Debug)]
pub struct WeightMap {
    pub identities: HashMap<String, IdentityConfig>,
    pub bridge_logic: BridgeLogic,
}

#[derive(Deserialize, Debug)]
pub struct BridgeLogic {
    pub shared_buffer_path: String,
}

pub struct MemoryManager {
    pub config: WeightMap,
    active_maps: Vec<memmap2::Mmap>,
}

impl MemoryManager {
    pub fn new(config_path: &str) -> Result<Self> {
        let file = File::open(config_path)?;
        let config: WeightMap = serde_json::from_reader(file)?;
        Ok(Self { config, active_maps: Vec::new() })
    }

    pub fn shift_identity(&mut self, agent_name: &str) -> Result<()> {
        let identity = self.config.identities.get(agent_name)
            .with_context(|| format!("Identity {} not found", agent_name))?;
        self.active_maps.clear();
        let adapter_file = File::open(&identity.adapter)?;
        let adapter_mmap = unsafe { MmapOptions::new().map(&adapter_file)? };
        self.active_maps.push(adapter_mmap);
        for shard_path in &identity.primary_shards {
            let shard_file = File::open(shard_path)?;
            let shard_mmap = unsafe { MmapOptions::new().map(&shard_file)? };
            self.active_maps.push(shard_mmap);
        }
        Ok(())
    }
}
