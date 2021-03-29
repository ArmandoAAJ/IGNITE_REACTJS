import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>POST | IGNEWS</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de Marco de 2021</time>
            <strong>asihdiuahd iaushdiasud iasdhaiusdh</strong>
            <p>
              dgaiusdgas ausdausd idsasiud isdhiasud dsbaiusdiasd
              daisdbiashdasdv asdugduasgdusGADS AdaSGDUAyhdghsdvuydgwquydh
            </p>
          </a>
          <a>
            <time>12 de Marco de 2021</time>
            <strong>asihdiuahd iaushdiasud iasdhaiusdh</strong>
            <p>
              dgaiusdgas ausdausd idsasiud isdhiasud dsbaiusdiasd
              daisdbiashdasdv asdugduasgdusGADS AdaSGDUAyhdghsdvuydgwquydh
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
