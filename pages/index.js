import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Iframe from 'react-iframe';

export default function Home() {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[This is a test nextJS page]</p>
          <p>
            (<Link href="../posts/first-post">Test</Link>.)
          </p>
        </section>
          <Iframe url="https://www.sdrive.app/embed/1ptBQD"
                  width="640px"
                  height="320px"
                  id=""
                  className=""
                  display="block"
                  position="relative"/>
      </Layout>
  );
}