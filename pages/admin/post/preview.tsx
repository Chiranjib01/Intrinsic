import { useGlobalContext } from '../../../hooks/useGlobalContext';
import 'suneditor/dist/css/suneditor.min.css';
import toArray from '../../../utils/toArray';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Meta from '../../../components/Meta';

const Preview = () => {
  const router = useRouter();
  const { html, title, category, tags, featuredImage, user, isAdmin } =
    useGlobalContext();
  useEffect(() => {
    if (!isAdmin) {
      router.replace(`/user/signin`);
    }
  }, [isAdmin]);
  return (
    <div className="">
      <Meta title="Preview" />
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 md:mt-[10px] mb-10 py-[10px]">
        <span
          className="mx-4 font-semibold text-blue-600 uppercase text-sm cursor-pointer px-2 py-1 hover:bg-blue-300"
          onClick={() => router.push('/admin/post/new')}
        >
          Back
        </span>
        <div className="px-4 py-3 pointer-events-none">
          <img
            src={featuredImage}
            alt=""
            className="w-full h-48 object-cover"
          />
          <h1 className="text-3xl py-2 font-semibold">{title}</h1>
          <div className="pl-[2px] font-semibold text-xs text-gray-400">
            By{' '}
            <span className="capitalize text-gray-500">
              {user?.displayName}
            </span>{' '}
            On{' '}
            <span className="capitalize text-gray-500">
              {new Date().toLocaleString()}
            </span>
          </div>
          <div className="py-2 text-sm pl-[2px] font-semibold text-green-500">
            Category : <span>{category}</span>
          </div>
        </div>
        <div className="border-t"></div>
        <div
          // className="sun-editor-editable !my-[10px] !mx-auto outline-dashed outline-[1px] outline-[#ccc]"
          className="sun-editor-editable !py-[10px]"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div className="border-t"></div>
        <div className="px-4 py-4 space-x-2 text-sm font-semibold pointer-events-none flex flex-wrap space-y-2 items-center">
          <span className="px-1 pt-1">Tags :</span>
          {toArray(tags).map((tag) => (
            <span key={tag} className="bg-teal-500 px-2 rounded-sm text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
