import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:5000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      const data = await response.json();
      
      const botMessage = {
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-200 to-purple-300">
      <div className="max-w-3xl mx-auto h-screen p-6 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`rounded-2xl p-4 shadow-md 
                    ${message.sender === 'user'
                      ? 'bg-white bg-opacity-90 text-gray-800'
                      : 'bg-purple-600 bg-opacity-90 text-white'
                    }`}
                >
                  <p className="text-base">{message.text}</p>
                </div>
                <span className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                } text-gray-600`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-4 pr-12 rounded-xl bg-white bg-opacity-90 shadow-md 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
                     text-purple-600 hover:text-purple-700 focus:outline-none"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
