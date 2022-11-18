import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastMessage,
  messageSelector,
  _setMessages,
  lastMessage } from './messageSlice';

const useMessageState = () => {
  const dispatch = useDispatch();
  const messagesData = useSelector(messageSelector);
  const last_message = useSelector(lastMessage);

  const setMessages = useCallback(
    (arr) => {
      dispatch(_setMessages(arr));
    },
    [dispatch],
  );

  const getLastMsg = useCallback(({ messages, to }) => {
    dispatch(getLastMessage({
      messages, to,
    }));
  }, [dispatch]);

  return {
    messages: messagesData, setMessages, last_message, getLastMsg,
  };
};

export default useMessageState;
