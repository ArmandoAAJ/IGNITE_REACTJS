import { useState } from 'react';
import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [postsNextPage, setPostsNextPage] = useState(postsPagination.next_page);

  return (
    <main className={commonStyles.contentContainer}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="logo" />
        <img src="/spacetraveling.png" alt="spacetraveling" />
        <div />
      </div>
      <div className={styles.content}>
        {posts.map(post => (
          <a href="/" key={post.uid}>
            <strong>{post.data.title}</strong>
            <p>{post.data.subtitle}</p>
            <div>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
              <FiUser style={{ marginLeft: 31 }} />
              <time>{post.data.author}</time>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    { fetch: ['post.title', 'post.author', 'post.subtitle'], pageSize: 1 }
  );

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.last_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: RichText.asText(post.data.title),
        subtitle: RichText.asText(post.data.subtitle),
        author: RichText.asText(post.data.author),
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results,
      },
    },
  };
};
