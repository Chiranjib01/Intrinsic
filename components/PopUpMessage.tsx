import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useGlobalContext } from '../hooks/useGlobalContext';

const PopUpMessage = () => {
  const { message, showMessage } = useGlobalContext();
  const [text, setText] = useState(message.text);
  const [variant, setVariant] = useState(message.variant);
  const [timer, setTimer] = useState(message.timer);
  useEffect(() => {
    setTimeout(() => {
      showMessage();
    }, timer);
  }, [message]);

  const closeMessage = (e: any) => {
    if (e.target.id === 'closeMessage' || e.target.tagName === 'path') {
      setText('');
      setVariant('');
      setTimer(0);
    }
  };

  return (
    <>
      {text ? (
        <div className="flex justify-center mx-2">
          <div
            className={`fixed z-[70] top-4 mx-2 max-w-fit px-2 py-2 rounded-md text-center flex items-center shadow-md shadow-gray-600 ${variant}`}
          >
            <span className="text-white pointer-events-none text-sm">
              {text}
            </span>
            <span className="bg-white rounded-full p-[2px] ml-2 flex cursor-pointer hover:bg-gray-200">
              <AiOutlineClose
                className="inline-block"
                id="closeMessage"
                onClick={closeMessage}
              />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopUpMessage;
