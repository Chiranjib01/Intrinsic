import { APP_NAME } from '../utils/constants';

const SplashScreen = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[100] flex items-center justify-center">
      <span className="text-3xl md:text-5xl uppercase text-gray-300 font-bold font-serif">
        {APP_NAME}
      </span>
    </div>
  );
};

export default SplashScreen;
