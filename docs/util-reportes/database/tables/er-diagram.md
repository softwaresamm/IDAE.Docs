---
sidebar_position: 0
title: Diagrama ER - Tablas
description: "Diagrama entidad-relación del módulo Tablas"
tags: [database, dbo, diagrama]
---

# Diagrama ER - Tablas

Tablas del módulo Tablas (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    dbo_rep_campoReporte {
        int id PK
        int id_reporte FK
        int id_tipoCampoReporte FK
    }
    dbo_rep_campoReporteDependiente {
        int id PK
        int id_campoReporte_origen FK
        int id_campoReporte_dependiente FK
    }
    dbo_rep_categoria {
        int id PK
        int id_categoria FK
    }
    dbo_rep_registroError {
        int id PK
    }
    dbo_rep_reporte {
        int id PK
    }
    dbo_rep_reporte_categoria {
        int id PK
    }
    dbo_rep_tipoCampoReporte {
        int id PK
    }
    dbo_seg_usuario {
        int id PK
        int id_usuario FK
    }
    dbo_rep_reporte ||--o{ dbo_rep_campoReporte : "id_reporte"
    dbo_rep_tipoCampoReporte ||--o{ dbo_rep_campoReporte : "id_tipoCampoReporte"
    dbo_rep_campoReporte ||--o{ dbo_rep_campoReporteDependiente : "id_campoReporte_dependiente"
    dbo_rep_campoReporte ||--o{ dbo_rep_campoReporteDependiente : "id_campoReporte_origen"
    dbo_rep_categoria ||--o{ dbo_rep_categoria : "id_categoria"
    dbo_seg_usuario ||--o{ dbo_seg_usuario : "id_usuario"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `rep_basica` con la skill `data-dictionary` (IDAE.ClaudeConfig).
