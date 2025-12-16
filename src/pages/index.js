import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Reading - 7 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics: From Digital Intelligence to Embodied Agents">
      <HomepageHeader />
      <main>
        {/* Optional: Add additional sections here */}
        <section className={styles.featuresSection}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>Physical AI</h2>
                  <p>Learn about embodied systems that navigate, understand, and manipulate the physical world.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>Humanoid Robotics</h2>
                  <p>Discover the cutting-edge technology behind advanced humanoid robots and their applications.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>AI Integration</h2>
                  <p>Explore how artificial intelligence drives autonomous behavior in physical systems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}