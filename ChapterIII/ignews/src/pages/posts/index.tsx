import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>POST | IGNEWS</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de Marco de 2021</time>
            <strong>asihdiuahd iaushdiasud iasdhaiusdh</strong>
            <p>
              dgaiusdgas ausdausd idsasiud isdhiasud dsbaiusdiasd
              daisdbiashdasdv asdugduasgdusGADS AdaSGDUAyhdghsdvuydgwquydh
            </p>
          </a>
          <a href="">
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "publication")],
    { fetch: ["publication.title", "publication.content"], pageSize: 100 }
  );

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
  };
};
