import { PropsWithChildren } from 'react';
import { Post as PostType } from '../hooks/useGlobalContext';
import Post from './Post';

interface PostsType {
  posts: PostType[];
  title?: string;
  dashboard?: boolean;
  button?: boolean;
}

const Posts = ({
  posts,
  title,
  dashboard,
  button,
  children,
}: PropsWithChildren<PostsType>) => {
  return (
    <section>
      <div className="w-full max-w-2xl mx-auto bg-white">
        {/* title */}
        {title && (
          <div className="bg-gray-200 py-2 px-2 border-l-[1rem] border-gray-500 capitalize font-semibold text-base sm:text-lg mb-6 flex justify-between">
            <span className="pointer-events-none">{title}</span>
            {button && children}
          </div>
        )}
        {/* posts */}
        <div
          className={`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 px-1 ${
            dashboard &&
            'sm:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 xs:px-12 px-2 sm:px-6'
          }`}
        >
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
