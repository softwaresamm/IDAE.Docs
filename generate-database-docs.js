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
      referencedTable = columnName.substring(3); // Remove 'id_' prefix
      // Handle special cases
      if (referencedTable.includes("_")) {
        // e.g., id_tercero_cliente -> ter_tercero
        const parts = referencedTable.split("_");
        if (
          parts[0] === "tercero" ||
          parts[0] === "empresa" ||
          parts[0] === "usuario"
        ) {
          referencedTable = findTableByName(parts[0]);
        }
      } else {
        referencedTable = findTableByName(referencedTable);
      }

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

// Find table name by entity name
function findTableByName(entityName) {
  const commonMappings = {
    empresa: "gen_empresa",
    tercero: "ter_tercero",
    usuario: "seg_usuario",
    perfil: "seg_perfil",
    documento: "doc_documento",
    equipo: "equ_equipo",
    catalogo: "cat_catalogo",
    contrato: "cnt_contrato",
    bodega: "gen_bodega",
    zona: "gen_zona",
    moneda: "gen_moneda",
    impuesto: "gen_impuesto",
    unidad: "gen_unidad",
    sucursal: "ter_sucursal",
    itemDocumento: "doc_itemDocumento",
    estadoTipoDocumento: "doc_estadoTipoDocumento",
    subtipoDocumento: "doc_subtipoDocumento",
    tipoDocumento: "doc_tipoDocumento",
  };

  return commonMappings[entityName] || `unknown_${entityName}`;
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

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

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
