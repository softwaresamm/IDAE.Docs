import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "IDAE Soluciones",
  tagline: "Plataforma de Documentación Técnica",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // URL pública de GitHub Pages
  url: "https://softwaresamm.github.io",
  baseUrl: "/IDAE.Docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "softwaresamm", // Usually your GitHub org/user name.
  projectName: "IDAE.Docs", // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          // "ALL" para que el sidebar de cada post pueda filtrarse por
          // producto (ver src/theme/BlogPostPage) sin perder versiones
          // antiguas por el límite de "recientes".
          blogSidebarCount: "ALL",
          blogSidebarTitle: "Otras versiones",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["es"],
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: "/docs",
        blogRouteBasePath: "/blog",
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
        searchBarShortcut: false,
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "IDAE Soluciones",
      logo: {
        alt: "SAMM — IDAE Soluciones",
        src: "img/logo-samm.jpg",
        className: "navbar__logo-samm",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentación",
        },
        { to: "/versiones", label: "Versiones", position: "left" },
        {
          href: "https://idaesoluciones.com",
          label: "idaesoluciones.com",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Productos",
          items: [
            {
              label: "SAMM Web",
              to: "/docs/category/sammnew",
            },
            {
              label: "Utilidades - Reportes",
              to: "/docs/util-reportes",
            },
            {
              label: "App Técnicos",
              to: "/docs/app-tecnicos",
            },
          ],
        },
        {
          title: "IDAE Soluciones",
          items: [
            {
              label: "Sitio web",
              href: "https://idaesoluciones.com",
            },
            {
              label: "Contáctenos",
              href: "https://idaesoluciones.com/contacto",
            },
          ],
        },
        {
          title: "Repositorio",
          items: [
            {
              label: "Versiones",
              to: "/versiones",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IDAE Soluciones S.A.S. Todos los derechos reservados.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
