import Link from 'next/link';
import {
  APP_NAME,
  FACEBOOK_PROFILE_URL,
  INSTAGRAM_PROFILE_URL,
} from '../utils/constants';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { AiFillInstagram } from 'react-icons/ai';
import { useGlobalContext } from '../hooks/useGlobalContext';

const Footer = () => {
  const { categories } = useGlobalContext();
  return (
    <footer>
      <div className="max-w-2xl mx-auto bg-white border-t-4 border-gray-500 pt-2 px-2 pb-8">
        {/* header */}
        <div className="flex justify-between items-center py-2 border-b border-b-gray-400">
          <div
            className="cursor-pointer font-semibold uppercase font-serif px-[2px] bg-gray-200 shadow hover:shadow-gray-500 shadow-gray-400 hover:bg-gray-300 transition-all duration-500 text-lg mob:text-xl lg:text-2xl"
            aria-label={APP_NAME}
          >
            {APP_NAME}
          </div>
          <div className="flex items-center space-x-2 text-2xl mob:text-3xl">
            {FACEBOOK_PROFILE_URL && (
              <a href={FACEBOOK_PROFILE_URL} className="" target="_blank">
                <RiFacebookCircleFill color="#395498" />
              </a>
            )}
            {INSTAGRAM_PROFILE_URL && (
              <a
                href={INSTAGRAM_PROFILE_URL}
                className="instagram mob:h-6 mob:w-6 h-5 w-5 flex items-center justify-center rounded-lg"
                target="_blank"
              >
                <AiFillInstagram
                  className="mob:h-5 mob:w-5 h-4 w-4"
                  color="#fff"
                />
              </a>
            )}
          </div>
        </div>
        {/* site map */}
        <section className="border-b border-b-gray-400 py-2 grid grid-cols-2">
          <div className="col-span-1 text-center py-1">
            <div className="font-semibold cursor-pointer bg-green-300 hover:bg-green-400 transition-colors duration-600 capitalize inline-block px-3 py-1 rounded xs:min-w-[120px]">
              Categories
            </div>
            {categories.slice(0, 10).map((category) => (
              <div key={category.id} className="font-semibold px-2 py-1">
                <div>
                  <Link href={`/category/${category.name}`}>
                    {category.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 py-1">
            <div className="text-center">
              <h4 className="font-semibold cursor-pointer bg-green-300 hover:bg-green-400 transition-colors duration-600 capitalize inline-block px-3 py-1 rounded xs:min-w-[120px]">
                Follow on
              </h4>
              <div className="text-sm py-2 space-y-2 font-semibold">
                <div className="">
                  <a
                    href={FACEBOOK_PROFILE_URL}
                    className="hover:underline px-2 py-1"
                  >
                    Facebook
                  </a>
                </div>
                <div className="">
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    className="hover:underline px-2 py-1"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className=" text-center py-1">
              <h4 className="font-semibold cursor-pointer bg-green-300 hover:bg-green-400 transition-colors duration-600 capitalize inline-block px-3 py-1 rounded xs:min-w-[120px]">
                Pages
              </h4>
              <div className="text-sm py-2 space-y-2 font-semibold">
                <div>
                  <Link href="/">Home</Link>
                </div>
                <div>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* footer */}
        <div className="">
          <div
            className="capitalize text-sm font-thin text-center py-2 pointer-events-none"
            title={APP_NAME}
          >
            copyright &copy; {new Date().getFullYear()} {APP_NAME} - All rights
            reserved .
          </div>
          <div className="capitalize font-semibold text-sm text-center">
            Happy Coding
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
