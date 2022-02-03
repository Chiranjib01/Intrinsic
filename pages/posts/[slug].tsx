import 'suneditor/dist/css/suneditor.min.css';
import toArray from '../../utils/toArray';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import docToString from '../../utils/docToString';
import { Post, useGlobalContext } from '../../hooks/useGlobalContext';
import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import { BASE_URL } from '../../utils/constants';
import Link from 'next/link';
import {
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
} from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface ArticleType {
  post: Post;
}

const Article = ({ post }: ArticleType) => {
  const { isAdmin, showMessage } = useGlobalContext();
  const router = useRouter();
  const {
    html,
    title,
    category,
    description,
    tags,
    featuredImage,
    author,
    createdAt,
    slug,
  } = post;

  // detect device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const details = navigator.userAgent;
    const regExp = /android|iphone|ipad|kindle/i;
    const mobile = regExp.test(details);
    if (mobile) {
      setIsMobile(true);
    }
  }, []);

  const deletePostHandler = async () => {
    if (confirm('Are You Sure?')) {
      try {
        await deleteDoc(doc(db, `articles/${slug}`));
        showMessage('Deleted Successfully', 'success');
        router.push(`/admin/dashboard`);
      } catch (err: any) {
        showMessage(err?.message);
      }
    }
  };

  return (
    <div>
      <Meta
        title={title}
        description={description}
        keywords={`${tags},${category},${slug.split('-').toString()}`}
      />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BASE_URL}/posts/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 md:mt-[10px] pb-10 pt-[10px]">
        <div className="py-1 px-4 bg-white space-x-2 truncate">
          <span
            className="hover:cursor-pointer hover:text-green-500 font-semibold text-sm"
            title="Home"
          >
            <Link href="/">Home</Link>
          </span>
          &nbsp;&gt;&gt;
          <span
            className="hover:cursor-pointer hover:text-green-500 font-semibold text-sm"
            title={category}
          >
            <Link href={`/category/${category}`}>{category}</Link>
          </span>
          &nbsp;&gt;&gt;
          <span
            className="hover:cursor-pointer hover:text-green-500 font-semibold text-sm"
            title={title}
          >
            <Link href={`/posts/${slug}`}>{title}</Link>
          </span>
        </div>
        <div className="px-4 py-3">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-48 object-cover border border-gray-200"
            aria-label={slug}
            title={title}
          />
          <h1
            className="text-3xl py-2 font-semibold cursor-pointer"
            title={title}
            aria-label={title}
          >
            {title}
          </h1>
          <div className="pl-[2px] font-semibold text-xs text-gray-400 pointer-events-none">
            By <span className="capitalize text-gray-500">{author}</span> On{' '}
            <span className="capitalize text-gray-500">{createdAt}</span>
          </div>
          <div className="py-2 text-sm pl-[2px] flex justify-between">
            <div className="space-x-2 text-green-500 font-bold">
              <span title={category}>
                Category :{' '}
                <Link href={`/category/${category}`}>{category}</Link>
              </span>
              {isAdmin && (
                <>
                  <button
                    onClick={() => router.push(`/admin/post/edit/${slug}`)}
                    className="border border-gray-300 rounded px-2 capitalize text-xs xs:text-sm text-blue-600 shadow-sm shadow-gray-400 font-semibold"
                  >
                    edit
                  </button>
                  <button
                    onClick={deletePostHandler}
                    className="border border-gray-300 rounded px-2 capitalize text-xs xs:text-sm text-red-600 shadow-sm shadow-gray-400 font-semibold"
                  >
                    delete
                  </button>
                </>
              )}
            </div>
            <div className="space-x-2 text-blue-500 font-bold flex text-2xl mob:text-3xl">
              <span title="Share On Facebook">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}/posts/${slug}`}
                  target="_blank"
                >
                  <RiFacebookCircleFill color="#395498" />
                </a>
              </span>
              <span title="Share On Whatsapp">
                <a
                  href={`${
                    isMobile
                      ? 'whatsapp://send?text='
                      : 'https://web.whatsapp.com://send?text='
                  }${BASE_URL}/posts/${slug}`}
                  data-action="share/whatsapp/share"
                  target="_blank"
                >
                  <RiWhatsappFill color="#24b735" />
                </a>
              </span>
              <span title="Share On LinkedIn">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${BASE_URL}/posts/${slug}&title=${title}&summary=${description}&source=`}
                  target="_blank"
                >
                  <RiLinkedinBoxFill color="#0077b0" />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="border-t"></div>
        <div
          className="sun-editor-editable !py-[10px]"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div className="border-t"></div>
        <div className="px-4 py-4 space-x-2 text-sm font-semibold pointer-events-none flex flex-wrap space-y-2 items-center">
          <span className="px-1 pt-1">Tags :</span>
          {toArray(tags).map((tag) => (
            <span key={tag} className="bg-teal-500 px-2 rounded-sm text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params: { slug } }: any) => {
  let post = null;
  try {
    const postRef = await getDoc(doc(db, `articles/${slug}`));
    if (!postRef.exists()) {
      return {
        notFound: true,
      };
    }
    post = docToString(postRef.data());
  } catch (err) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 20 * 60, //20 minutes
  };
};

export default Article;
