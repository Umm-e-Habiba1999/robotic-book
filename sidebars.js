// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Part I: Foundations of Physical AI',
      items: [
        'part1/chapter1',
        'part1/chapter2',
        'part1/chapter3',
        
      ],
    },
    {
      type: 'category',
      label: 'Part II: Robotic Nervous System (ROS 2)',
      items: [
        'part2/chapter4',
        'part2/chapter5',
        'part2/chapter6',
      ],
    },
    {
      type: 'category',
      label: 'Part III: Digital Twins & Simulation',
      items: [
        'part3/chapter7',
        'part3/chapter8',
        'part3/chapter9',
      ],
    },
    {
      type: 'category',
      label: 'Part IV: AI Robot Brain (NVIDIA Isaac)',
      items: [
        'part4/chapter10',
        'part4/chapter11',
        'part4/chapter12',
      ],
    },
    {
      type: 'category',
      label: 'Part V: Vision-Language-Action Systems',
      items: [
        'part5/chapter13',
        'part5/chapter14',
        'part5/chapter15',
      ],
    },
    {
      type: 'category',
      label: 'Part VI: Humanoid Robotics',
      items: [
        'part6/chapter16',
        'part6/chapter17',
        'part6/chapter18',
      ],
    },
    {
      type: 'category',
      label: 'Part VII: Capstone Project',
      items: [
        'part7/chapter19',
      ],
    },
    {
      type: 'category',
      label: 'Appendices',
      items: [
        'appendices/appendix-a',
        'appendices/appendix-b',
        'appendices/appendix-c',
        'appendices/appendix-d',
        'appendices/appendix-e',
        'appendices/appendix-f',
      ],
    },
  ],
};

module.exports = sidebars;