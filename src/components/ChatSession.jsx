import { useState, useRef } from 'react';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import { personas } from '../personas';
import { createChat, sendMessage } from '../gemini';

const ChatSession = ({ activePersona }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  // Lazily initialize the Gemini chat session
  const getChat = () => {
    if (!chatRef.current) {
      chatRef.current = createChat(activePersona);
    }
    return chatRef.current;
  };

  const handleSendMessage = async (text) => {
    const currentPersonaObj = personas.find(p => p.id === activePersona);

    // Add user message
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const chat = getChat();
      const responseText = await sendMessage(chat, text);

      const aiMsg = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        senderName: currentPersonaObj?.name || 'AI',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: `⚠ Connection failed: ${error.message || 'Unknown error'}. Check your API key.`,
        sender: 'ai',
        senderName: 'SYSTEM',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <ChatArea
          messages={messages}
          activePersona={activePersona}
          isTyping={isTyping}
          onSuggestionClick={handleSendMessage}
        />
      </div>
      <div className="w-full">
        <MessageInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatSession;
