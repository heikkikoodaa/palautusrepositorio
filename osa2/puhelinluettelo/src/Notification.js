const Notification = ({ notification }) => {
  const { message, type } = notification;
  let style;
  if (!message) {
    return null;
  }

  if (!type || type === null) {
    style = 'notification';
  } else {
    switch (type) {
      case 'success':
        style = 'notification success';
        break;
      case 'error':
        style = 'notification error';
        break;
      default:
        break;
    }
  }

  return <div className={style}>{message}</div>;
};

export default Notification;
