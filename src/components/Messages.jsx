import { useState, useEffect } from 'react'
import '../styles/Messages.css'

function Messages() {
  const [msgs, setMsgs] = useState([]) 
  const [picked, setPicked] = useState(null)
  const [loading, setLoading] = useState(true)
  const [txt, setTxt] = useState('')

  useEffect(() => {
    const fakeStuff = [
      {
        id: 1,
        from: "John",
        msg: "Hey, wanna learn guitar?",
        when: "2024-03-10T10:30:00",
        new: true
      },
      {
        id: 2,
        from: "Sarah",
        msg: "When is the next lesson?",
        when: "2024-03-09T15:45:00",
        new: false
      }
    ]
    setMsgs(fakeStuff)
    setLoading(false)
  }, [])

  // function to send a message
  function sendMsg(e) {
    e.preventDefault()
    if (!txt.trim()) return // No send an empty message

    alert('Sent!')
    setTxt('') // clear the text field after sending
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container">
      <div className="messages-container">
        {/* Conversations Sidebar */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h2>Messages</h2>
            <button>New Chat</button>
          </div>
          
          {msgs.map(m => (
            <div 
              key={m.id} 
              className={`message-preview ${picked?.id === m.id ? 'active' : ''}`} 
              onClick={() => setPicked(m)} 
            >
              <b>{m.from}</b>
              <p>{m.msg}</p>
              {m.new && <span className="new-badge">NEW</span>}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        {picked ? (
          <div className="chat-area">
            <h3>Chat with {picked.from}</h3>
            <div className="messages">
              <div className="message">
                {picked.msg} 
              </div>
            </div>
            <form onSubmit={sendMsg}>
              <input 
                value={txt}
                onChange={e => setTxt(e.target.value)} 
                placeholder="Type your message..." 
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <div className="chat-area">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
