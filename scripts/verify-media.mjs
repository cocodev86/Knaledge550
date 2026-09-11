import { createHash } from "node:crypto";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(repoRoot, "public");
const manifestPath = path.join(publicDir, "media-manifest.json");
const sourceRoots = [path.join(repoRoot, "app"), path.join(repoRoot, "lib")];
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".css"]);
const mediaReferencePattern = /["'`](\/[A-Za-z0-9_./-]+\.(?:webp|mp4))["'`]/g;
const failures = [];

const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

async function listSourceFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await listSourceFiles(fullPath)));
    else if (sourceExtensions.has(path.extname(entry.name))) output.push(fullPath);
  }
  return output;
}

let manifest;
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  console.error("❌ Production media integrity failed: media-manifest.json is missing or invalid.");
  console.error(error.message);
  process.exit(1);
}

if (!Array.isArray(manifest) || manifest.length === 0) {
  console.error("❌ Production media integrity failed: media-manifest.json has no asset entries.");
  process.exit(1);
}

const expectedByFile = new Map();
for (const entry of manifest) {
  if (!entry?.file || !Number.isInteger(entry.bytes) || !entry.sha256) {
    failures.push(`Invalid manifest entry: ${JSON.stringify(entry)}`);
    continue;
  }
  expectedByFile.set(entry.file, entry);
  const assetPath = path.join(publicDir, entry.file);
  try {
    const buffer = await readFile(assetPath);
    const actualBytes = buffer.byteLength;
    const actualHash = sha256(buffer);
    if (actualBytes !== entry.bytes) {
      failures.push(`${entry.file}: expected ${entry.bytes} bytes, found ${actualBytes}`);
    }
    if (actualHash !== entry.sha256) {
      failures.push(`${entry.file}: SHA-256 mismatch (expected ${entry.sha256}, found ${actualHash})`);
    }
  } catch {
    failures.push(`${entry.file}: missing from public/`);
  }
}

for (const root of sourceRoots) {
  try {
    await access(root);
  } catch {
    continue;
  }
  for (const sourceFile of await listSourceFiles(root)) {
    const content = await readFile(sourceFile, "utf8");
    for (const match of content.matchAll(mediaReferencePattern)) {
      const reference = match[1];
      const file = path.basename(reference);
      if (!expectedByFile.has(file)) {
        failures.push(`${path.relative(repoRoot, sourceFile)} references ${reference}, but it is not declared in media-manifest.json`);
      }
      try {
        const assetStat = await stat(path.join(publicDir, reference.slice(1)));
        if (!assetStat.isFile()) failures.push(`${reference}: does not resolve to a file in public/`);
      } catch {
        failures.push(`${path.relative(repoRoot, sourceFile)} references missing asset ${reference}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`❌ Production media integrity failed with ${failures.length} issue(s):`);
  for (const failure of [...new Set(failures)]) console.error(` - ${failure}`);
  console.error("\nRestore the exact approved binaries so byte counts and SHA-256 hashes match public/media-manifest.json.");
  process.exit(1);
}

console.log(`✅ Production media integrity passed: ${manifest.length} manifest assets verified and all source references resolve.`);
