---
sidebar_position: 0
title: Diagrama ER - Organización
description: "Diagrama entidad-relación del módulo Organización"
tags: [database, com, diagrama]
---

# Diagrama ER - Organización

Tablas del módulo Organización (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    com_area {
        int id PK
    }
    com_city {
        int id PK
    }
    com_company {
        int id PK
        int id_group FK
    }
    com_group {
        int id PK
    }
    aso_associate
    com_area |o--o{ aso_associate : "id_area"
    com_city |o--o{ aso_associate : "id_city"
    com_company ||--o{ aso_associate : "id_company"
    com_group |o--o{ com_company : "id_group"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
