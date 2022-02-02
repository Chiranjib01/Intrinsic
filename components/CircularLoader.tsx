import { BiLoaderCircle } from 'react-icons/bi';

const CircularLoader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex items-center justify-center"></div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="text-white">
          <BiLoaderCircle className="circularLoader h-10 w-10" />
        </div>
      </div>
    </>
  );
};

export default CircularLoader;
