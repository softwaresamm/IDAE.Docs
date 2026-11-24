---
sidebar_position: 0
title: Diagrama ER - Créditos
description: "Diagrama entidad-relación del módulo Créditos"
tags: [database, cre, diagrama]
---

# Diagrama ER - Créditos

Tablas del módulo Créditos (solo llaves PK, FK y UK) y las tablas de otros módulos con las que se relacionan (solo el nombre). Se omiten las relaciones de auditoría con el usuario.

```mermaid
erDiagram
    cre_creditLine {
        int id PK
        nvarchar code UK
        int id_interestRateType FK
        int id_paymentType FK
        int id_loanPurpose FK
    }
    cre_installmentState {
        int id PK
    }
    cre_interestRateType {
        int id PK
    }
    cre_loan {
        int id PK
        nvarchar code UK
        int id_associate FK
        int id_creditLine FK
        int id_loanPurpose FK
        int id_loanState FK
        int id_paymentType FK
    }
    cre_loanInstallment {
        int id PK
        int id_loan FK,UK
        int id_installmentState FK
        int number UK
    }
    cre_loanParameter {
        int id PK
    }
    cre_loanPurpose {
        int id PK
    }
    cre_loanState {
        int id PK
    }
    cre_paymentType {
        int id PK
    }
    aso_associate
    mov_movement
    cre_interestRateType ||--o{ cre_creditLine : "id_interestRateType"
    cre_loanPurpose |o--o{ cre_creditLine : "id_loanPurpose"
    cre_paymentType ||--o{ cre_creditLine : "id_paymentType"
    aso_associate ||--o{ cre_loan : "id_associate"
    cre_creditLine ||--o{ cre_loan : "id_creditLine"
    cre_loanPurpose |o--o{ cre_loan : "id_loanPurpose"
    cre_loanState ||--o{ cre_loan : "id_loanState"
    cre_paymentType |o--o{ cre_loan : "id_paymentType"
    cre_installmentState ||--o{ cre_loanInstallment : "id_installmentState"
    cre_loan ||--o{ cre_loanInstallment : "id_loan"
    cre_loan |o--o{ mov_movement : "id_loan"
    cre_loanInstallment |o--o{ mov_movement : "id_loanInstallment"
```

---

**Nota**: Diagrama generado desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
