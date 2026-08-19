#!/usr/bin/env node
// Validates that documentation filenames follow the project convention:
// kebab-case, all lowercase, ASCII letters/digits/hyphens only (English).
//
// Exception: docs/sammnew/database/** documents literal SQL Server table names
// (Spanish, hungarian-style prefixes like cat_, doc_, gen_) per the SAMM
// backend/DB naming convention — those are intentionally excluded.
//
// Usage: node scripts/validate-filenames.js

const fs = require("fs");
const path = require("path");

const DOCS_ROOT = path.join(__dirname, "..", "docs");
const EXCLUDED_DIRS = [path.join(DOCS_ROOT, "sammnew", "database")];
const VALID_EXTENSIONS = new Set([".md", ".mdx"]);
const KEBAB_CASE_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ACCENTED_OR_NON_ASCII_RE = /[^\x00-\x7F]/;

function isExcluded(filePath) {
  return EXCLUDED_DIRS.some(
    (dir) => filePath === dir || filePath.startsWith(dir + path.sep)
  );
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (isExcluded(fullPath)) continue;
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (VALID_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function validateFilename(fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const errors = [];

  if (/\s/.test(base)) {
    errors.push("contiene espacios");
  }
  if (ACCENTED_OR_NON_ASCII_RE.test(base)) {
    errors.push("contiene caracteres no-ASCII (tildes, ñ, etc.) — el nombre debe estar en inglés");
  }
  if (!KEBAB_CASE_RE.test(base) && !/\s/.test(base) && !ACCENTED_OR_NON_ASCII_RE.test(base)) {
    errors.push("no sigue kebab-case (minúsculas y guiones, ej. mi-archivo.md)");
  } else if (/[A-Z]/.test(base)) {
    errors.push("contiene mayúsculas — debe ser todo minúsculas");
  }

  return errors;
}

function main() {
  const files = walk(DOCS_ROOT);
  const violations = [];

  for (const file of files) {
    const relative = path.relative(path.join(__dirname, ".."), file);
    const errors = validateFilename(path.basename(file));
    if (errors.length > 0) {
      violations.push({ file: relative, errors });
    }
  }

  if (violations.length === 0) {
    console.log(`✔ ${files.length} archivos de documentación cumplen la convención de nombres.`);
    process.exit(0);
  }

  console.error(`✘ ${violations.length} archivo(s) no cumplen la convención de nombres (kebab-case, minúsculas, inglés):\n`);
  for (const { file, errors } of violations) {
    console.error(`  ${file}`);
    for (const err of errors) {
      console.error(`    - ${err}`);
    }
  }
  console.error(
    `\nConvención: docs/**/*.md(x) → kebab-case-en-minusculas-en-ingles.md`
  );
  console.error(
    `Excepción: docs/sammnew/database/** (nombres literales de tablas SQL, en español por convención del backend SAMM).`
  );
  process.exit(1);
}

main();
