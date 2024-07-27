import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const MediBuddy = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUserResponses = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/quizResults/${userId}/responses`);
      setUserResponses(response.data);
    } catch (error) {
      console.error('Error fetching user responses:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:5001/output', { prompt: input });
      const botMessage = { text: response.data.output, sender: 'MediBuddy', isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { text: 'Error fetching response. Please try again.', sender: 'MediBuddy', isUser: false };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
        {userResponses.length > 0 && (
          <div className="p-3 rounded-lg bg-gray-300 text-black mb-2">
            <strong>User Responses:</strong>
            <ul>
              {userResponses.map((responseSet, setIndex) => (
                <div key={setIndex}>
                  {responseSet.map((response, index) => (
                    <li key={index}>
                      <strong>{response.question}</strong>: {response.selectedOption}
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex my-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-3xl w-full ${
                message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              <strong>{message.sender}: </strong>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default MediBuddy;