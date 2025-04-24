import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../styles/Messages.css';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        with: "John Doe",
        lastMessage: "Hey, I'm interested in learning guitar!",
        timestamp: "2024-03-10T10:30:00",
        unread: true
      },
      {
        id: 2,
        with: "Sarah Smith",
        lastMessage: "When can we start our next lesson?",
        timestamp: "2024-03-09T15:45:00",
        unread: false
      }
    ];
    setConversations(mockConversations);
    setLoading(false);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    toast.success('Message sent!');
    setMessage('');
  };

  return (
    <div className="messages-container">
      <div className="conversations-sidebar">
        <div className="conversations-header">
          <h2>Messages</h2>
          <button className="new-message-button">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="conversations-list">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="conversation-avatar">
                {conv.with.charAt(0).toUpperCase()}
              </div>
              <div className="conversation-info">
                <div className="conversation-header">
                  <h3>{conv.with}</h3>
                  <span className="conversation-time">
                    {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="conversation-preview">{conv.lastMessage}</p>
              </div>
              {conv.unread && <div className="unread-indicator" />}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">
                  {selectedConversation.with.charAt(0).toUpperCase()}
                </div>
                <h2>{selectedConversation.with}</h2>
              </div>
            </div>

            <div className="messages-list">
            </div>

            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="no-conversation-selected">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
