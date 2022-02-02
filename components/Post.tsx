import Link from 'next/link';

const Post = ({ post }: any) => {
  const { title, description, featuredImage, slug } = post;
  return (
    <Link href={`/posts/${slug}`}>
      <article
        className="col-span-1 rounded-md border border-gray-500 cursor-pointer shadow-md hover:shadow-gray-400"
        title={title}
        aria-label={title}
      >
        <img src={featuredImage} alt="" className="w-full h-40" />
        <div className="font-semibold truncate px-1 py-1">{title}</div>
        <div className="text-sm px-1 pt-1 pb-2">{`${description.slice(
          0,
          88
        )} ...`}</div>
      </article>
    </Link>
  );
};

export default Post;
