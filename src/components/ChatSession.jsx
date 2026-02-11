import React, { useState } from 'react';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import { personas, getPersonaResponse } from '../personas';

const ChatSession = ({ activePersona }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Simulate AI response (Mock for now)
    setTimeout(() => {
      const responseText = getPersonaResponse(activePersona, text);
      const currentPersonaObj = personas.find(p => p.id === activePersona);

      const aiMsg = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        senderName: currentPersonaObj ? currentPersonaObj.name : 'AI',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative">
            <ChatArea 
                messages={messages} 
                activePersona={activePersona}
                isTyping={isTyping}
                onSuggestionClick={handleSendMessage}
            />
        </div>

        {/* Message Input */}
        <div className="w-full">
            <MessageInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
    </div>
  );
};

export default ChatSession;
