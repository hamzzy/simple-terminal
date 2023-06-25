// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use std::io::{self, Write};
use std::process::{Command, Stdio};
use tauri::command;
use tauri::Manager;


struct Output{
  output: String,
}


#[tauri::command]
fn execute_command(command: String)-> String{
    let mut parts = command.split_whitespace();
    if let Some(program) = parts.next() {
        let args: Vec<&str> = parts.collect();
        let mut child = Command::new(program)
            .args(args)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .output()
            .expect("failed to execute command");

        let stdout = String::from_utf8_lossy(&child.stdout);
        let stderr = String::from_utf8_lossy(&child.stderr);

        if child.status.success() {
          String::from_utf8_lossy(&child.stdout).to_string()
      } else {
          String::from_utf8_lossy(&child.stderr).to_string()
      }
  } else {
      String::new()
  }

       

}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![execute_command])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
