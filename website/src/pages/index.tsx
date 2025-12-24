// import type {ReactNode} from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
// import Heading from '@theme/Heading';

// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home(): ReactNode {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }





import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Physical AI & Humanoid Robotics" description="Learn Humanoid Robotics with ROS2, Gazebo, Isaac, and VLA.">
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🤖 Physical AI & Humanoid Robotics</h1>
        <p>Welcome to the official textbook for the Hackathon!</p>
        <p>Learn ROS 2, Digital Twin Simulation, NVIDIA Isaac AI, and LLM-powered humanoid controls.</p>

        <h2>🚀 Get Started</h2>
        <p>Follow tutorials, complete exercises, and build your autonomous humanoid!</p>

        <h3>📚 Available Sections</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>01 - Course Overview</li>
          <li>02 - Module 1: ROS 2</li>
          <li>03 - Module 2: Digital Twin</li>
          <li>04 - Module 3: AI Robot Brain</li>
          <li>05 - Module 4: Vision-Language-Action</li>
          <li>06 - Learning Outcomes</li>
          <li>07 - Weekly Breakdown</li>
          <li>08 - Hardware Requirements</li>
        </ul>

        <p>Start your journey today! 🌟</p>
      </main>
    </Layout>
  );
}
