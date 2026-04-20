/**
 * Custom test runner for crawl tests.
 *
 * Starts a static file server that mirrors Vercel's routing behaviour:
 *   - 301 redirects for short-form surface routes
 *   - 301 redirects for trailing-slash variants
 *   - clean URL serving (dist/calculator/index.html for /calculator)
 *   - real 404 with dist/404.html for unknown routes
 *
 * Does NOT use `vite preview` (SPA mode serves index.html for every route,
 * defeating per-route prerendered files and proper 404 responses).
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

// 301 redirects — mirrors vercel.json
const REDIRECTS_301 = {
  "/driveway":      "/calculators/driveway",
  "/roof":          "/calculators/roof",
  "/house-washing": "/calculators/house-washing",
  "/deck":          "/calculators/deck",
};

function serve404(res) {
  const notFoundPath = join(DIST, "404.html");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  if (existsSync(notFoundPath)) {
    createReadStream(notFoundPath).pipe(res);
  } else {
    res.end("<h1>404 Not Found</h1>");
  }
}

const server = createServer((req, res) => {
  const raw = (req.url || "/").split("?")[0].split("#")[0];
  const pathname = raw || "/";

  // trailing slash redirect (except root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    res.writeHead(301, { "Location": pathname.slice(0, -1) });
    res.end();
    return;
  }

  // short-form 301 redirects
  if (REDIRECTS_301[pathname]) {
    res.writeHead(301, { "Location": REDIRECTS_301[pathname] });
    res.end();
    return;
  }

  // exact file
  const candidate = join(DIST, pathname);
  if (existsSync(candidate) && statSync(candidate).isFile()) {
    const ext = extname(candidate);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    createReadStream(candidate).pipe(res);
    return;
  }

  // clean URL: /calculator → dist/calculator/index.html
  const dirIndex = join(candidate, "index.html");
  if (existsSync(dirIndex)) {
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    const stream = createReadStream(dirIndex);
    stream.on("error", () => serve404(res));
    stream.pipe(res);
    return;
  }

  // unknown route — real 404
  serve404(res);
});

function waitForPort(port, timeout = 15_000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout;
    function attempt() {
      const sock = createConnection(port, "127.0.0.1");
      sock.once("connect", () => { sock.destroy(); resolve(); });
      sock.once("error", () => {
        sock.destroy();
        if (Date.now() >= deadline) reject(new Error(`Port ${port} not ready after ${timeout}ms`));
        else setTimeout(attempt, 100);
      });
    }
    attempt();
  });
}

async function main() {
  await new Promise((resolve, reject) => {
    server.listen(PORT, "0.0.0.0", resolve);
    server.once("error", reject);
  });
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
