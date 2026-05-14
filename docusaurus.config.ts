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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/softwaresamm/IDAE.Docs/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/softwaresamm/IDAE.Docs/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
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
        alt: "IDAE Soluciones",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentación",
        },
        { to: "/blog", label: "Novedades", position: "left" },
        {
          href: "https://idaesoluciones.com",
          label: "idaesoluciones.com",
          position: "right",
        },
        {
          href: "https://github.com/softwaresamm/IDAE.Docs",
          label: "GitHub",
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
              to: "/docs/sammnew",
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
              label: "Novedades",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/softwaresamm/IDAE.Docs",
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
