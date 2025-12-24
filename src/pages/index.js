import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

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
            <Translate
              id="homepage.startReading"
              description="The button text for starting to read the textbook">
              Start Reading - 7 min ⏱️
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const pageDescription = translate({
    id: 'homepage.description',
    message: 'Physical AI & Humanoid Robotics: From Digital Intelligence to Embodied Agents',
    description: 'The homepage meta description',
  });

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description={pageDescription}>
      <HomepageHeader />
      <main>
        {/* Optional: Add additional sections here */}
        <section className={styles.featuresSection}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>
                    <Translate
                      id="homepage.feature1.title"
                      description="The title for the Physical AI feature">
                      Physical AI
                    </Translate>
                  </h2>
                  <p>
                    <Translate
                      id="homepage.feature1.description"
                      description="The description for the Physical AI feature">
                      Learn about embodied systems that navigate, understand, and manipulate the physical world.
                    </Translate>
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>
                    <Translate
                      id="homepage.feature2.title"
                      description="The title for the Humanoid Robotics feature">
                      Humanoid Robotics
                    </Translate>
                  </h2>
                  <p>
                    <Translate
                      id="homepage.feature2.description"
                      description="The description for the Humanoid Robotics feature">
                      Discover the cutting-edge technology behind advanced humanoid robots and their applications.
                    </Translate>
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="padding-horiz--md">
                  <h2>
                    <Translate
                      id="homepage.feature3.title"
                      description="The title for the AI Integration feature">
                      AI Integration
                    </Translate>
                  </h2>
                  <p>
                    <Translate
                      id="homepage.feature3.description"
                      description="The description for the AI Integration feature">
                      Explore how artificial intelligence drives autonomous behavior in physical systems.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}