import { useRouter } from 'next/router';
import 'suneditor/dist/css/suneditor.min.css';
import { useEffect, useState } from 'react';
import { Post, useGlobalContext } from '../../../../hooks/useGlobalContext';
import options from '../../../../utils/editorOptions';
import dynamic from 'next/dynamic';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from '../../../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import docToString from '../../../../utils/docToString';
import Meta from '../../../../components/Meta';

const Editor = dynamic(() => import('suneditor-react'), { ssr: false });

interface PostType {
  post: Post;
}

const EditPost = ({ post }: PostType) => {
  const router = useRouter();
  const { isAdmin, categories, showMessage } = useGlobalContext();
  useEffect(() => {
    if (!isAdmin) {
      router.push(`/posts/${post?.slug}`);
    }
  }, [isAdmin]);

  const [html, setHtml] = useState(post?.html);
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage);
  const [category, setCategory] = useState(post?.category);
  const [tags, setTags] = useState(post?.tags);
  const [tag, setTag] = useState(post?.tag);

  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onImageChange = (e: any) => {
    if (!e?.target?.files || !e?.target?.files[0]) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      setFile(e?.target?.result);
    };
  };
  const uploadImage = async () => {
    if (loading || !file) {
      return;
    }
    try {
      setLoading(true);
      const storageRef = ref(
        storage,
        `posts/featuredImage/image-${Date.now()}`
      );
      await uploadString(storageRef, file, 'data_url');
      const url = await getDownloadURL(storageRef);
      setFeaturedImage(url);
      showMessage('Uploaded Successfully', 'success');
      setLoading(false);
    } catch (err: any) {
      showMessage(err?.message);
      setLoading(false);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (
      loading ||
      !title ||
      !category ||
      !description ||
      !featuredImage ||
      !tags ||
      !html
    ) {
      showMessage('All Fields Are Required');
      return;
    }
    if (
      !isAdmin ||
      !title.trim() ||
      !category.trim() ||
      !description.trim() ||
      !featuredImage.trim() ||
      !tags.trim() ||
      !html.trim()
    ) {
      showMessage('All Fields Are Required');
      return;
    }
    try {
      setLoading(true);
      await updateDoc(doc(db, `articles/${post?.slug}`), {
        title,
        category,
        description,
        featuredImage,
        tags,
        html,
        tag,
      });
      setTitle('');
      setCategory('');
      setDescription('');
      setTags('');
      setTag('');
      setFeaturedImage('');
      setHtml('');
      showMessage('Post Updated', 'success');
      setLoading(false);
      router.push(`/posts/${post?.slug}`);
    } catch (err: any) {
      showMessage(err?.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Meta title="Edit Post" />
      <form onSubmit={submitHandler}>
        <div className="bg-white px-2">
          {/* title */}
          <div className="py-2" aria-label="Enter Title of The Article">
            <label htmlFor="title" className="text-xl font-semibold capitalize">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full border px-4 py-2 my-2 font-semibold focus:outline outline-black"
              type="text"
              id="title"
              placeholder="Enter Title of The Article ..."
            />
          </div>
          {/* description */}
          <div className="py-2" aria-label="Enter Description of The Article">
            <label
              htmlFor="description"
              className="text-xl font-semibold capitalize"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
              id="description"
              rows={5}
              placeholder="Enter Description of The Article ..."
            />
          </div>
          {/* featured image */}
          <div className="py-2">
            <label
              htmlFor="featuredImage"
              className="text-xl font-semibold capitalize"
            >
              Featured Image
            </label>
            <input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
              type="text"
              id="title"
              placeholder="Featured Image Link"
            />
            <input
              onChange={onImageChange}
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
              type="file"
              id="featuredImage"
              aria-label="Choose Featured Image"
            />
            <button
              type="button"
              onClick={uploadImage}
              className="bg-pink-600 rounded-sm shadow-md shadow-pink-500 px-4 py-1 font-semibold"
            >
              Upload
            </button>
          </div>
          {/* category */}
          <div className="py-2">
            <label
              htmlFor="category"
              className="text-xl font-semibold capitalize"
            >
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Choose Category"
              name="category"
              id="category"
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
            >
              <option value="" className="px-2 py-1">
                Select Category
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.name} className="px-2 py-1">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* tags */}
          <div className="py-2" aria-label="Tags">
            <label htmlFor="tags" className="text-xl font-semibold capitalize">
              Tags
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
              type="text"
              id="tags"
              placeholder="Enter Tags ..."
            />
          </div>
          {/* tag */}
          <div className="py-2" aria-label="Tag">
            <label htmlFor="tag" className="text-xl font-semibold capitalize">
              Tag
            </label>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border px-4 py-2 my-2 focus:outline outline-black"
              type="text"
              id="tag"
              placeholder="Enter Tag ..."
            />
          </div>
        </div>
        <Editor
          name="Text Editor"
          setDefaultStyle="font-size:16px;height:fit-content"
          defaultValue={html}
          placeholder="Type Something Here..."
          onChange={(content) => setHtml(content)}
          autoFocus={true}
          setOptions={options}
        />
        <div className="flex justify-between py-2 mt-3 mb-8 max-w-xs mx-auto">
          <button
            onClick={() => router.push(`/posts/${post?.slug}`)}
            type="button"
            className="px-6 py-1 uppercase shadow-md rounded bg-white shadow-gray-400 border border-gray-400"
          >
            cancel
          </button>
          <button
            type="submit"
            className="px-6 py-1 uppercase shadow-md rounded bg-yellow-500 hover:bg-yellow-400 shadow-orange-400 "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

interface Slug {
  params: {
    slug: string;
  };
}

export const getServerSideProps = async ({ params: { slug } }: Slug) => {
  if (!slug) {
    return {
      notFound: true,
    };
  }
  let post: Post | null = null;
  try {
    const snapshot = await getDoc(doc(db, `articles/${slug}`));
    post = docToString(snapshot.data());
  } catch (err) {
    return {
      notFound: true,
    };
  }
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};

export default EditPost;
