import { signOut } from 'firebase/auth';
import cookie from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../utils/constants';
import { auth } from '../firebase/config';
import { useGlobalContext } from '../hooks/useGlobalContext';
import NavItems from './NavItems';
import Sidebar from './Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowDropupCircle } from 'react-icons/io';
import NavCategories from './NavCategories';
import LogoutModal from './LogoutModal';
import PopUpMessage from './PopUpMessage';

const Header = () => {
  const router = useRouter();
  const { asPath } = router;
  const [activeItem, setActiveItem] = useState(() =>
    asPath.replace('%20', ' ')
  );
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setActiveItem(asPath.replace('%20', ' '));
  }, [asPath]);

  const { setUser, isAdmin, setIsAdmin, showMessage, message } =
    useGlobalContext();
  const [searchText, setSearchText] = useState('');

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      cookie.remove('user');
      if (isAdmin) {
        setIsAdmin(false);
      }
      setUser(null);
    } catch (err) {
      setUser(null);
      router.reload();
    }
  };

  const searchHandler = (e: any) => {
    e.preventDefault();
    router.push(`/posts/search?q=${searchText}`);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="w-full bg-white border-b border-b-gray-300 sticky top-0 z-20">
        {message.text && <PopUpMessage />}
        {showLogoutModal && (
          <LogoutModal
            showModal={setShowLogoutModal}
            signOutHandler={signOutHandler}
          />
        )}
        <div className="mob:hidden">
          {showSidebar && (
            <Sidebar
              showSidebar={setShowSidebar}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
              setShowLogoutModal={setShowLogoutModal}
            />
          )}
        </div>
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center px-2 sm:px-0 py-2 flex-wrap">
          <div className="text-2xl flex items-center">
            <div
              className="mob:hidden w-8 h-8 mr-1 cursor-pointer flex items-center justify-center"
              title="Open Menu"
              onClick={() => setShowSidebar(true)}
            >
              <AiOutlineMenu className="hover:bg-gray-200  border border-gray-300 rounded-full h-full w-full p-[3px]" />
            </div>
            <Link href="/">
              <span
                className="cursor-pointer font-semibold uppercase font-serif px-[2px] bg-gray-200 shadow hover:shadow-gray-500 shadow-gray-400 hover:bg-gray-300 transition-all duration-500 text-lg mob:text-xl lg:text-2xl"
                onClick={() => setActiveItem('/')}
                title={APP_NAME}
              >
                {APP_NAME}
              </span>
            </Link>
          </div>
          <form
            onSubmit={searchHandler}
            className="flex-1 mob:mx-auto max-w-xs px-2"
          >
            <input
              title="Search Post"
              className="w-full border border-gray-500 rounded py-1 mob:px-2 px-1 text-sm shadow focus:shadow-gray-500 hover:shadow-gray-500 focus:outline outline-black"
              type="text"
              placeholder="Seach..."
              name="q"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
          <NavItems
            setShowLogoutModal={setShowLogoutModal}
            showSidebar={setShowSidebar}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          {scrollY > 600 && (
            <div className="relative">
              <div className="absolute h-screen">
                <IoIosArrowDropupCircle
                  className="absolute right-1 bottom-14 z-10 h-8 w-8 cursor-pointer text-black opacity-70 hover:opacity-100"
                  onClick={() => {
                    if (typeof window) {
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <NavCategories activeItem={activeItem} setActiveItem={setActiveItem} />
    </>
  );
};
export default Header;
