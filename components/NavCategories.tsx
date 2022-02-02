import { NavItem } from './NavItems';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useEffect, useState } from 'react';

const NavCategories = ({ activeItem, setActiveItem }: any) => {
  const { categories } = useGlobalContext();

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

  return (
    <>
      {categories.length ? (
        <section className="w-full bg-white border-b sticky top-[49px] mob:top-[47px] shadow shadow-gray-400 z-10">
          <div
            className={`w-full max-w-2xl mx-auto flex justify-between items-center py-[2px]  border-x border-green-500 overflow-x-scroll scroll-smooth
            ${!isMobile && categories.length > 10 && 'pb-[10px]'} ${
              !isMobile &&
              'scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100'
            }`}
          >
            {categories.map((category) => (
              <div
                className="border-x flex-1 text-center border-green-500 cursor-pointer hover:bg-gray-200 font-semibold text-xs max-w-[180px] min-w-fit px-[6px]"
                key={category.id}
              >
                <NavItem
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  name={category.name}
                  path={`/category/${category.name}`}
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div />
      )}
    </>
  );
};
export default NavCategories;
