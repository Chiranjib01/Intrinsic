import { getRedirectResult, User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import cookie from 'js-cookie';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../firebase/config';
import docToString from '../utils/docToString';

export type Post = {
  html: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  featuredImage: string;
  author: string;
  createdAt: string;
  slug: string;
  tag?: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type MessageType = {
  text: string;
  variant: string;
  timer: number;
};

type ContextType = {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  featuredImage: string;
  setFeaturedImage: Dispatch<SetStateAction<string>>;
  tags: string;
  setTags: Dispatch<SetStateAction<string>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  recentPosts: Array<Post>;
  setRecentPosts: Dispatch<SetStateAction<Array<Post>>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  recentPostsLoading: boolean;
  categories: Array<CategoryType>;
  setCategories: Dispatch<SetStateAction<Array<CategoryType>>>;
  signingUp: boolean;
  setSigningUp: Dispatch<SetStateAction<boolean>>;
  showMessage: Function;
  message: MessageType;
  tag?: string;
  setTag: Dispatch<SetStateAction<string>>;
  trendingPosts: Array<Post>;
  trendingPostsLoading: boolean;
};

const Context = createContext<ContextType>({
  html: '',
  setHtml: () => {},
  title: '',
  setTitle: () => {},
  category: '',
  setCategory: () => {},
  description: '',
  setDescription: () => {},
  featuredImage: '',
  setFeaturedImage: () => {},
  tags: '',
  setTags: () => {},
  tag: '',
  setTag: () => {},
  user: null,
  setUser: () => {},
  recentPosts: [],
  setRecentPosts: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  recentPostsLoading: false,
  categories: [],
  setCategories: () => {},
  signingUp: false,
  setSigningUp: () => {},
  showMessage: () => {},
  message: { text: '', variant: 'error', timer: 3000 },
  trendingPostsLoading: false,
  trendingPosts: [],
});

const Provider = ({ children }: PropsWithChildren<{}>) => {
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [tag, setTag] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState<Array<CategoryType>>([]);

  const [recentPostsLoading, setRecentPostsLoaing] = useState(false);
  const [recentPosts, setRecentPosts] = useState([
    {
      html: '',
      title: '',
      category: '',
      description: '',
      tags: '',
      featuredImage: '',
      author: '',
      createdAt: '',
      slug: '',
    },
  ]);

  const [trendingPostsLoading, setTrendingPostsLoaing] = useState(false);
  const [trendingPosts, setTrendingPosts] = useState([
    {
      html: '',
      title: '',
      category: '',
      description: '',
      tags: '',
      featuredImage: '',
      author: '',
      createdAt: '',
      slug: '',
    },
  ]);

  const [signingUp, setSigningUp] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    variant: '',
    timer: 3000,
  });

  //
  const [user, setUser] = useState(
    cookie.get('user') && JSON.parse(cookie.get('user')!).uid
      ? JSON.parse(cookie.get('user')!)
      : null
  );

  const showMessage = (message = '', variant = 'error', timer = 3000) => {
    setMessage({ text: message, variant, timer });
  };

  const value: ContextType = {
    html,
    setHtml,
    title,
    setTitle,
    description,
    setDescription,
    featuredImage,
    setFeaturedImage,
    category,
    setCategory,
    tags,
    setTags,
    tag,
    setTag,
    user,
    setUser,
    recentPosts,
    setRecentPosts,
    isAdmin,
    setIsAdmin,
    recentPostsLoading,
    categories,
    setCategories,
    signingUp,
    setSigningUp,
    showMessage,
    message,
    trendingPosts,
    trendingPostsLoading,
  };

  const fetchRecentPosts = async () => {
    const posts: Post[] = [];
    try {
      setRecentPostsLoaing(true);
      const docRef = await getDocs(
        query(
          collection(db, `articles`),
          limit(9),
          orderBy('createdAt', 'desc')
        )
      );
      docRef.forEach((item) => {
        if (item.exists()) {
          posts.push(docToString(item.data()));
        }
      });
      setRecentPosts(posts);
      setRecentPostsLoaing(false);
    } catch (err) {
      setRecentPosts([]);
      setRecentPostsLoaing(false);
    }
  };

  const fetchTrendingPosts = async () => {
    const posts: Post[] = [];
    try {
      setTrendingPostsLoaing(true);
      const docRef = await getDocs(
        query(
          collection(db, `articles`),
          limit(9),
          where('tag', '==', 'trending'),
          orderBy('createdAt', 'desc')
        )
      );
      docRef.forEach((item) => {
        if (item.exists()) {
          posts.push(docToString(item.data()));
        }
      });
      setTrendingPosts(posts);
      setTrendingPostsLoaing(false);
    } catch (err) {
      setTrendingPosts([]);
      setTrendingPostsLoaing(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data: CategoryType[] = [];
      const snapshot = await getDocs(
        query(collection(db, `categories`), orderBy('id', 'asc'))
      );
      snapshot.forEach((item) => {
        if (item.exists()) {
          data.push(docToString(item.data()));
        }
      });
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIsAdmin = async (id: string) => {
    try {
      const snapshot = await getDoc(doc(db, `users/${id}`));
      if (snapshot.exists()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {}
  };

  const getUserDetails = async () => {
    setSigningUp(true);
    try {
      const userCredentials = await getRedirectResult(auth);
      if (userCredentials) {
        const user = userCredentials.user;
        setUser(user);
        checkIsAdmin(user.uid);
        cookie.set('user', JSON.stringify(user), {
          expires: 3,
        });
      }
      setSigningUp(false);
    } catch (err) {
      setSigningUp(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
    if (user && user.uid) {
      checkIsAdmin(user.uid);
    }
    fetchCategories();
    fetchRecentPosts();
    fetchTrendingPosts();
  }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export default Provider;
