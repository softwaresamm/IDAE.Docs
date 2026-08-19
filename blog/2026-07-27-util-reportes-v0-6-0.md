---
title: "Utilitario Reportes v0.6.0"
description: "Novedades del Utilitario Reportes versión 0.6.0."
authors: [equipo-idae]
tags: [util-reportes, release]
date: 2026-07-27
slug: util-reportes-v0-6-0
---

La versión **0.6.0** del Utilitario Reportes mejora el manejo de reportes con gran volumen de información, suma el formato de salida HTML 4.0 y obtiene los parámetros de filtro directamente desde los sistemas origen.

<!-- truncate -->

## Novedades

- Se optimizó el manejo de tiempos para la generación de reportes con bastante información, mejorando su rendimiento. ([SO-621](https://softwaresamm.atlassian.net/browse/SO-621))
- Ahora es posible solicitar el reporte en formato HTML, versión 4.0. ([SO-716](https://softwaresamm.atlassian.net/browse/SO-716))
- Los valores de los parámetros tipo tabla ahora se obtienen directamente desde los sistemas origen (SAFE, SAMM API), evitando datos desactualizados. ([SO-746](https://softwaresamm.atlassian.net/browse/SO-746))

## Versiones requeridas

| Componente | Versión mínima |
| ---------- | -------------- |
| SAMM API   | 1.2.30.1       |

## Referencias

- [SO-621: Manejo de tiempo para reportes con bastante información](https://softwaresamm.atlassian.net/browse/SO-621)
- [SO-716: Solicitar formato html, en versión 4.0](https://softwaresamm.atlassian.net/browse/SO-716)
- [SO-746: Obtener valores parámetros desde sistemas origen](https://softwaresamm.atlassian.net/browse/SO-746)
