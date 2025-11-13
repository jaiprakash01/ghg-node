import { execSync } from 'child_process';

const DEFAULT_PORT = parseInt(process.env.PORT || '5001', 10);

const ports = new Set();

if (process.env.PORT_RANGE) {
  const range = process.env.PORT_RANGE.split(',').map((p) => parseInt(p.trim(), 10)).filter(Boolean);
  range.forEach((port) => ports.add(port));
}

ports.add(DEFAULT_PORT);

const killPort = (port) => {
  try {
    execSync(`lsof -ti :${port} | xargs kill -9`, { stdio: 'ignore' });
    console.log(`🛑 Cleared port ${port}`);
  } catch {
    // Ignore if nothing was running on that port
  }
};

ports.forEach((port) => killPort(port));


