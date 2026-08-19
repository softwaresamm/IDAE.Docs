---
title: "Utilitario Reporte Técnico v3.3.0"
description: "Novedades del Utilitario Reporte Técnico versión 3.3.0."
authors: [equipo-idae]
tags: [util-reporte-tecnico, release]
date: 2026-08-05
slug: util-reporte-tecnico-v3-3-0
---

La versión **3.3.0** del Utilitario Reporte Técnico permite cargar la fecha y hora desde una programación, envía reportes sin ubicación, controla la obligatoriedad de adjuntos según el servicio y muestra el horómetro solo para los equipos que lo requieren.

<!-- truncate -->

## Novedades

- Se habilitó la carga de la información de fecha y hora a partir de una programación o sin programación. ([SO-757](https://softwaresamm.atlassian.net/browse/SO-757))
- Se habilitó el envío de reportes cuando no se cuenta con información de ubicación. ([SO-759](https://softwaresamm.atlassian.net/browse/SO-759))
- La sección de archivos adjuntos ahora se muestra como obligatoria u opcional según la configuración del servicio, bloqueando el envío del reporte si falta un adjunto requerido. ([SO-1974](https://softwaresamm.atlassian.net/browse/SO-1974))
- La sección de Horómetro ahora solo se muestra cuando el modelo del equipo lo requiere, en lugar de mostrarse para todos los equipos. ([SO-1970](https://softwaresamm.atlassian.net/browse/SO-1970))

## Versiones requeridas

| Componente | Versión mínima |
| ---------- | -------------- |
| SAMM API   | 1.2.30.2       |

## Referencias

- [SO-757: Cargar información de fecha y hora desde una programación](https://softwaresamm.atlassian.net/browse/SO-757)
- [SO-759: envío de reporte sin ubicación](https://softwaresamm.atlassian.net/browse/SO-759)
- [SO-1974: Controlar obligatoriedad de archivos adjuntos según configuración del servicio](https://softwaresamm.atlassian.net/browse/SO-1974)
- [SO-1970: Mostrar el horómetro únicamente para equipos que lo requieran](https://softwaresamm.atlassian.net/browse/SO-1970)
