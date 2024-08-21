import React from 'react';
import Header from './Header';
import MessageList from './MessageList';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <MessageList />
    </div>
  );
};

export default App;
