---
title: "Utilitario Reporte Técnico v3.1.0"
description: "Novedades del Utilitario Reporte Técnico versión 3.1.0."
authors: [equipo-idae]
tags: [util-reporte-tecnico, release]
date: 2026-07-10
slug: util-reporte-tecnico-v3-1-0
---

Esta versión incorpora las secciones principales del reporte técnico (información general, técnicos, actividades, repuestos, adjuntos, checklist y firma), junto con el manejo de autenticación, canal de atención, ubicación y limpieza de estado al reportar.

<!-- truncate -->

## Novedades

- Se implementó el manejo de autenticación a partir de querystring en la URL, con redirección desde la web (Programación, Tab Trabajos y reporte dinámico) y renovación automática del token de acceso. ([SO-697](https://softwaresamm.atlassian.net/browse/SO-697))
- Se agregó la sección de información general para visualizar los datos del reporte. ([SO-703](https://softwaresamm.atlassian.net/browse/SO-703))
- Se incorporó el manejo del canal de atención dentro del reporte. ([SO-712](https://softwaresamm.atlassian.net/browse/SO-712))
- Se agregó el envío de la ubicación al momento de reportar. ([SO-711](https://softwaresamm.atlassian.net/browse/SO-711))
- Se agregó la sección de técnicos. ([SO-713](https://softwaresamm.atlassian.net/browse/SO-713))
- Se agregó la sección de actividades. ([SO-714](https://softwaresamm.atlassian.net/browse/SO-714))
- Se agregó la sección de repuestos instalados. ([SO-717](https://softwaresamm.atlassian.net/browse/SO-717))
- Se agregó la sección de repuestos sugeridos. ([SO-718](https://softwaresamm.atlassian.net/browse/SO-718))
- Se agregó la sección de adjuntos. ([SO-727](https://softwaresamm.atlassian.net/browse/SO-727))
- Se agregó la sección de checklist. ([SO-737](https://softwaresamm.atlassian.net/browse/SO-737))
- Se agregó la sección de firma principal. ([SO-731](https://softwaresamm.atlassian.net/browse/SO-731))
- Se realizó la limpieza del estado al reportar, para evitar datos residuales de un reporte anterior. ([SO-740](https://softwaresamm.atlassian.net/browse/SO-740))
- Se incluyó el envío de un identificador en los archivos adjuntos. ([SO-752](https://softwaresamm.atlassian.net/browse/SO-752))

## Referencias

- [SO-697: Manejo de Autenticación](https://softwaresamm.atlassian.net/browse/SO-697)
- [SO-703: Sección: Información General](https://softwaresamm.atlassian.net/browse/SO-703)
- [SO-712: Manejo de canal de atención](https://softwaresamm.atlassian.net/browse/SO-712)
- [SO-711: Envío de ubicación al reportar](https://softwaresamm.atlassian.net/browse/SO-711)
- [SO-713: Sección de técnicos](https://softwaresamm.atlassian.net/browse/SO-713)
- [SO-714: Sección de actividades](https://softwaresamm.atlassian.net/browse/SO-714)
- [SO-717: Sección de repuestos instalados](https://softwaresamm.atlassian.net/browse/SO-717)
- [SO-718: Sección de repuestos sugeridos](https://softwaresamm.atlassian.net/browse/SO-718)
- [SO-727: Sección de adjuntos](https://softwaresamm.atlassian.net/browse/SO-727)
- [SO-737: Sección de Checklist](https://softwaresamm.atlassian.net/browse/SO-737)
- [SO-731: Sección firma principal](https://softwaresamm.atlassian.net/browse/SO-731)
- [SO-740: Limpieza de estado al reportar](https://softwaresamm.atlassian.net/browse/SO-740)
- [SO-752: Envío de identificador en adjuntos](https://softwaresamm.atlassian.net/browse/SO-752)
