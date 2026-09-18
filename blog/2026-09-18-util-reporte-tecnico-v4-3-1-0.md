---
title: "Utilitario Reporte Técnico v4.3.1.0"
description: "Novedades del Utilitario Reporte Técnico versión 4.3.1.0."
authors: [equipo-idae]
tags: [util-reporte-tecnico, release]
date: 2026-09-18
slug: util-reporte-tecnico-v4-3-1-0
---

La versión **4.3.1.0** del Utilitario de Reporte Técnico habilita el envío de varios formatos de reporte y reportes adicionales, la sección de cambio de estado del equipo, el reporte de no disponibilidades y el acceso a textos por defecto.

<!-- truncate -->

## Novedades

- Se habilitó el envío de varios formatos de reporte (RM y RA) y el envío de reportes adicionales seleccionados dentro del JSON del reporte. ([SO-212](https://softwaresamm.atlassian.net/browse/SO-212), [SO-518](https://softwaresamm.atlassian.net/browse/SO-518), [SO-2119](https://softwaresamm.atlassian.net/browse/SO-2119))
- Se eliminaron las opciones de alineación de texto en el editor enriquecido, corrigiendo que el teclado se ocultara al escribir en el campo de trabajos. ([SO-212](https://softwaresamm.atlassian.net/browse/SO-212), [SO-2173](https://softwaresamm.atlassian.net/browse/SO-2173), [SO-2141](https://softwaresamm.atlassian.net/browse/SO-2141), [SO-626](https://softwaresamm.atlassian.net/browse/SO-626))
- Se agregó la sección de cambio de estado del equipo, visible al habilitar el parámetro correspondiente. ([SO-2153](https://softwaresamm.atlassian.net/browse/SO-2153), [SO-2175](https://softwaresamm.atlassian.net/browse/SO-2175))
- Se habilitó el reporte de no disponibilidades. ([SO-2145](https://softwaresamm.atlassian.net/browse/SO-2145), [SO-2180](https://softwaresamm.atlassian.net/browse/SO-2180), [SO-2181](https://softwaresamm.atlassian.net/browse/SO-2181), [SO-2182](https://softwaresamm.atlassian.net/browse/SO-2182))
- Se habilitó el acceso a los textos por defecto desde el utilitario de reporte técnico. ([SO-2185](https://softwaresamm.atlassian.net/browse/SO-2185))
- Se mostró la descripción específica del error o código de negocio al enviar un reporte. ([SO-2115](https://softwaresamm.atlassian.net/browse/SO-2115))

## Versiones requeridas

| Componente | Versión mínima |
| ---------- | -------------- |
| SAMM API   | 1.2.33.1       |

> SA v1.2.33.1 es requerida para el envío de varios formatos de reporte y reportes adicionales, y para la sección de cambio de estado del equipo ([SO-518](https://softwaresamm.atlassian.net/browse/SO-518), [SO-2153](https://softwaresamm.atlassian.net/browse/SO-2153)).

## Referencias

- [SO-212: OTT3453 ROCA | Texto enriquecido y Envío de varios formatos RM y RA](https://softwaresamm.atlassian.net/browse/SO-212)
- [SO-518: OTT - 3576| Envío de varios formatos RM y RA](https://softwaresamm.atlassian.net/browse/SO-518)
- [SO-2119: OTT - 3576 | Enviar reportes adicionales seleccionados dentro del JSON de reporte](https://softwaresamm.atlassian.net/browse/SO-2119)
- [SO-2173: Eliminar opciones de alineación de texto en el editor enriquecido](https://softwaresamm.atlassian.net/browse/SO-2173)
- [SO-2141: Eliminar opciones de alineación de texto en el editor enriquecido](https://softwaresamm.atlassian.net/browse/SO-2141)
- [SO-626: OTT-3453 | Al estar escribiendo en el campo trabajos por cada letra se oculta el teclado por causa del texto enriquecido](https://softwaresamm.atlassian.net/browse/SO-626)
- [SO-2153: Mostrar sección de cambio de estado del equipo al habilitar el parámetro correspondiente](https://softwaresamm.atlassian.net/browse/SO-2153)
- [SO-2175: Mostrar sección de cambio de estado del equipo al habilitar el parámetro correspondiente](https://softwaresamm.atlassian.net/browse/SO-2175)
- [SO-2145: Reportar no disponibilidades](https://softwaresamm.atlassian.net/browse/SO-2145)
- [SO-2180: Reportar no disponibilidades](https://softwaresamm.atlassian.net/browse/SO-2180)
- [SO-2181: Reportar no disponibilidades](https://softwaresamm.atlassian.net/browse/SO-2181)
- [SO-2182: Reportar no disponibilidades](https://softwaresamm.atlassian.net/browse/SO-2182)
- [SO-2185: Permitir acceso a textos por defecto desde el utilitario de reporte técnico](https://softwaresamm.atlassian.net/browse/SO-2185)
- [SO-2115: Mostrar la descripción específica del error o código de negocio al enviar un reporte](https://softwaresamm.atlassian.net/browse/SO-2115)
