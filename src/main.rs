mod memory_map;
use crate::memory_map::MemoryManager;
use std::fs;
use anyhow::{Result, Context};

fn main() -> Result<()> {
    println!("IGNITING AGENT 0: THE PUPPETEER");
    let mut puppeteer = MemoryManager::new("knowledge/weight_map.json")?;
    let agents = vec!["strategist", "architect", "engineer", "debugger", "designer", "authority"];
    
    for agent in agents {
        println!("\n[STATE SHIFT] Loading Identity: {}", agent.to_uppercase());
        puppeteer.shift_identity(agent)?;
        
        let identity = puppeteer.config.identities.get(agent).unwrap();
        println!("[CONTEXT LOCK] Verified Access to: {}", identity.context_lock);
        println!("[TARGET] Output Route: {}", identity.output_target);
    }
    
    println!("\n[MISSION STATUS] Initial Handshake Successful. Engine stands ready.");
    Ok(())
}
