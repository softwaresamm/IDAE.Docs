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
    component: ComponentCreator('/IDAE.Docs/docs', '17c'),
    routes: [
      {
        path: '/IDAE.Docs/docs',
        component: ComponentCreator('/IDAE.Docs/docs', 'f54'),
        routes: [
          {
            path: '/IDAE.Docs/docs',
            component: ComponentCreator('/IDAE.Docs/docs', '8f7'),
            routes: [
              {
                path: '/IDAE.Docs/docs/category/tutorial---basics',
                component: ComponentCreator('/IDAE.Docs/docs/category/tutorial---basics', '047'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/category/tutorial---extras',
                component: ComponentCreator('/IDAE.Docs/docs/category/tutorial---extras', 'c3d'),
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
                path: '/IDAE.Docs/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/congratulations', '391'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/create-a-blog-post', '532'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/create-a-document', 'f51'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/create-a-page', '252'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/deploy-your-site', '4c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-basics/markdown-features', '829'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-extras/manage-docs-versions', 'a3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/IDAE.Docs/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/IDAE.Docs/docs/tutorial-extras/translate-your-site', 'b0b'),
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
