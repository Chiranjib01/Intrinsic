import { MouseEventHandler } from 'react';

interface Props {
  showModal: Function;
  signOutHandler: MouseEventHandler<HTMLButtonElement>;
}

const LogoutModal = ({ showModal, signOutHandler }: Props) => {
  const closeModal = (e: any) => {
    if (e.target.id === 'close') {
      showModal(false);
    }
  };

  return (
    <div>
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
        <div className="w-full mx-auto max-w-xs max-h-48 bg-white h-full flex justify-center items-center z-50 space-x-2 rounded-md shadow-lg shadow-black">
          <button
            className="bg-white text-black border border-gray-400 font-semibold py-1 px-2 rounded-tl-lg rounded-br-lg hover:bg-gray-200 transition-colors duration-200 text-sm shadow-md shadow-gray-400"
            id="close"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white font-semibold py-1 px-2 rounded-tl-lg rounded-br-lg hover:bg-green-700 transition-colors duration-200 text-sm shadow-md shadow-green-400"
            onClick={(e) => {
              showModal(false);
              signOutHandler(e);
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
