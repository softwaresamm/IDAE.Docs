// Catálogo de productos IDAE ↔ épicas de Jira ↔ notas de versión del blog.
//
// FUENTE ÚNICA para la página `/versiones` y la sección "Últimas versiones" de
// la página principal. Cada producto corresponde a una épica del proyecto Jira
// `SO` (https://softwaresamm.atlassian.net).
//
// Convención Jira: cada versión se nombra con un PREFIJO de producto seguido del
// número (ej. "SW 5.5.32.22" → Samm Web). El skill `jira-release-notes` usa el
// campo `prefix` para traducir prefijo → producto al crear cada nota.
//
// AL PUBLICAR UNA NOTA DE VERSIÓN: añade su release al inicio del array
// `releases` del producto correspondiente (más reciente primero). El `href` es
// el `slug` del post del blog, con la forma `/blog/<slug>`.

export type Release = {
  /** Número de versión sin prefijo, ej. "5.5.32.22". */
  version: string;
  /** Fecha de liberación en ISO (AAAA-MM-DD). */
  date: string;
  /** URL de la nota en el blog (slug del post), ej. "/blog/samm-web-v5-5-32-22". */
  href: string;
};

export type Product = {
  /** Slug del tag en `blog/tags.yml` (agrupa las novedades del producto). */
  slug: string;
  /** Nombre visible del producto. */
  label: string;
  /** Emoji identificador. */
  icon: string;
  /** Prefijo de la versión en Jira (proyecto SO). */
  prefix: string;
  /** Clave de la épica de Jira, si se conoce. */
  epic?: string;
  /** Ruta a la documentación del producto, si existe (evitar enlaces rotos). */
  docLink?: string;
  /** Releases del producto, más reciente primero. */
  releases: Release[];
};

/**
 * Catálogo completo. El orden define la presentación en `/versiones`.
 * Mantén `prefix` sincronizado con el nombre de las versiones en Jira.
 */
export const products: Product[] = [
  {
    slug: "samm-web",
    label: "SAMM Web",
    icon: "🖥️",
    prefix: "SW",
    epic: "SO-258",
    docLink: "/docs/category/sammnew",
    releases: [
      {
        version: "5.5.32.22",
        date: "2026-07-09",
        href: "/blog/samm-web-v5-5-32-22",
      },
      {
        version: "5.5.32.20",
        date: "2026-04-01",
        href: "/blog/samm-web-v5-5-32-20",
      },
      {
        version: "5.5.32.19",
        date: "2026-03-11",
        href: "/blog/samm-web-v5-5-32-19",
      },
      {
        version: "5.5.32.17",
        date: "2026-03-04",
        href: "/blog/samm-web-v5-5-32-17",
      },
    ],
  },
  {
    slug: "samm-new",
    label: "SammNew",
    icon: "🆕",
    prefix: "SN",
    releases: [
      {
        version: "7.1.13.1",
        date: "2026-07-07",
        href: "/blog/samm-new-v7-1-13-1",
      },
      {
        version: "7.1.12.0",
        date: "2026-05-28",
        href: "/blog/samm-new-v7-1-12-0",
      },
      {
        version: "7.1.11.4",
        date: "2026-05-06",
        href: "/blog/samm-new-v7-1-11-4",
      },
      {
        version: "7.1.11.2",
        date: "2026-04-01",
        href: "/blog/samm-new-v7-1-11-2",
      },
      {
        version: "7.1.10.13",
        date: "2026-02-25",
        href: "/blog/samm-new-v7-1-10-13",
      },
    ],
  },
  {
    slug: "samm-api",
    label: "SAMM API",
    icon: "🔌",
    prefix: "SA",
    releases: [
      {
        version: "1.2.27.0",
        date: "2026-06-08",
        href: "/blog/samm-api-v1-2-27-0",
      },
      {
        version: "1.2.25.0",
        date: "2026-05-13",
        href: "/blog/samm-api-v1-2-25-0",
      },
      {
        version: "1.2.24.0",
        date: "2026-05-06",
        href: "/blog/samm-api-v1-2-24-0",
      },
    ],
  },
  {
    slug: "samm-reporte",
    label: "SAMM Reporte",
    icon: "📄",
    prefix: "SR",
    releases: [
      {
        version: "6.0.0.11",
        date: "2026-03-25",
        href: "/blog/samm-reporte-v6-0-0-11",
      },
    ],
  },
  {
    slug: "samm-ai",
    label: "SAMMAI",
    icon: "🤖",
    prefix: "SAI",
    releases: [],
  },
  {
    slug: "app-tecnicos",
    label: "App Técnicos",
    icon: "📱",
    prefix: "APP",
    docLink: "/docs/app-tecnicos",
    releases: [
      {
        version: "2.3.2.2",
        date: "2026-07-09",
        href: "/blog/app-tecnicos-v2-3-2-2",
      },
      {
        version: "2.3.1.1",
        date: "2026-06-22",
        href: "/blog/app-tecnicos-v2-3-1-1",
      },
      {
        version: "2.3.0.11",
        date: "2026-05-13",
        href: "/blog/app-tecnicos-v2-3-0-11",
      },
      {
        version: "2.3.0.9",
        date: "2026-05-08",
        href: "/blog/app-tecnicos-v2-3-0-9",
      },
    ],
  },
  {
    slug: "app-ai",
    label: "App AI",
    icon: "📲",
    prefix: "APA",
    releases: [],
  },
  {
    slug: "febancol",
    label: "FEBANCOL / SAFE",
    icon: "🏦",
    prefix: "FEB",
    releases: [],
  },
  {
    slug: "vibrancy",
    label: "Vibrancy",
    icon: "📡",
    prefix: "VIB",
    releases: [],
  },
  {
    slug: "util-descarga",
    label: "Descarga Masiva",
    icon: "⬇️",
    prefix: "DM",
    releases: [
      {
        version: "0.2.0",
        date: "2026-04-22",
        href: "/blog/util-descarga-v0-2-0",
      },
    ],
  },
  {
    slug: "util-reportes",
    label: "Utilitario Reportes",
    icon: "📊",
    prefix: "UTR",
    docLink: "/docs/util-reportes",
    releases: [
      {
        version: "0.3.1",
        date: "2026-02-25",
        href: "/blog/util-reportes-v0-3-1",
      },
    ],
  },
  {
    slug: "util-solicitudes",
    label: "Utilitario Solicitudes",
    icon: "📝",
    prefix: "UTS",
    releases: [],
  },
  {
    slug: "util-reporte-tecnico",
    label: "Utilitario Reporte Técnico",
    icon: "🛠️",
    prefix: "URT",
    releases: [],
  },
  {
    slug: "util-certificados",
    label: "Utilitario Certificados",
    icon: "🎓",
    prefix: "UTC",
    releases: [],
  },
];

/** Formatea una fecha ISO (AAAA-MM-DD) a texto legible en es-CO. */
export function formatReleaseDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Productos que ya tienen al menos una versión publicada. */
export function productsWithReleases(): Product[] {
  return products.filter((p) => p.releases.length > 0);
}

/** Busca un producto por su prefijo de versión de Jira (ej. "SW"). */
export function productByPrefix(prefix: string): Product | undefined {
  const norm = prefix.trim().toUpperCase();
  return products.find((p) => p.prefix.toUpperCase() === norm);
}
