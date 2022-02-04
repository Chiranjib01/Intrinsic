import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Meta from '../../components/Meta';
import { APP_NAME } from '../../utils/constants';
import { auth } from '../../firebase/config';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import CircularLoader from '../../components/CircularLoader';

const SignIn = () => {
  const { user, signingUp, showMessage } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      showMessage('Signed In', 'info');
      router.push('/');
    }
  }, [user]);
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      setLoading(false);
      showMessage('SignIn Successfull', 'success');
      router.replace('/');
    } catch (err: any) {
      showMessage(err?.message);
      setLoading(false);
    }
  };
  return (
    <div className="h-full">
      <Meta
        title={`SignIn To ${APP_NAME}`}
        keywords={`signin to ${APP_NAME},login to ${APP_NAME},${APP_NAME} login page,${APP_NAME} signin page,${APP_NAME?.toLowerCase()} login page,${APP_NAME?.toLowerCase()} signin page`}
      />
      {signingUp && <CircularLoader />}
      <div className="max-w-2xl mx-auto  bg-white w-full h-full flex items-center justify-center py-28">
        <button
          disabled={loading || signingUp}
          className="px-2 py-1 rounded outline outline-2 outline-black outline-offset-2 font-semibold bg-black text-white text-center capitalize disabled:bg-slate-700 disabled:outline-slate-700 disabled:cursor-not-allowed"
          onClick={signInWithGoogle}
        >
          SignIn With Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
