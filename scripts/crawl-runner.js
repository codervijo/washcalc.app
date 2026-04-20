/**
 * Custom test runner for crawl tests.
 *
 * Starts a static file server that correctly handles clean URLs
 * (e.g. /calculator → dist/calculator/index.html), verifies it's
 * accepting connections, runs vitest, then shuts down.
 *
 * Does NOT use `vite preview` because vite's SPA fallback mode
 * serves dist/index.html for every route, defeating per-route
 * prerendered files.
 *
 * No extra npm dependencies — uses Node built-ins only.
 */
import { createServer } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { join, extname, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { createConnection } from "net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const PORT = parseInt(process.env.CRAWL_PORT || "4200", 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".svg":  "image/svg+xml",
  ".xml":  "application/xml; charset=utf-8",
  ".txt":  "text/plain; charset=utf-8",
  ".ico":  "image/x-icon",
  ".json": "application/json",
};

function resolveFile(urlPath) {
  const pathname = urlPath.split("?")[0].split("#")[0] || "/";
  const candidate = join(DIST, pathname);

  // exact file
  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }
  // clean URL: /calculator → dist/calculator/index.html
  const dirIndex = join(candidate, "index.html");
  if (existsSync(dirIndex)) return dirIndex;

  // SPA fallback
  return join(DIST, "index.html");
}

const server = createServer((req, res) => {
  const filePath = resolveFile(req.url || "/");
  const ext = extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  const stream = createReadStream(filePath);
  stream.on("error", (err) => {
    console.error("stream error:", err.message, filePath);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
  stream.pipe(res);
});

// wait until the server actually accepts a TCP connection
function waitForPort(port, timeout = 15_000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout;
    function attempt() {
      const sock = createConnection(port, "127.0.0.1");
      sock.once("connect", () => { sock.destroy(); resolve(); });
      sock.once("error", () => {
        sock.destroy();
        if (Date.now() >= deadline) {
          reject(new Error(`Port ${port} not ready after ${timeout}ms`));
        } else {
          setTimeout(attempt, 100);
        }
      });
    }
    attempt();
  });
}

async function main() {
  await new Promise((resolve, reject) => {
    // bind on all interfaces so both 127.0.0.1 and ::1 work
    server.listen(PORT, "0.0.0.0", resolve);
    server.once("error", reject);
  });

  // confirm it's really accepting connections before spawning vitest
  await waitForPort(PORT);
  console.log(`\n  static server ready on http://localhost:${PORT}\n`);

  const proc = spawn(
    "node_modules/.bin/vitest",
    ["run", "tests/crawl.test.js"],
    { stdio: "inherit", env: { ...process.env, CRAWL_PORT: String(PORT) } }
  );

  const code = await new Promise((resolve) => proc.once("close", resolve));
  server.close();
  process.exitCode = code;
}

main().catch((err) => { console.error(err); process.exit(1); });
