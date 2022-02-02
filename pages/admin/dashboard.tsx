import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Categories from '../../components/Categories';
import Contacts from '../../components/Contacts';
import Meta from '../../components/Meta';
import Posts from '../../components/Posts';
import { db } from '../../firebase/config';
import { Post, useGlobalContext } from '../../hooks/useGlobalContext';
import docToString from '../../utils/docToString';

interface Props {
  posts: Post[];
}

interface DashboardItemType {
  activeTab: string;
  setActiveTab: Function;
  text: string;
}

const DashboardItem: FC<DashboardItemType> = ({
  activeTab,
  setActiveTab,
  text,
}) => (
  <div
    onClick={() => setActiveTab(text)}
    className={`px-2 py-1 bg-gray-200 hover:bg-gray-300 border-b border-b-gray-300 cursor-pointer capitalize font-light ${
      activeTab === text && 'bg-gray-300 border-l-4 border-l-blue-500'
    }`}
  >
    {text}
  </div>
);

const Dashboard: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const { isAdmin } = useGlobalContext();
  useEffect(() => {
    if (!isAdmin) {
      router.replace(`/user/signin`);
    }
  }, [isAdmin]);
  const [activeTab, setActiveTab] = useState('posts');
  return (
    <main>
      <Meta title="Dashboard" />
      <div className="w-full max-w-2xl mx-auto bg-white grid xs:grid-cols-7 grid-cols-1 py-10">
        <div className="col-span-2">
          <div className="sticky top-[75px]">
            <DashboardItem
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              text="posts"
            />
            <DashboardItem
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              text="categories"
            />
            <DashboardItem
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              text="contacts"
            />
          </div>
        </div>
        <div className="col-span-5 border">
          {activeTab === 'posts' && (
            <Posts
              title="All Posts"
              posts={posts}
              dashboard={true}
              button={true}
            >
              <button
                onClick={() => router.push(`/admin/post/new`)}
                className="border border-gray-300 rounded px-2 capitalize text-sm text-indigo-600 shadow-sm shadow-gray-400 font-semibold cursor-pointer"
              >
                New
              </button>
            </Posts>
          )}
          {activeTab === 'categories' && <Categories />}
          {activeTab === 'contacts' && <Contacts />}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async () => {
  const posts: Post[] = [];
  try {
    const docRef = await getDocs(
      query(collection(db, `articles`), orderBy('createdAt', 'desc'))
    );
    docRef.forEach((item) => {
      if (item.exists()) {
        posts.push(docToString(item.data()));
      }
    });
  } catch (err) {
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
  return {
    props: {
      posts,
    },
  };
};

export default Dashboard;
