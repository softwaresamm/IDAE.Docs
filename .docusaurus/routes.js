import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/IDAE.Docs/__docusaurus/debug',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug', '151'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/config',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/config', 'dc2'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/content',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/content', 'c08'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/globalData', '464'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/metadata', 'c21'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/registry',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/registry', 'c31'),
    exact: true
  },
  {
    path: '/IDAE.Docs/__docusaurus/debug/routes',
    component: ComponentCreator('/IDAE.Docs/__docusaurus/debug/routes', '257'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog',
    component: ComponentCreator('/IDAE.Docs/blog', '469'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/archive',
    component: ComponentCreator('/IDAE.Docs/blog/archive', 'b74'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/authors',
    component: ComponentCreator('/IDAE.Docs/blog/authors', '24f'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/IDAE.Docs/blog/authors/all-sebastien-lorber-articles', 'c57'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/authors/yangshun',
    component: ComponentCreator('/IDAE.Docs/blog/authors/yangshun', '93b'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/first-blog-post',
    component: ComponentCreator('/IDAE.Docs/blog/first-blog-post', '86f'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/long-blog-post',
    component: ComponentCreator('/IDAE.Docs/blog/long-blog-post', '602'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/mdx-blog-post',
    component: ComponentCreator('/IDAE.Docs/blog/mdx-blog-post', '880'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/tags',
    component: ComponentCreator('/IDAE.Docs/blog/tags', 'cbf'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/tags/docusaurus',
    component: ComponentCreator('/IDAE.Docs/blog/tags/docusaurus', '28e'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/tags/facebook',
    component: ComponentCreator('/IDAE.Docs/blog/tags/facebook', '265'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/tags/hello',
    component: ComponentCreator('/IDAE.Docs/blog/tags/hello', '6d6'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/tags/hola',
    component: ComponentCreator('/IDAE.Docs/blog/tags/hola', '335'),
    exact: true
  },
  {
    path: '/IDAE.Docs/blog/welcome',
    component: ComponentCreator('/IDAE.Docs/blog/welcome', 'f4c'),
    exact: true
  },
  {
    path: '/IDAE.Docs/markdown-page',
    component: ComponentCreator('/IDAE.Docs/markdown-page', '36a'),
    exact: true
  },
  {
    path: '/IDAE.Docs/docs',
    component: ComponentCreator('/IDAE.Docs/docs', '4d0'),
    routes: [
      {
        path: '/IDAE.Docs/docs',
        component: ComponentCreator('/IDAE.Docs/docs', '5dc'),
        routes: [
          {
            path: '/IDAE.Docs/docs',
            component: ComponentCreator('/IDAE.Docs/docs', '41d'),
            routes: [
              {
                path: '/IDAE.Docs/docs/app-tecnicos/permissions',
                component: ComponentCreator('/IDAE.Docs/docs/app-tecnicos/permissions', '250'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/category/app-técnicos',
                component: ComponentCreator('/IDAE.Docs/docs/category/app-técnicos', '32e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/category/sammnew',
                component: ComponentCreator('/IDAE.Docs/docs/category/sammnew', 'a9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/category/util---solicitudes',
                component: ComponentCreator('/IDAE.Docs/docs/category/util---solicitudes', '954'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/intro',
                component: ComponentCreator('/IDAE.Docs/docs/intro', 'fae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/sammnew/state-request-report',
                component: ComponentCreator('/IDAE.Docs/docs/sammnew/state-request-report', '782'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/sammnew/surveyed-person',
                component: ComponentCreator('/IDAE.Docs/docs/sammnew/surveyed-person', 'b52'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/util-solicitudes/search-settings',
                component: ComponentCreator('/IDAE.Docs/docs/util-solicitudes/search-settings', '947'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/IDAE.Docs/',
    component: ComponentCreator('/IDAE.Docs/', '959'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
