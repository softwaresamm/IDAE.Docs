---
sidebar_position: 0
title: Diagrama ER - Movimientos
description: "Diagrama entidad-relación del módulo Movimientos"
tags: [database, mov, diagrama]
---

# Diagrama ER - Movimientos

Tablas del módulo Movimientos (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    mov_associateOtherDiscount {
        int id PK
        int id_associate FK
        int id_otherDiscount FK
        int id_operationType FK
        int id_movementType FK
    }
    mov_discount {
        int id PK
    }
    mov_discountImp {
        int id PK
    }
    mov_movement {
        int id PK
        int id_operationType FK
        int id_associate FK
        int id_movementType FK
        int id_movementState FK
        int id_discount FK
        int id_discountImp FK
    }
    mov_movementState {
        int id PK
    }
    mov_movementType {
        int id PK
    }
    mov_operationType {
        int id PK
    }
    mov_otherDiscount {
        int id PK
        int id_operationType FK
        int id_movementType FK
    }
    aso_associate
    aso_associate ||--o{ mov_associateOtherDiscount : "id_associate"
    mov_movementType |o--o{ mov_associateOtherDiscount : "id_movementType"
    mov_operationType |o--o{ mov_associateOtherDiscount : "id_operationType"
    mov_otherDiscount ||--o{ mov_associateOtherDiscount : "id_otherDiscount"
    aso_associate ||--o{ mov_movement : "id_associate"
    mov_discount |o--o{ mov_movement : "id_discount"
    mov_discountImp |o--o{ mov_movement : "id_discountImp"
    mov_movementState ||--o{ mov_movement : "id_movementState"
    mov_movementType ||--o{ mov_movement : "id_movementType"
    mov_operationType ||--o{ mov_movement : "id_operationType"
    mov_movementType |o--o{ mov_otherDiscount : "id_movementType"
    mov_operationType |o--o{ mov_otherDiscount : "id_operationType"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
