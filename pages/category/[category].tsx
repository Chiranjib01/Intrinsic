import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React from 'react';
import Meta from '../../components/Meta';
import Posts from '../../components/Posts';
import { db } from '../../firebase/config';
import { Post as PostType } from '../../hooks/useGlobalContext';
import { APP_NAME } from '../../utils/constants';
import docToString from '../../utils/docToString';

interface CategoryPosts {
  category: string;
  posts: PostType[];
}

const SpecificCategoryPosts = ({ category, posts }: CategoryPosts) => {
  return (
    <div>
      <Meta title={`${APP_NAME} - Category ${category}`} />
      <div className="mx-auto bg-white max-w-2xl pt-2 pb-4 px-2">
        {/* header */}
        <div className="text-xl mob:text-2xl  font-serif border-b-4 border-b-gray-500 py-2 pointer-events-none ">
          <span>Category : </span>
          <span className="text-blue-600">{category}</span>
        </div>
        {/* posts */}
        {posts.length ? (
          <div className="w-full pt-4">
            <Posts posts={posts} />
          </div>
        ) : (
          <div className="text-center pt-4 pb-2 font-semibold text-xl mob:text-2xl">
            No Post Found 🙄🙄
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface Props {
  params: {
    category: string;
  };
}

export const getStaticProps = async ({ params: { category } }: Props) => {
  if (!category) {
    return {
      notFound: true,
    };
  }
  const posts: PostType[] = [];
  try {
    const snapshot = await getDocs(
      query(
        collection(db, `articles`),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )
    );
    snapshot.forEach((item) => {
      if (item.exists()) {
        posts.push(docToString(item.data()));
      }
    });
  } catch (err) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      category,
      posts,
    },
    revalidate: 20 * 60, // 20 minutes
  };
};

export default SpecificCategoryPosts;
