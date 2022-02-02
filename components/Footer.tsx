import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer>
      <div className="max-w-2xl mx-auto bg-white border-t-4 border-gray-500 pt-2 px-2 pb-8">
        {/* header */}
        <div className="flex justify-between items-center py-2 border-b border-b-gray-400">
          <div
            className="font-semibold font-serif text-2xl"
            aria-label={APP_NAME}
          >
            {APP_NAME}
          </div>
          <div className="flex items-center space-x-2 text-2xl mob:text-3xl">
            <a href={`https://facebook.com/${APP_NAME}`} className="">
              <RiFacebookCircleFill color="#395498" />
            </a>
            <a
              href={`https://www.youtube.com/channel/${APP_NAME}`}
              className=""
            >
              <AiFillYoutube color="#fe0000" />
            </a>
            <a href={`https://twitter.com/${APP_NAME}`} className="">
              <AiFillTwitterCircle color="#2ba5da" />
            </a>
          </div>
        </div>
        {/* site map */}
        <section className="flex justify-around border-b border-b-gray-400 py-2">
          <div className="">
            <h4 className="font-semibold border-b-2 pointer-events-none border-b-green-400 pr-2">
              Pages
            </h4>
            <div className="flex flex-col text-sm py-2 space-y-2">
              <Link href="/">Home</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold border-b-2 pointer-events-none border-b-green-400 pr-2">
              Follow us on
            </h4>
            <div className="flex flex-col text-sm py-2 space-y-2">
              <a href={`https://facebook.com/${APP_NAME}`}>Facebook</a>
              <a href={`https://twitter.com/${APP_NAME}`}>Twitter</a>
              <a href={`https://instagram.com/${APP_NAME}`}>Instagram</a>
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
            <Link href="/terms-of-use">terms of use</Link> |{' '}
            <Link href="/privacy-policy">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
