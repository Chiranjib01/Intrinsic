import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../firebase/config';
import { CategoryType, useGlobalContext } from '../hooks/useGlobalContext';
import AddCategoryModal from './AddCategoryModal';

const Categories = () => {
  const router = useRouter();
  const { categories, setCategories, showMessage } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryType>();

  const deleteCategory = async (name: string) => {
    try {
      if (confirm('Are You Sure?')) {
        await deleteDoc(doc(db, `categories/${name}`));
        setCategories((categories) => {
          return categories.filter((category) => category.name !== name);
        });
        showMessage('Deleted Successfully', 'success');
      }
    } catch (err: any) {
      showMessage(err?.message);
    }
  };

  return (
    <div className="">
      {showModal && (
        <AddCategoryModal
          showModal={setShowModal}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      )}
      <div className="">
        <div className="bg-gray-400 flex justify-between px-2 py-1 font-semibold capitalize sticky top-[75px]">
          <div className="pointer-events-none">all categories</div>
          <button
            onClick={() => {
              setShowModal(true);
              router.push('', '/categories/add-new');
            }}
            className="capitalize font-semibold px-2 my-[1px] border text-white shadow shadow-gray-500 rounded"
          >
            add
          </button>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-2 py-1 border-t border-t-gray-200 flex justify-between"
          >
            <span className="pointer-events-none">{category.name}</span>
            <div className="space-x-1">
              <button
                onClick={() => {
                  setShowModal(true);
                  setEditCategory(category);
                  router.push('', `/category/${category.name}/edit`);
                }}
                className="border border-gray-300 rounded px-1 capitalize text-xs text-blue-600 shadow-sm shadow-gray-400 font-semibold"
              >
                edit
              </button>
              <button
                onClick={() => deleteCategory(category.name)}
                className="border border-gray-300 rounded px-1 capitalize text-xs text-red-600 shadow-sm shadow-gray-400 font-semibold"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
