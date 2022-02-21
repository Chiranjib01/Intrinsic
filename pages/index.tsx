import Meta from '../components/Meta';
import Posts from '../components/Posts';
import { APP_NAME } from '../utils/constants';
import { useGlobalContext } from '../hooks/useGlobalContext';
import CircularLoader from '../components/CircularLoader';
import SplashScreen from '../components/SplashScreen';

const Home = () => {
  const {
    recentPosts,
    recentPostsLoading,
    trendingPosts,
    trendingPostsLoading,
  } = useGlobalContext();

  return (
    <div>
      <Meta
        title={`${APP_NAME} - A Place to read , learn and share very nice and informative articles`}
      />
      <div className="max-w-2xl h-full mx-auto bg-white px-4 py-8">
        {!recentPosts.length && !trendingPosts.length && (
          <div className="text-center">No Post Here 🙄🙄</div>
        )}
        {/* recent posts */}
        {recentPostsLoading ? (
          <SplashScreen />
        ) : (
          recentPosts.length > 0 && (
            <div className="w-full">
              <Posts posts={recentPosts} title="Recent Posts" />
            </div>
          )
        )}
        {/* trending */}
        {trendingPostsLoading ? (
          <CircularLoader />
        ) : (
          trendingPosts.length > 0 && (
            <div className="w-full pt-4">
              <Posts posts={trendingPosts} title="Trending Posts" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
