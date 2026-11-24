---
sidebar_position: 0
title: Diagrama ER - Asociados
description: "Diagrama entidad-relación del módulo Asociados"
tags: [database, aso, diagrama]
---

# Diagrama ER - Asociados

Tablas del módulo Asociados (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    aso_academicLevel {
        int id PK
    }
    aso_associate {
        int id PK
        nvarchar documentNumber UK
        int id_maritalStatus FK
        int id_academicLevel FK
        int id_housingType FK
        int id_company FK
        int id_city FK
        int id_area FK
        int id_position FK
        int id_contractType FK
        int id_payrollType FK
        int id_eps FK
        int id_pensionFund FK
        int id_state FK
        int id_gender FK
        int id_bank FK
    }
    aso_bank {
        int id PK
    }
    aso_contractType {
        int id PK
    }
    aso_eps {
        int id PK
    }
    aso_gender {
        int id PK
    }
    aso_housingType {
        int id PK
    }
    aso_maritalStatus {
        int id PK
    }
    aso_payrollType {
        int id PK
    }
    aso_pensionFund {
        int id PK
    }
    aso_position {
        int id PK
    }
    aso_state {
        int id PK
    }
    com_area
    com_city
    com_company
    cre_loan
    mov_associateOtherDiscount
    mov_movement
    aso_academicLevel ||--o{ aso_associate : "id_academicLevel"
    com_area |o--o{ aso_associate : "id_area"
    aso_bank |o--o{ aso_associate : "id_bank"
    com_city |o--o{ aso_associate : "id_city"
    com_company ||--o{ aso_associate : "id_company"
    aso_contractType ||--o{ aso_associate : "id_contractType"
    aso_eps ||--o{ aso_associate : "id_eps"
    aso_gender |o--o{ aso_associate : "id_gender"
    aso_housingType ||--o{ aso_associate : "id_housingType"
    aso_maritalStatus ||--o{ aso_associate : "id_maritalStatus"
    aso_payrollType ||--o{ aso_associate : "id_payrollType"
    aso_pensionFund |o--o{ aso_associate : "id_pensionFund"
    aso_position |o--o{ aso_associate : "id_position"
    aso_state ||--o{ aso_associate : "id_state"
    aso_associate ||--o{ cre_loan : "id_associate"
    aso_associate ||--o{ mov_associateOtherDiscount : "id_associate"
    aso_associate ||--o{ mov_movement : "id_associate"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
