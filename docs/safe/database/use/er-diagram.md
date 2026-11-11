---
sidebar_position: 0
title: Diagrama ER - Usuarios
description: "Diagrama entidad-relación del módulo Usuarios"
tags: [database, use, diagrama]
---

# Diagrama ER - Usuarios

Tablas del módulo Usuarios (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    use_profile {
        int id PK
    }
    use_user {
        int id PK
        int id_profile FK
    }
    use_profile ||--o{ use_user : "id_profile"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
