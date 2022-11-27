import { createContext, memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

export const NotifyContext = createContext();

const initialState = [];

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVE_ALL = 'REMOVE_ALL';

export const notifyReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date().getMilliseconds(),
          content: action.payload.content,
          type: action.payload.type,
          delay: action.payload.delay || 5000,
        },
      ];
    case REMOVE:
      return state.filter((t) => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const NotifyProvider = memo((props) => {
  const { Component, children } = props;
  const notifyRef = useRef(null);

  const [notifications, dispatchNotify] = useReducer(notifyReducer, initialState);
  const toastData = useMemo(
    () => ({
      notifications,
      notify: (rest) => {
        dispatchNotify({
          type: ADD, payload: rest,
        });
      },
    }),
    [notifications],
  );

  const onCloseHandle = useCallback(
    (rest) => dispatchNotify({
      type: REMOVE,
      payload: {
        id: rest,
      },
    }),
    [],
  );
  useEffect(() => {
    notifyRef.current = document.body;
  }, []);

  return (
    <NotifyContext.Provider value={toastData}>
      {children}
      {notifyRef?.current && createPortal(
        <Component onClose={onCloseHandle} notifications={notifications} />,
        notifyRef.current,
      )}
    </NotifyContext.Provider>
  );
});

export const useNotification = () => useContext(NotifyContext);

NotifyProvider.propTypes = {
  children: propTypes.node.isRequired,
  Component: propTypes.element.isRequired,
};
