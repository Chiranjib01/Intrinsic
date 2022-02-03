import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Meta from '../../components/Meta';
import Post from '../../components/Post';
import { APP_NAME } from '../../utils/constants';
import { db } from '../../firebase/config';
import { useGlobalContext } from '../../hooks/useGlobalContext';

const Search = () => {
  const router = useRouter();
  const { q } = router?.query;
  const [posts, setPosts] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useGlobalContext();
  const searchPosts = async () => {
    try {
      setLoading(true);
      const data: DocumentData = [];
      const snapshot = await getDocs(
        query(
          collection(db, `articles`),
          orderBy('title', 'asc'),
          where('title', '>=', q),
          where('title', '<=', q + '\uf8ff'),
          orderBy('createdAt', 'desc')
        )
      );
      snapshot.forEach((post) => {
        if (post.exists()) {
          data.push(post.data());
        }
      });
      setPosts(data);
      setLoading(false);
    } catch (err: any) {
      showMessage(err?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    searchPosts();
  }, [q]);
  return (
    <div>
      <Meta
        title={`Search - ${q}`}
        keywords={`${q?.toString().split(' ')}`}
        description={`Search results for ${q} from ${APP_NAME}`}
      />
      <div className="max-w-2xl mx-auto bg-white pb-16 px-2">
        <div className="font-semibold py-4 break-words">
          Search Results for : {q}
        </div>
        {q ? (
          loading ? (
            <div className="flex items-center justify-center">Loading...</div>
          ) : (
            <section>
              <div className="w-full max-w-2xl mx-auto bg-white">
                <div
                  className={`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 px-1`}
                >
                  {posts.map((post: any) => (
                    <Post key={post?.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )
        ) : (
          <div className="flex items-center justify-center text-lg">
            No Result Found!!🙄🙄
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
