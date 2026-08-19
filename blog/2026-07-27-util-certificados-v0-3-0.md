---
title: "Utilitario Certificados v0.3.0"
description: "Novedades del Utilitario Certificados versión 0.3.0."
authors: [equipo-idae]
tags: [util-certificados, release]
date: 2026-07-27
slug: util-certificados-v0-3-0
---

Primera nota de versión del Utilitario Certificados: incorpora autenticación, un Dashboard de certificados y el filtrado de certificados de valor por unidad posición.

<!-- truncate -->

## Novedades

- Se implementó el manejo de autenticación del utilitario. ([SO-708](https://softwaresamm.atlassian.net/browse/SO-708))
- Se agregó un Dashboard de certificados, incluyendo el indicador de alcance. ([SO-763](https://softwaresamm.atlassian.net/browse/SO-763), [SO-767](https://softwaresamm.atlassian.net/browse/SO-767))
- Se ajustó el formulario de creación y edición de certificados: el formato de fecha ahora es dd/mm/aaaa, la creación prioriza primero la unidad y luego el componente, y la columna "objeto" del listado se renombró a "nombre". ([SO-767](https://softwaresamm.atlassian.net/browse/SO-767))
- Se agregó la columna "Categoría" en la pantalla de listado de certificados. ([SO-760](https://softwaresamm.atlassian.net/browse/SO-760))
- Se añadió una pantalla para relacionar equipos o unidades de posición con sus certificados. ([SO-761](https://softwaresamm.atlassian.net/browse/SO-761))
- Los certificados de valor ahora pueden filtrarse por la unidad de posición seleccionada en la consulta, mostrando tanto los certificados de los equipos anclados como el valor certificado consolidado de la unidad. ([SO-773](https://softwaresamm.atlassian.net/browse/SO-773), [SO-774](https://softwaresamm.atlassian.net/browse/SO-774))

## Versiones requeridas

| Componente | Versión mínima |
| ---------- | -------------- |
| SAMM API   | 1.2.30.1       |

## Referencias

- [SO-708: Manejo de autenticación](https://softwaresamm.atlassian.net/browse/SO-708)
- [SO-763: Dashboard de certificados](https://softwaresamm.atlassian.net/browse/SO-763)
- [SO-767: Adición de alcance en Dashboard](https://softwaresamm.atlassian.net/browse/SO-767)
- [SO-760: Adicionar columna categoria a pantalla listado de certificados](https://softwaresamm.atlassian.net/browse/SO-760)
- [SO-761: Pantalla para relacionar equipos o unidad posicion contra certificados](https://softwaresamm.atlassian.net/browse/SO-761)
- [SO-773: Filtrar certificados de valor por unidad posición seleccionada en consulta](https://softwaresamm.atlassian.net/browse/SO-773)
- [SO-774: Filtrar certificados de valor por unidad posición seleccionada en consulta](https://softwaresamm.atlassian.net/browse/SO-774)
