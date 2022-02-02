import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../firebase/config';
import { CategoryType, useGlobalContext } from '../hooks/useGlobalContext';

interface Props {
  showModal: Function;
  editCategory?: CategoryType;
  setEditCategory?: Function;
}

const AddCategoryModal = ({
  showModal,
  editCategory,
  setEditCategory,
}: Props) => {
  const { setCategories, showMessage } = useGlobalContext();
  const router = useRouter();
  const closeModal = (e: any) => {
    if (e.target.id === 'close') {
      showModal(false);
      if (editCategory && setEditCategory) {
        setEditCategory(undefined);
      }
      router.push('');
    }
  };
  const [category, setCategory] = useState(() =>
    editCategory ? editCategory.name : ''
  );
  const [id, setId] = useState(() => editCategory && editCategory.id);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!category || !id) {
      return;
    }
    try {
      await setDoc(doc(db, `categories/${category}`), {
        id,
        name: category,
      });
      setCategories((categories) => {
        return [...categories, { id, name: category }];
      });
      setCategory('');
      setId(undefined);
      showMessage('Added Successfully', 'success');
      showModal(false);
    } catch (err: any) {
      showMessage(err?.message);
    }
  };

  const editHandler = async (e: any) => {
    e.preventDefault();
    if (!category || !id) {
      return;
    }
    try {
      await updateDoc(doc(db, `categories/${category}`), {
        id,
      });
      if (editCategory) {
        setCategories((categories) => {
          let items = categories.filter(
            (item) => item.name !== editCategory?.name
          );
          return [...items, { id, name: editCategory?.name }];
        });
      }
      setCategory('');
      setId(undefined);
      if (setEditCategory) {
        setEditCategory(undefined);
      }
      showMessage('Updated Successfully', 'success');
      showModal(false);
    } catch (err: any) {
      showMessage(err?.message);
    }
  };

  return (
    <div className="">
      <div
        className="fixed bg-black opacity-70 top-0 z-30 left-0 bottom-0 right-0 flex items-center"
        id="close"
        onClick={closeModal}
      ></div>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 flex items-center z-30 px-2"
        id="close"
        onClick={closeModal}
      >
        <div className="w-full mx-auto max-w-xs max-h-48 bg-white h-full flex justify-center items-center z-50 rounded-md shadow-lg shadow-black px-1">
          <form onSubmit={editCategory ? editHandler : submitHandler}>
            <div className="my-2">
              <input
                value={category}
                disabled={editCategory ? true : false}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Enter Category..."
                className="w-full border border-gray-800 px-4 py-1 text-sm text-black disabled:text-gray-500 disabled:cursor-not-allowed focus:outline outline-black"
              />
            </div>
            <div className="my-2">
              <input
                value={id}
                onChange={(e) => setId(() => Number(e.target.value))}
                type="number"
                placeholder="Enter Id..."
                className="w-full border border-gray-800 px-4 py-1 text-sm text-black focus:outline outline-black"
              />
            </div>
            <div className="w-full flex items-center justify-center mt-4">
              <button className="text-center w-full bg-[#08dceb] uppercase font-semibold border border-gray-600 shadow shadow-black">
                {editCategory ? 'Save' : 'submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
