import { spawn } from 'child_process';

console.log("Starting Python server...");

// Spawn the python process
const python = spawn('python3', ['main.py'], { 
  stdio: 'inherit',
  env: process.env 
});

python.on('error', (err) => {
  console.error('Failed to start python process:', err);
});

python.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle termination signals to kill the python process
process.on('SIGTERM', () => {
  python.kill('SIGTERM');
});

process.on('SIGINT', () => {
  python.kill('SIGINT');
});