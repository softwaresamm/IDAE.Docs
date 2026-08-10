---
title: "Utilitario Certificados v0.5.0"
description: "Novedades del Utilitario Certificados versión 0.5.0."
authors: [equipo-idae]
tags: [util-certificados, release]
date: 2026-08-10
slug: util-certificados-v0-5-0
---

La versión **0.5.0** del Utilitario Certificados agrega la columna Unidad de posición al dashboard y mejora las reglas de vencimiento y permisos.

<!-- truncate -->

## Novedades

- Se agregó la columna Unidad de posición en la tabla del dashboard, el estado "próximo a vencer" ahora se muestra cuando faltan 30 días para el vencimiento, se evitó registrar fechas futuras en la fecha de certificado y se ajustaron los permisos de eliminación por perfil. ([SO-2091](https://softwaresamm.atlassian.net/browse/SO-2091))

## Versiones requeridas

| Componente | Versión mínima |
| ---------- | -------------- |
| SAMMAPI    | 1.2.31.0       |

## Referencias

- [SO-2091: Columna Unidad posición en Dashboard](https://softwaresamm.atlassian.net/browse/SO-2091)
