#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const VB_FILES_DIR = "c:\\idaeSoluciones\\sammweb\\sammapi\\capadatos\\tablas";
const DOCS_OUTPUT_DIR =
  "c:\\idaeSoluciones\\IDAE.Docs\\docs\\sammnew\\database";

// Module mapping
const MODULE_FOLDERS = {
  gen: { folder: "general", name: "General / Configuración" },
  equ: { folder: "equipos", name: "Equipos" },
  cnt: { folder: "contratos", name: "Contratos" },
  cat: { folder: "catalogo", name: "Catálogo" },
  doc: { folder: "documentos", name: "Documentos" },
  ter: { folder: "terceros", name: "Terceros" },
  ort: { folder: "ordenes", name: "Órdenes de Trabajo" },
  seg: { folder: "seguridad", name: "Seguridad" },
  pro: { folder: "proyectos", name: "Proyectos" },
  syn: { folder: "integracion", name: "Integración" },
  lic: { folder: "licencias", name: "Licencias" },
  alq: { folder: "alquileres", name: "Alquileres" },
  dis: { folder: "despacho", name: "Despacho" },
  com: { folder: "comisiones", name: "Comisiones" },
  gas: { folder: "gastos", name: "Gastos" },
  gui: { folder: "interfaz", name: "Interfaz" },
  geo: { folder: "geografico", name: "Geográfico" },
  rep: { folder: "reportes", name: "Reportes" },
  tax: { folder: "taxonomia", name: "Taxonomía" },
};

// Global table index: entity_name -> full_table_name
let TABLE_INDEX = {};

// Build table index from all VB files
function buildTableIndex() {
  console.log("Construyendo índice de tablas...");
  const vbFiles = fs.readdirSync(VB_FILES_DIR).filter((f) => f.endsWith(".vb"));
  
  vbFiles.forEach((file) => {
    const tableName = path.basename(file, ".vb");
    // Extract entity name (without prefix)
    const parts = tableName.split("_");
    if (parts.length > 1) {
      const entityName = parts.slice(1).join("_"); // Everything after prefix
      TABLE_INDEX[entityName] = tableName;
      
      // Also add without underscores for compound names
      // e.g., catalogo_equipo and catalogoequipo both map to cat_catalogo_equipo
      const entityNameNoUnderscore = entityName.replace(/_/g, "");
      if (entityNameNoUnderscore !== entityName) {
        TABLE_INDEX[entityNameNoUnderscore] = tableName;
      }
    }
  });
  
  console.log(`✓ Índice construido con ${Object.keys(TABLE_INDEX).length} entradas`);
}

// Parse VB.NET file to extract column information
function parseVBFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const className = path.basename(filePath, ".vb");

  // Extract public properties starting with 'a_'
  // Pattern: public a_[tipo]_[nombre_completo] as [VBType] = [default]
  // Use [^_]+ to capture type prefix (everything except underscore) to avoid greedy matching
  const propertyRegex = /public\s+a_([^_]+)_([a-zA-Z0-9_]+)\s+as\s+(\w+)/gi;
  const matches = [...content.matchAll(propertyRegex)];

  const columns = [];
  const fks = [];
  const seen = new Set(); // To avoid duplicates

  matches.forEach((match) => {
    const typePrefix = match[1]; // int, str, bol, dbl, dat
    const columnName = match[2].trim();
    const vbType = match[3]; // integer, String, boolean, Double, Date

    // Skip aux fields
    if (columnName.endsWith("_aux")) return;

    // Skip duplicates
    if (seen.has(columnName)) return;
    seen.add(columnName);

    // Determine SQL data type
    let sqlType = "VARCHAR";
    if (typePrefix === "int") sqlType = "INTEGER";
    else if (typePrefix === "bol") sqlType = "BIT";
    else if (typePrefix === "dbl") sqlType = "DECIMAL";
    else if (typePrefix === "dat") {
      sqlType = columnName.endsWith("_ff") ? "DATE" : "DATETIME";
    }

    // Determine if PK or FK
    const isPK = columnName === "id";
    const isFK = columnName.startsWith("id_") && columnName !== "id";

    // Extract referenced table for FKs
    let referencedTable = null;
    if (isFK) {
      const entityName = columnName.substring(3); // Remove 'id_' prefix
      referencedTable = findTableByName(entityName);
      
      if (referencedTable) {
        fks.push({ column: columnName, references: referencedTable });
      }
    }

    columns.push({
      name: columnName,
      type: sqlType,
      nullable: !isPK, // PK is always not nullable
      isPK,
      isFK,
      referencedTable,
    });
  });

  return { className, columns, fks };
}

// Find table name by entity name using the built index
function findTableByName(entityName) {
  // Try direct lookup
  if (TABLE_INDEX[entityName]) {
    return TABLE_INDEX[entityName];
  }
  
  // Try without underscores
  const noUnderscore = entityName.replace(/_/g, "");
  if (TABLE_INDEX[noUnderscore]) {
    return TABLE_INDEX[noUnderscore];
  }
  
  // Try common variations
  const variations = [
    entityName.toLowerCase(),
    entityName.replace(/_/g, ""),
    entityName.split("_")[0], // First part only
  ];
  
  for (const variant of variations) {
    if (TABLE_INDEX[variant]) {
      return TABLE_INDEX[variant];
    }
  }
  
  // Not found
  return null;
}

// Generate markdown content for a table
function generateMarkdown(tableInfo, moduleName, moduleFolder, position) {
  const { className, columns, fks } = tableInfo;
  const prefix = className.split("_")[0];

  // Generate description based on table name
  const entityName = className.substring(className.indexOf("_") + 1);
  const description = `Tabla para gestionar ${entityName} en el sistema SAMM`;

  let markdown = `---
sidebar_position: ${position}
title: ${className}
description: ${description}
tags: [database, ${prefix}]
---

# ${className}

## Descripción

${description}.

**Módulo**: ${moduleName}  
**Prefijo**: \`${prefix}_\`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
`;

  // Add columns to table
  columns.forEach((col) => {
    const nullable = col.nullable ? "✓" : "✗";
    const key = col.isPK ? "PK" : col.isFK ? "FK" : "-";
    markdown += `| ${col.name} | ${col.type} | ${nullable} | ${key} | - | - |\n`;
  });

  markdown += `
### Columnas Estándar

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

`;

  if (fks.length > 0) {
    fks.forEach((fk) => {
      const refPrefix = fk.references.split("_")[0];
      const refFolder = MODULE_FOLDERS[refPrefix]?.folder || "general";
      markdown += `- **${fk.column}** → [${fk.references}](../${refFolder}/${fk.references}) - Referencia a ${fk.references}\n`;
    });
  } else {
    markdown += `*Esta tabla no tiene relaciones salientes (foreign keys).*\n`;
  }

  markdown += `
### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo ${moduleName}
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

\`\`\`sql
-- Consulta básica
SELECT * FROM ${className} WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ${className}
WHERE active = 1
ORDER BY id DESC;
\`\`\`

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
`;

  return markdown;
}

// Main execution
function main() {
  console.log("Iniciando generación de documentación...");

  // Build table index first
  buildTableIndex();

  // Read all VB files
  const vbFiles = fs.readdirSync(VB_FILES_DIR).filter((f) => f.endsWith(".vb"));
  console.log(`Encontrados ${vbFiles.length} archivos VB.NET`);

  // Group files by module
  const filesByModule = {};
  vbFiles.forEach((file) => {
    const prefix = file.split("_")[0];
    if (!filesByModule[prefix]) {
      filesByModule[prefix] = [];
    }
    filesByModule[prefix].push(file);
  });

  let totalGenerated = 0;

  // Process each module
  Object.entries(filesByModule).forEach(([prefix, files]) => {
    const moduleInfo = MODULE_FOLDERS[prefix];
    if (!moduleInfo) {
      console.log(`⚠ Módulo desconocido: ${prefix} (${files.length} archivos)`);
      return;
    }

    console.log(`\nProcesando módulo ${prefix} (${files.length} tablas)...`);

    // Process each file in the module
    files.forEach((file, index) => {
      try {
        const filePath = path.join(VB_FILES_DIR, file);
        const tableInfo = parseVBFile(filePath);

        const markdown = generateMarkdown(
          tableInfo,
          moduleInfo.name,
          moduleInfo.folder,
          index + 1,
        );

        // Write markdown file
        const outputPath = path.join(
          DOCS_OUTPUT_DIR,
          moduleInfo.folder,
          `${tableInfo.className}.md`,
        );

        fs.writeFileSync(outputPath, markdown, "utf8");
        totalGenerated++;

        if ((index + 1) % 10 === 0) {
          process.stdout.write(".");
        }
      } catch (error) {
        console.error(`\n✗ Error procesando ${file}:`, error.message);
      }
    });

    console.log(` ✓ ${files.length} archivos generados`);
  });

  console.log(`\n\n✅ Generación completada!`);
  console.log(
    `📊 Total de archivos generados: ${totalGenerated}/${vbFiles.length}`,
  );
}

// Run
try {
  main();
} catch (error) {
  console.error("❌ Error fatal:", error);
  process.exit(1);
}
