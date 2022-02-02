import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { useGlobalContext } from '../hooks/useGlobalContext';
import docToString from '../utils/docToString';

const Contacts = () => {
  const [contacts, setContacts] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState('');
  const { showMessage } = useGlobalContext();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data: DocumentData[] = [];
      const snapshot = await getDocs(
        query(collection(db, `contacts`), orderBy('createdAt', 'desc'))
      );
      snapshot.forEach((item) => {
        if (item.exists()) {
          data.push(docToString(item.data()));
        }
      });
      setContacts(data);
      setLoading(false);
    } catch (err: any) {
      showMessage(err?.message);
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      if (confirm('Are You Sure?')) {
        await deleteDoc(doc(db, `contacts/${id}`));
        fetchContacts();
        showMessage('Delete Successfully', 'success');
      }
    } catch (err: any) {
      showMessage(err?.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <div className="">
        <div className="bg-gray-400 flex justify-between px-2 py-1 font-semibold capitalize">
          <div className="pointer-events-none">all messages</div>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="px-1 py-1 border-t border-t-gray-200 flex justify-between"
            >
              <div className="cursor-pointer border flex-1 px-1 rounded bg-slate-100">
                <div className="flex border-b">
                  <span
                    className="flex-1"
                    onClick={(e: any) => {
                      if (e.target?.id !== 'deleteBtn') {
                        if (show === contact.id) {
                          setShow('');
                        } else {
                          setShow(contact.id);
                        }
                      }
                    }}
                  >
                    {contact.name}
                  </span>
                  <button
                    id="deleteBtn"
                    onClick={() => deleteContact(contact.id)}
                    className="border border-gray-300 rounded px-2 capitalize text-xs text-red-600 shadow-sm shadow-gray-400 max-h-6"
                  >
                    delete
                  </button>
                </div>
                {show === contact.id && (
                  <>
                    <div>
                      <span className="font-semibold">Date : </span>
                      {contact.createdAt}
                    </div>
                    <div>
                      <span className="font-semibold">Email : </span>
                      {contact.email}
                    </div>
                    <div>
                      <span className="font-semibold">Message : </span>
                      {contact.message}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Contacts;
