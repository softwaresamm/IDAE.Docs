#!/usr/bin/env node

/**
 * Generador de Diccionario de Datos - SammNew
 * Fuente: Base de datos sn_dev (SQL Server, JeffreyCaro)
 *
 * Requiere haber ejecutado previamente:
 *   sqlcmd -S JeffreyCaro -d sn_dev -E -Q "..." -o schema_columns.txt
 *   sqlcmd -S JeffreyCaro -d sn_dev -E -Q "..." -o schema_fks.txt
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SCHEMA_COLUMNS_FILE = "C:\\idaeSoluciones\\IDAE.Docs\\schema_columns.txt";
const SCHEMA_FKS_FILE = "C:\\idaeSoluciones\\IDAE.Docs\\schema_fks.txt";
const DOCS_OUTPUT_DIR =
  "C:\\idaeSoluciones\\IDAE.Docs\\docs\\sammnew\\database";

// Columnas de auditoría estándar (no se muestran en la tabla principal)
const AUDIT_COLUMNS = new Set([
  "id",
  "uid",
  "eid",
  "id_usuario_creo",
  "id_usuario_modifico",
  "fechaCreacion",
  "fechaModificacion",
  "active",
]);

// Module mapping: prefix -> { folder, name, position }
const MODULE_FOLDERS = {
  gen: { folder: "general", name: "General / Configuración", position: 1 },
  equ: { folder: "equipos", name: "Equipos", position: 2 },
  cnt: { folder: "contratos", name: "Contratos", position: 3 },
  cat: { folder: "catalogo", name: "Catálogo", position: 4 },
  doc: { folder: "documentos", name: "Documentos", position: 5 },
  ter: { folder: "terceros", name: "Terceros", position: 6 },
  ort: { folder: "ordenes", name: "Órdenes de Trabajo", position: 7 },
  seg: { folder: "seguridad", name: "Seguridad", position: 8 },
  pro: { folder: "proyectos", name: "Proyectos", position: 9 },
  syn: { folder: "integracion", name: "Integración", position: 10 },
  lic: { folder: "licencias", name: "Licencias", position: 11 },
  alq: { folder: "alquileres", name: "Alquileres", position: 12 },
  dis: { folder: "despacho", name: "Despacho", position: 13 },
  com: { folder: "comisiones", name: "Comisiones", position: 14 },
  gas: { folder: "gastos", name: "Gastos", position: 15 },
  gui: { folder: "interfaz", name: "Interfaz", position: 16 },
  geo: { folder: "geografico", name: "Geográfico", position: 17 },
  rep: { folder: "reportes", name: "Reportes", position: 18 },
  tax: { folder: "taxonomia", name: "Taxonomía", position: 19 },
};

// Mapeo de tipos SQL a descripciones legibles
function sqlTypeToDisplay(dataType) {
  const map = {
    int: "INTEGER",
    bigint: "BIGINT",
    smallint: "SMALLINT",
    tinyint: "TINYINT",
    bit: "BIT",
    decimal: "DECIMAL",
    numeric: "DECIMAL",
    float: "FLOAT",
    real: "FLOAT",
    money: "MONEY",
    smallmoney: "MONEY",
    varchar: "VARCHAR",
    nvarchar: "NVARCHAR",
    char: "CHAR",
    nchar: "NCHAR",
    text: "TEXT",
    ntext: "TEXT",
    date: "DATE",
    datetime: "DATETIME",
    datetime2: "DATETIME2",
    smalldatetime: "DATETIME",
    time: "TIME",
    uniqueidentifier: "UNIQUEIDENTIFIER",
    varbinary: "VARBINARY",
    image: "IMAGE",
    xml: "XML",
  };
  return map[dataType.toLowerCase()] || dataType.toUpperCase();
}

// Convierte nombre de tabla a nombre de archivo seguro (reemplaza puntos con guión bajo)
function tableNameToFileName(tableName) {
  return tableName.replace(/\./g, "_");
}

// Carga el archivo de columnas y devuelve mapa: tableName -> [{ column, type, nullable, isPK }]
function loadColumns() {
  const content = fs.readFileSync(SCHEMA_COLUMNS_FILE, "utf8");
  const lines = content
    .split(/\r?\n/)
    .filter((l) => l.trim() && !l.startsWith("--"));

  const tables = {};

  for (const line of lines) {
    const parts = line.trim().split("|");
    if (parts.length < 5) continue;

    const [tableName, columnName, dataType, isNullable, isPK] = parts.map((p) =>
      p.trim(),
    );

    if (!tableName || !columnName) continue;

    if (!tables[tableName]) {
      tables[tableName] = [];
    }

    tables[tableName].push({
      column: columnName,
      type: sqlTypeToDisplay(dataType),
      rawType: dataType,
      nullable: isNullable === "YES",
      isPK: isPK === "YES",
      isFK: columnName.startsWith("id_") && columnName !== "id",
    });
  }

  return tables;
}

// Carga el archivo de FKs y devuelve mapa: tableName -> [{ column, referencedTable }]
function loadFKs() {
  const content = fs.readFileSync(SCHEMA_FKS_FILE, "utf8");
  const lines = content
    .split(/\r?\n/)
    .filter((l) => l.trim() && !l.startsWith("--"));

  const fks = {};

  for (const line of lines) {
    const parts = line.trim().split("|");
    if (parts.length < 3) continue;

    const [tableName, columnName, referencedTable] = parts.map((p) => p.trim());

    if (!tableName || !columnName || !referencedTable) continue;

    if (!fks[tableName]) {
      fks[tableName] = [];
    }

    fks[tableName].push({
      column: columnName,
      referencedTable: referencedTable,
    });
  }

  return fks;
}

// Genera el markdown para una tabla
function generateMarkdown(
  tableName,
  columns,
  fks,
  moduleName,
  moduleFolder,
  position,
) {
  const prefix = tableName.split("_")[0];

  // Separar columnas de negocio de columnas de auditoría
  const businessColumns = columns.filter((c) => !AUDIT_COLUMNS.has(c.column));

  // Descripción basada en el nombre de la tabla
  const entityName = tableName.includes(".")
    ? tableName.substring(tableName.indexOf("_") + 1)
    : tableName.substring(tableName.indexOf("_") + 1);
  const description = `Tabla ${tableName} del módulo ${moduleName}`;

  const tableFKs = fks || [];

  let md = `---
sidebar_position: ${position}
title: ${tableName}
description: ${description}
tags: [database, ${prefix}]
---

# ${tableName}

## Descripción

${description}.

**Módulo**: ${moduleName}  
**Prefijo**: \`${prefix}_\`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
`;

  // Columnas de negocio
  for (const col of businessColumns) {
    const nullable = col.nullable ? "✓" : "✗";
    const key = col.isPK ? "PK" : col.isFK ? "FK" : "-";
    md += `| ${col.column} | ${col.type} | ${nullable} | ${key} | - |\n`;
  }

  md += `
### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

`;

  if (tableFKs.length > 0) {
    for (const fk of tableFKs) {
      const refPrefix = fk.referencedTable.split("_")[0];
      const refFolder = MODULE_FOLDERS[refPrefix]?.folder || "general";
      const refFileName = tableNameToFileName(fk.referencedTable);
      md += `- **${fk.column}** → [${fk.referencedTable}](../${refFolder}/${refFileName}) - Referencia a ${fk.referencedTable}\n`;
    }
  } else {
    md += `*Esta tabla no tiene relaciones salientes definidas.*\n`;
  }

  md += `
### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo ${moduleName}
- Nombre real en base de datos: \`${tableName}\`
${tableName.includes(".") ? `- El punto en el nombre separa el tipo de documento del subtipo\n` : ""}
## Ejemplos de Uso

\`\`\`sql
-- Consulta básica
SELECT * FROM [${tableName}] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [${tableName}] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
\`\`\`

---

**Nota**: Documentación generada desde el esquema real de la base de datos \`sn_dev\`.
`;

  return md;
}

// Programa principal
function main() {
  console.log("🚀 Iniciando generación de documentación desde BD real...\n");

  // Cargar datos del esquema
  console.log("📂 Cargando esquema desde archivos...");
  const allColumns = loadColumns();
  const allFKs = loadFKs();

  const tableNames = Object.keys(allColumns).sort();
  console.log(`✓ ${tableNames.length} tablas encontradas`);
  console.log(
    `✓ ${Object.values(allFKs).reduce((s, v) => s + v.length, 0)} FK relationships encontradas\n`,
  );

  // Agrupar tablas por módulo
  const byModule = {};
  const unknownTables = [];

  for (const tableName of tableNames) {
    const prefix = tableName.split("_")[0];
    if (MODULE_FOLDERS[prefix]) {
      if (!byModule[prefix]) byModule[prefix] = [];
      byModule[prefix].push(tableName);
    } else {
      unknownTables.push(tableName);
    }
  }

  if (unknownTables.length > 0) {
    console.log(
      `⚠️  Tablas sin módulo conocido (se omiten): ${unknownTables.join(", ")}\n`,
    );
  }

  // Asegurar que existan las carpetas
  for (const [prefix, info] of Object.entries(MODULE_FOLDERS)) {
    const folderPath = path.join(DOCS_OUTPUT_DIR, info.folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  let totalGenerated = 0;
  let totalErrors = 0;

  // Generar documentos por módulo
  for (const [prefix, tables] of Object.entries(byModule).sort()) {
    const moduleInfo = MODULE_FOLDERS[prefix];
    console.log(
      `📁 Módulo ${prefix} (${moduleInfo.name}): ${tables.length} tablas`,
    );

    tables.forEach((tableName, index) => {
      try {
        const columns = allColumns[tableName] || [];
        const fks = allFKs[tableName] || [];

        const markdown = generateMarkdown(
          tableName,
          columns,
          fks,
          moduleInfo.name,
          moduleInfo.folder,
          index + 1,
        );

        // Nombre de archivo: reemplazar puntos con guión bajo
        const fileName = tableNameToFileName(tableName) + ".md";
        const outputPath = path.join(
          DOCS_OUTPUT_DIR,
          moduleInfo.folder,
          fileName,
        );

        fs.writeFileSync(outputPath, markdown, "utf8");
        totalGenerated++;

        process.stdout.write(".");
      } catch (err) {
        console.error(`\n❌ Error en ${tableName}:`, err.message);
        totalErrors++;
      }
    });
    console.log(` ✓ ${tables.length} archivos`);
  }

  // Eliminar archivos .md de tablas que ya no existen
  console.log("\n🧹 Limpiando archivos obsoletos...");
  const validFileNames = new Set(
    tableNames.map((t) => tableNameToFileName(t) + ".md"),
  );
  let deletedCount = 0;

  for (const [prefix, info] of Object.entries(MODULE_FOLDERS)) {
    const folderPath = path.join(DOCS_OUTPUT_DIR, info.folder);
    if (!fs.existsSync(folderPath)) continue;

    const existingFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".md") && f !== "_category_.json");
    for (const file of existingFiles) {
      if (!validFileNames.has(file)) {
        fs.unlinkSync(path.join(folderPath, file));
        console.log(`  🗑️  Eliminado: ${info.folder}/${file}`);
        deletedCount++;
      }
    }
  }

  console.log(`\n✅ Generación completada!`);
  console.log(`📊 Total generados: ${totalGenerated}`);
  console.log(`🗑️  Archivos eliminados (obsoletos): ${deletedCount}`);
  if (totalErrors > 0) {
    console.log(`❌ Errores: ${totalErrors}`);
  }
}

main();
