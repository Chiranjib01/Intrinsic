import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useState } from 'react';
import Meta from '../components/Meta';
import { APP_NAME } from '../utils/constants';
import { db } from '../firebase/config';
import { randomId } from '../utils/randoms';
import { useGlobalContext } from '../hooks/useGlobalContext';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { showMessage } = useGlobalContext();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !message || loading) {
      showMessage('All Fields Are Required');
      return;
    }
    const id = randomId();
    try {
      setLoading(true);
      await setDoc(doc(db, `contacts/${id}`), {
        id,
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });
      showMessage('Thank you for Contacting us.', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
    } catch (err) {
      showMessage('Something went wrong.');
      setLoading(false);
    }
  };
  return (
    <div>
      <Meta title={`${APP_NAME} - Contact Page`} />
      <div className="max-w-2xl mx-auto h-full bg-white border-x border-x-gray-400 pb-8">
        <div className="pt-4 pb-2 px-2 text-2xl mob:text-3xl capitalize border-b-4 border-blue-500 font-light">
          Contact Us
        </div>
        {/* contact section */}
        <section className="bg-white px-2 py-4">
          <form onSubmit={submitHandler} className="max-w-sm mx-auto">
            <div className="w-full my-4">
              <label className="my-2 block font-semibold" htmlFor="name">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full border border-gray-400 py-1 px-2 text-sm focus:outline outline-black"
                name="name"
                type="text"
                placeholder="Enter Name..."
                required
              />
            </div>
            <div className="w-full my-4">
              <label className="my-2 block font-semibold" htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full border border-gray-400 py-1 px-2 text-sm focus:outline outline-black"
                name="email"
                type="email"
                placeholder="Enter Email..."
                required
              />
            </div>
            <div className="w-full my-4">
              <label className="my-2 block font-semibold" htmlFor="message">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                name="message"
                rows={10}
                className="w-full border border-gray-400 py-1 px-2 text-sm focus:outline outline-black"
                placeholder="Enter Message..."
                required
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={loading}
                className="uppercase w-full border border-gray-400 py-1 bg-white hover:bg-gray-300 cursor-pointer shadow-md shadow-gray-400 flex items-center justify-center disabled:cursor-not-allowed"
                type="submit"
              >
                {loading ? (
                  <Image
                    height={24}
                    width={24}
                    src="/spinner.gif"
                    className="rounded-full"
                    alt=""
                  />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default Contact;
