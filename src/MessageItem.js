import React from 'react';
import { useSwipeable } from 'react-swipeable';
import './MessageItem.css';

const MessageItem = ({ message, onDismiss }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('Swiped left!');
      onDismiss(message.id);
    },
    onSwipedRight: () => {
      console.log('Swiped right!');
      onDismiss(message.id);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="message-item" {...handlers}>
      <img
        src={`https://message-list.appspot.com/${message.author.photoUrl}`}
        alt={message.author.name}
        className="author-photo"
      />
      <div className="message-content-container">
        <div className="message-content">
          <strong>{message.author.name}</strong>
          <p>{message.content}</p>
          <small className="message-updated">
            Last Updated: {new Date(message.updated).toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
