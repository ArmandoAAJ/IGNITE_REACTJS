import { GetStaticPaths, GetServerSideProps } from 'next';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { format, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  console.log(post);
  return (
    <>
      <Header />
      <img src="/banner.svg" alt="banner" className={styles.bnner} />
      <div className={commonStyles.contentContainer}>
        <h1 className={styles.content}>{post.data.title}</h1>
        <div className={styles.info}>
          <FiCalendar />
          <time>
            {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
              locale: ptBR,
            })}
          </time>
          <FiUser style={{ marginLeft: 31 }} />
          <time>{post.data.author}</time>
          <FiUser style={{ marginLeft: 31 }} />
          {post.last_publication_date && (
            <time>
              {formatDistance(
                new Date(post.last_publication_date),
                new Date(),
                {
                  locale: ptBR,
                }
              )}
            </time>
          )}
        </div>
        <main>
          {post?.data?.content?.map(groupContent => (
            <div key={groupContent.heading}>
              <h2>{groupContent.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(groupContent.body),
                }}
              />
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response: Post = await prismic.getByUID('post', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: RichText.asText(response.data.title),
      banner: {
        url: response.data.banner.url,
      },
      author: RichText.asText(response.data.author),
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
