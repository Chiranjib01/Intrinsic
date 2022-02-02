import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { APP_NAME } from '../utils/constants';
import NavItems from './NavItems';

interface SideBar {
  showSidebar: Function;
  setActiveItem: Function;
  activeItem: string;
  setShowLogoutModal: Function;
}

const Sidebar = ({
  showSidebar,
  setActiveItem,
  activeItem,
  setShowLogoutModal,
}: SideBar) => {
  const closeSidebar = (e: any) => {
    if (e.target.id === 'close' || e.target.tagName === 'path') {
      showSidebar(false);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0">
      <div className="w-[60%] max-w-xs h-full bg-white opacity-100 fixed left-0 z-[60]">
        <div className="absolute left-0 right-0 top-0 flex justify-between items-center px-2 py-2">
          <span
            className="cursor-pointer font-semibold uppercase font-serif px-[2px] bg-gray-200 shadow hover:shadow-gray-500 shadow-gray-400 hover:bg-gray-300 transition-all duration-500 ml-2 text-xl"
            title={APP_NAME}
          >
            {APP_NAME}
          </span>
          <div
            className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-full"
            title="Close Menu"
          >
            <AiOutlineClose
              id="close"
              onClick={closeSidebar}
              className="hover:bg-gray-200  border border-gray-300 rounded-full h-full w-full p-[2px] z-10"
            />
          </div>
        </div>
        <div className="mt-10 px-4 py-2">
          <NavItems
            classes="space-y-2"
            setActiveItem={setActiveItem}
            activeItem={activeItem}
            showSidebar={showSidebar}
            setShowLogoutModal={setShowLogoutModal}
            sidebar={true}
          />
        </div>
      </div>
      <div
        className="fixed right-0 w-full h-full bg-black opacity-60"
        id="close"
        onClick={closeSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
