import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { hideMessage } from '../../redux/slices/message';
import './popupmessage.css';

const PopUpMessage = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.message);
  const [text, setText] = useState(message.text);
  const [variant, setVariant] = useState(message.variant);
  const [timer, setTimer] = useState(message.timer);
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideMessage());
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
        <div className="absolute top-0 left-0 right-0">
          <div className="message-container">
            <div className={`message ${variant}`}>
              <span className="message-text">{text}</span>
              <span className="close-btn-container">
                <AiOutlineClose
                  className=""
                  id="closeMessage"
                  onClick={closeMessage}
                />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopUpMessage;
