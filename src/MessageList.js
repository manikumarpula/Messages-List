import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import MessageItem from './MessageItem';
import './MessageList.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !loading) {
      loadMessages();
    }
  }, [inView]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://message-list.appspot.com/messages', {
        params: {
          limit: 20,
          pageToken: pageToken,
        },
      });
      setMessages((prevMessages) => [...prevMessages, ...response.data.messages]);
      setPageToken(response.data.pageToken);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const handleDismiss = (id) => {
    console.log(`Dismissing message with id: ${id}`);
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} onDismiss={handleDismiss} />
      ))}
      {loading && <p>Loading more messages...</p>}
      <div ref={ref} />
    </div>
  );
};

export default MessageList;
