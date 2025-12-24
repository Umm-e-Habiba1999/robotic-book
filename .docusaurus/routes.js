import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ur/blog',
    component: ComponentCreator('/ur/blog', 'fde'),
    exact: true
  },
  {
    path: '/ur/blog/archive',
    component: ComponentCreator('/ur/blog/archive', '1c5'),
    exact: true
  },
  {
    path: '/ur/blog/tags',
    component: ComponentCreator('/ur/blog/tags', '14b'),
    exact: true
  },
  {
    path: '/ur/blog/tags/ai',
    component: ComponentCreator('/ur/blog/tags/ai', '86f'),
    exact: true
  },
  {
    path: '/ur/blog/tags/education',
    component: ComponentCreator('/ur/blog/tags/education', 'c18'),
    exact: true
  },
  {
    path: '/ur/blog/tags/robotics',
    component: ComponentCreator('/ur/blog/tags/robotics', '5e0'),
    exact: true
  },
  {
    path: '/ur/blog/tags/textbook',
    component: ComponentCreator('/ur/blog/tags/textbook', '852'),
    exact: true
  },
  {
    path: '/ur/blog/welcome',
    component: ComponentCreator('/ur/blog/welcome', '323'),
    exact: true
  },
  {
    path: '/ur/docs',
    component: ComponentCreator('/ur/docs', 'ec8'),
    routes: [
      {
        path: '/ur/docs',
        component: ComponentCreator('/ur/docs', 'f9e'),
        routes: [
          {
            path: '/ur/docs',
            component: ComponentCreator('/ur/docs', '3c7'),
            routes: [
              {
                path: '/ur/docs/appendices/appendix-a',
                component: ComponentCreator('/ur/docs/appendices/appendix-a', '127'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendices/appendix-b',
                component: ComponentCreator('/ur/docs/appendices/appendix-b', '426'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendices/appendix-c',
                component: ComponentCreator('/ur/docs/appendices/appendix-c', '2e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendices/appendix-d',
                component: ComponentCreator('/ur/docs/appendices/appendix-d', 'cdc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendices/appendix-e',
                component: ComponentCreator('/ur/docs/appendices/appendix-e', '787'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/appendices/appendix-f',
                component: ComponentCreator('/ur/docs/appendices/appendix-f', '9da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/intro',
                component: ComponentCreator('/ur/docs/intro', '8a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part1/chapter1',
                component: ComponentCreator('/ur/docs/part1/chapter1', 'd25'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part1/chapter2',
                component: ComponentCreator('/ur/docs/part1/chapter2', 'bd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part1/chapter3',
                component: ComponentCreator('/ur/docs/part1/chapter3', '2c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part2/chapter4',
                component: ComponentCreator('/ur/docs/part2/chapter4', '9c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part2/chapter5',
                component: ComponentCreator('/ur/docs/part2/chapter5', '558'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part2/chapter6',
                component: ComponentCreator('/ur/docs/part2/chapter6', '9db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part3/chapter7',
                component: ComponentCreator('/ur/docs/part3/chapter7', 'ee7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part3/chapter8',
                component: ComponentCreator('/ur/docs/part3/chapter8', '92f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part3/chapter9',
                component: ComponentCreator('/ur/docs/part3/chapter9', '154'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part4/chapter10',
                component: ComponentCreator('/ur/docs/part4/chapter10', 'a83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part4/chapter11',
                component: ComponentCreator('/ur/docs/part4/chapter11', '14f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part4/chapter12',
                component: ComponentCreator('/ur/docs/part4/chapter12', 'f11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part5/chapter13',
                component: ComponentCreator('/ur/docs/part5/chapter13', '71f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part5/chapter14',
                component: ComponentCreator('/ur/docs/part5/chapter14', '959'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part5/chapter15',
                component: ComponentCreator('/ur/docs/part5/chapter15', 'f49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part6/chapter16',
                component: ComponentCreator('/ur/docs/part6/chapter16', '2bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part6/chapter17',
                component: ComponentCreator('/ur/docs/part6/chapter17', 'ee3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part6/chapter18',
                component: ComponentCreator('/ur/docs/part6/chapter18', '4dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/part7/chapter19',
                component: ComponentCreator('/ur/docs/part7/chapter19', 'b77'),
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
    path: '/ur/',
    component: ComponentCreator('/ur/', '3b1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
