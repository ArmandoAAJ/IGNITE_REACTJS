import Head from "next/head";
import styles from "../styles/home.modules.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Index Ig.news</title>
      </Head>
      <h1 className={styles.title}>Helo Word</h1>
    </>
  );
}
