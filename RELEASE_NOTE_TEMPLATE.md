# Plantilla de Nota de Versión (Novedades)

Guía para publicar un lanzamiento en el blog **Novedades** (`/blog`) de IDAE.Docs, visible para los usuarios finales.

## Cómo publicar

1. Crea un archivo en `blog/` con el nombre `AAAA-MM-DD-<producto>-v<X.Y.Z>.md`
   (ej. `2026-07-08-app-tecnicos-v2-0-2.md`). La fecha del nombre es la fecha de publicación.
2. Copia el contenido de abajo (desde el bloque `---`) y complétalo. Incluye
   `slug: <producto>-v<X-Y-Z>` para que la URL sea estable (`/blog/<slug>`).
3. Etiqueta con el **producto** (épica de Jira) y `release`. Los productos válidos están en `blog/tags.yml`.
4. Enlaza cada cambio a su ticket de Jira: `https://softwaresamm.atlassian.net/browse/SO-###`.
5. **Registra la versión** en `src/data/products.ts`: añade `{ version, date, href }`
   al inicio del array `releases` del producto (más reciente primero). Ese catálogo
   alimenta la página `/versiones` y la sección **Últimas versiones** de la home.
6. Valida el build antes del PR: `npm run build` (falla si hay enlaces internos rotos — `onBrokenLinks: "throw"`).
7. Al aprobar y hacer merge a `main`, GitHub Actions despliega automáticamente a GitHub Pages.

> Correspondencia con Jira: **épica = producto** (etiqueta), **fix version = versión** del post. El nombre de la versión en Jira lleva un **prefijo de producto** (ej. `SW 5.5.32.22` → Samm Web); ese prefijo está mapeado en `src/data/products.ts`.

---

## Contenido a copiar

```markdown
---
title: "App Técnicos v2.0.2"
description: "Resumen de novedades y correcciones de la versión 2.0.2."
authors: [equipo-idae]
tags: [app-tecnicos, release]
date: 2026-07-08
slug: app-tecnicos-v2-0-2
---

Resumen breve (1-2 frases) del lanzamiento y su impacto para el usuario.

<!-- truncate -->

## Novedades

- Descripción funcional del cambio, en lenguaje de usuario. ([SO-123](https://softwaresamm.atlassian.net/browse/SO-123))
- Otra mejora relevante. ([SO-124](https://softwaresamm.atlassian.net/browse/SO-124))

## Correcciones

- Qué se corrigió y cómo afecta al usuario. ([SO-125](https://softwaresamm.atlassian.net/browse/SO-125))

## Versiones requeridas

| Componente     | Versión mínima |
| -------------- | -------------- |
| SAMMAPI        | X.Y.Z          |
| SAMMNEW        | X.Y.Z          |
| Base de Datos  | C-X.Y.Z        |

## Referencias

- [SO-123: título del ticket](https://softwaresamm.atlassian.net/browse/SO-123)
```

## Notas

- El marcador `<!-- truncate -->` define el resumen que se muestra en la lista de Novedades (evita el aviso `onUntruncatedBlogPosts`).
- La tabla "Versiones requeridas" es opcional; inclúyela cuando el lanzamiento dependa de versiones mínimas de otros componentes (mismo formato que `DOCUMENTATION_TEMPLATE.md`).
- Si etiquetas con una versión suelta (ej. `v2.0.2`) que no está en `tags.yml`, el build solo emite un aviso, no falla.
