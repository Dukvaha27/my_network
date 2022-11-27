import styled from 'styled-components';
import { memo, useEffect } from 'react';
import propTypes from 'prop-types';
import { ToastContainer } from '../toast/toastContainer';
import { ToastList } from '../toast/toast-list';

const Div = styled.div`
  padding: 1.5rem 0;
`;

const Toast = memo(({ notification, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, notification.delay);
    return () => clearTimeout(timeoutId);
  }, []);

  const renderItem = (content) => {
    if (typeof content === 'function') {
      return <span>{content()}</span>;
    }
    return <span>{JSON.stringify(content, null, 1)}</span>;
  };

  return (
    <ToastContainer type={notification.type}>
      <Div>
        {renderItem(notification.content)}
      </Div>
    </ToastContainer>
  );
});

Toast.propTypes = {
  notification: propTypes.instanceOf(Object).isRequired,
  onClose: propTypes.func.isRequired,
};

function Notifier(props) {
  const { notifications, onClose } = props;

  return (
    <ToastList>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <Toast notification={notification} onClose={() => onClose(notification.id)} />
        </li>
      ))}
    </ToastList>
  );
}

Notifier.propTypes = {
  notifications: propTypes.instanceOf(Array).isRequired,
  onClose: propTypes.func.isRequired,
};

export default memo(Notifier);
