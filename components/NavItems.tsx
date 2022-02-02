import Link from 'next/link';
import { useGlobalContext } from '../hooks/useGlobalContext';

type NavItemType = {
  setActiveItem: Function;
  name: string;
  activeItem: string;
  path: string;
  showSidebar?: Function;
};

interface NavItemsType {
  setActiveItem: Function;
  activeItem: string;
  setShowLogoutModal: Function;
  sidebar?: boolean;
  classes?: string;
  showSidebar?: Function;
}

export const NavItem = ({
  setActiveItem,
  activeItem,
  name,
  path,
  showSidebar,
}: NavItemType) => {
  return (
    <Link href={path}>
      <div
        className={`capitalize cursor-pointer hover:text-green-500 font-semibold ${
          activeItem === path && 'text-green-500'
        }`}
        onClick={() => {
          setActiveItem(path);
          if (showSidebar) {
            showSidebar(false);
          }
        }}
        title={name}
      >
        {name}
      </div>
    </Link>
  );
};

const NavItems = ({
  setActiveItem,
  activeItem,
  sidebar,
  classes,
  showSidebar,
  setShowLogoutModal,
}: NavItemsType) => {
  const { isAdmin, user } = useGlobalContext();
  return (
    <div
      className={`${!sidebar && 'hidden mob:flex space-x-3'} ${
        !sidebar && 'block'
      } items-center ${classes}`}
    >
      <NavItem
        setActiveItem={setActiveItem}
        activeItem={activeItem}
        showSidebar={showSidebar}
        name="home"
        path="/"
      />
      <NavItem
        setActiveItem={setActiveItem}
        activeItem={activeItem}
        showSidebar={showSidebar}
        name="about"
        path="/about"
      />
      <NavItem
        setActiveItem={setActiveItem}
        activeItem={activeItem}
        showSidebar={showSidebar}
        name="contact"
        path="/contact"
      />
      {isAdmin && (
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          showSidebar={showSidebar}
          name="controls"
          path="/admin/dashboard"
        />
      )}
      {/* signin button */}
      {user ? (
        <button
          onClick={() => setShowLogoutModal(true)}
          type="button"
          className={`capitalize text-white bg-blue-500 px-1  rounded cursor-pointer shadow hover:shadow-gray-500 font-semibold`}
        >
          LogOut
        </button>
      ) : (
        <button
          type="button"
          className={`capitalize text-white bg-green-500 px-1  rounded cursor-pointer shadow hover:shadow-gray-500 font-semibold`}
          onClick={() => setActiveItem('/user/signin')}
        >
          <Link href="/user/signin">SignIn</Link>
        </button>
      )}
    </div>
  );
};

export default NavItems;
