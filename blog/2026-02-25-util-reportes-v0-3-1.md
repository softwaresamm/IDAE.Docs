---
title: "Utilitario Reportes v0.3.1"
description: "Novedades del Utilitario de Reportes versión 0.3.1."
authors: [equipo-idae]
tags: [util-reportes, release]
date: 2026-02-25
slug: util-reportes-v0-3-1
---

Esta versión consolida la migración del reporte técnico hacia el Utilitario de Reportes y añade generación de PDF, checklist dinámico y varias mejoras en el manejo de archivos adjuntos y consultas.

<!-- truncate -->

## Novedades

- El reporte técnico ahora se genera desde el Utilitario de Reportes, dejando atrás la dependencia de SammNew. ([SO-347](https://softwaresamm.atlassian.net/browse/SO-347))
- Se mejoró la forma en que el sistema solicita los archivos para visualizarlos o descargarlos, haciendo el proceso más consistente. ([SO-362](https://softwaresamm.atlassian.net/browse/SO-362))
- Se solucionó la visualización del formato al ingresar al reporte técnico desde el utilitario. ([SO-374](https://softwaresamm.atlassian.net/browse/SO-374))
- El nombre del archivo adjunto ahora se toma directamente del procedimiento almacenado, evitando nombres genéricos o inconsistentes. ([SO-375](https://softwaresamm.atlassian.net/browse/SO-375))
- Se mejoró el manejo de consultas extensas (tipo sábana) dentro del utilitario. ([SO-376](https://softwaresamm.atlassian.net/browse/SO-376))
- Se ajustaron los consumos de servicios del utilitario para manejar correctamente las dependencias entre reportes. ([SO-394](https://softwaresamm.atlassian.net/browse/SO-394))
- Al descargar el formato de impresión, el archivo ahora conserva el nombre correcto. ([SO-430](https://softwaresamm.atlassian.net/browse/SO-430))
- Ahora es posible generar el reporte directamente en PDF desde el Utilitario de Reportes. ([SO-1832](https://softwaresamm.atlassian.net/browse/SO-1832))
- Se habilitó la configuración de un checklist dinámico para el formato de la básica, aplicable al reporte técnico y a la orden de trabajo (OT). ([SO-529](https://softwaresamm.atlassian.net/browse/SO-529))

## Correcciones

- Se corrigieron los parámetros de los formatos de la básica que generaban inconsistencias. ([SO-528](https://softwaresamm.atlassian.net/browse/SO-528))
- Se corrigió un error por el cual el servicio sr_api entregaba una versión desactualizada del PDF. ([SO-544](https://softwaresamm.atlassian.net/browse/SO-544))

## Referencias

- [SO-347: Migración Reporte técnico de SammNew a Utilitario de Reportes](https://softwaresamm.atlassian.net/browse/SO-347)
- [SO-362: Ajustar objeto para solicitar archivo que será visualizado o descargado](https://softwaresamm.atlassian.net/browse/SO-362)
- [SO-374: En el utilitario al ir al reporte técnico no Muestra el Formato](https://softwaresamm.atlassian.net/browse/SO-374)
- [SO-375: Nombre del adjunto sea tomado del SP](https://softwaresamm.atlassian.net/browse/SO-375)
- [SO-376: Manejo de consultas (sabanas)](https://softwaresamm.atlassian.net/browse/SO-376)
- [SO-394: Ajustar consumos desde utilitario para el manejo de dependencias](https://softwaresamm.atlassian.net/browse/SO-394)
- [SO-430: Al momento de descargar el formato de impresion del utilitario de reportes, quede con el nombre del archivo](https://softwaresamm.atlassian.net/browse/SO-430)
- [SO-1832: Generar PDF desde utilitario de reportes](https://softwaresamm.atlassian.net/browse/SO-1832)
- [SO-529: Configuración de formato checklist dinámico para la básica, en reporte técnico y OT](https://softwaresamm.atlassian.net/browse/SO-529)
- [SO-528: Ajuste de Parametros formatos de la basica](https://softwaresamm.atlassian.net/browse/SO-528)
- [SO-544: sr_api no entrega PDF actualizado](https://softwaresamm.atlassian.net/browse/SO-544)
