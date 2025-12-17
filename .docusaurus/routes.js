import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '81d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '8d5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'b8e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'f0a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'abb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '1ed'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '7ab'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'c95'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '396'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'fa7'),
    exact: true
  },
  {
    path: '/blog/tags/ai',
    component: ComponentCreator('/blog/tags/ai', 'cc0'),
    exact: true
  },
  {
    path: '/blog/tags/education',
    component: ComponentCreator('/blog/tags/education', '350'),
    exact: true
  },
  {
    path: '/blog/tags/robotics',
    component: ComponentCreator('/blog/tags/robotics', 'c34'),
    exact: true
  },
  {
    path: '/blog/tags/textbook',
    component: ComponentCreator('/blog/tags/textbook', '69a'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '491'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ffc'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0d9'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'ab2'),
            routes: [
              {
                path: '/docs/appendices/appendix-a',
                component: ComponentCreator('/docs/appendices/appendix-a', 'bba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-b',
                component: ComponentCreator('/docs/appendices/appendix-b', 'd52'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-c',
                component: ComponentCreator('/docs/appendices/appendix-c', 'db0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-d',
                component: ComponentCreator('/docs/appendices/appendix-d', '861'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-e',
                component: ComponentCreator('/docs/appendices/appendix-e', '67f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-f',
                component: ComponentCreator('/docs/appendices/appendix-f', '087'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'aed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part1/chapter1',
                component: ComponentCreator('/docs/part1/chapter1', '74f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part1/chapter2',
                component: ComponentCreator('/docs/part1/chapter2', 'a9f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part1/chapter3',
                component: ComponentCreator('/docs/part1/chapter3', 'e32'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part2/chapter4',
                component: ComponentCreator('/docs/part2/chapter4', '340'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part2/chapter5',
                component: ComponentCreator('/docs/part2/chapter5', 'dc3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part2/chapter6',
                component: ComponentCreator('/docs/part2/chapter6', '9aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part3/chapter7',
                component: ComponentCreator('/docs/part3/chapter7', '051'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part3/chapter8',
                component: ComponentCreator('/docs/part3/chapter8', 'b1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part3/chapter9',
                component: ComponentCreator('/docs/part3/chapter9', 'afd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part4/chapter10',
                component: ComponentCreator('/docs/part4/chapter10', 'c63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part4/chapter11',
                component: ComponentCreator('/docs/part4/chapter11', '3a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part4/chapter12',
                component: ComponentCreator('/docs/part4/chapter12', 'f23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part5/chapter13',
                component: ComponentCreator('/docs/part5/chapter13', 'de5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part5/chapter14',
                component: ComponentCreator('/docs/part5/chapter14', '2de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part5/chapter15',
                component: ComponentCreator('/docs/part5/chapter15', 'b71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part6/chapter16',
                component: ComponentCreator('/docs/part6/chapter16', 'ccd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part6/chapter17',
                component: ComponentCreator('/docs/part6/chapter17', 'e87'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part6/chapter18',
                component: ComponentCreator('/docs/part6/chapter18', '420'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/part7/chapter19',
                component: ComponentCreator('/docs/part7/chapter19', 'b66'),
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
    path: '/',
    component: ComponentCreator('/', '6ce'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
