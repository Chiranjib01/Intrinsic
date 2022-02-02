const PageProgressBar = () => {
  return (
    <div className="w-full h-[2px] bg-gray-300 z-30 overflow-hidden flex justify-center fixed top-0 right-0 left-0 ">
      <div className="bg-blue-500 h-full progressBar"></div>
    </div>
  );
};

export default PageProgressBar;
