/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaHeadset, FaTimes, FaUserShield } from "react-icons/fa";
import io from "socket.io-client";

// Styled Components
const ChatButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 26px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #59a35c;
  }
`;

const ChatWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  height: 400px;
  z-index: 10;
  animation: ${({ isOpen }) => (isOpen ? "fadeIn 0.3s" : "fadeOut 0.3s")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const Header = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const HeaderUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? "#a9caec" : "#f1f1f1")};
  color: ${({ isUser }) => (isUser ? "black" : "black")};
  border-radius: 20px;
  padding: 10px;
  max-width: 80%;
  margin: 5px 0;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  word-wrap: break-word;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  transition: border-color 0.3s;
`;

const SendButton = styled.button`
  padding: 12px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #539c55;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const UserPromptOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const UserPromptContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.3);
  width: 400px;
  position: relative;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #4caf50;
  &:hover {
    color: #3b7a3d;
  }
`;

const UserPromptInput = styled.input`
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #469348;
  }
`;

// ChatBot Component
const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; id: string; isUser: boolean }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showUserPrompt, setShowUserPrompt] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io("https://dhl-server.onrender.com");

    socket.current.on(
      "receiveMessage",
      (data: { id: string; message: string; isUser: boolean }) => {
        setMessages((prev) => {
          // Prevent duplicate messages
          if (prev.some((msg) => msg.id === data.id)) {
            return prev;
          }
          return [
            ...prev,
            { id: data.id, text: data.message, isUser: data.isUser },
          ];
        });
      }
    );

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = (sessionId: string) => {
    axios
      .get(`https://dhl-server.onrender.com/api/chat/history/${sessionId}`)
      .then((response) => {
        setMessages(
          response.data.messages.map((msg: any) => ({
            text: msg.message,
            isUser: msg.isUser,
            id: msg.id,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
      });
  };

  const toggleChatWindow = () => {
    if (!isOpen) {
      const storedUserName = localStorage.getItem("chatUser");
      const storedSessionId = localStorage.getItem("sessionId");

      if (storedUserName && storedSessionId) {
        setUserName(storedUserName);
        setSessionId(storedSessionId);
        fetchChatHistory(storedSessionId);
      } else {
        setShowUserPrompt(true);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName) {
      localStorage.setItem("chatUser", userName);
      setMessages([
        {
          text: `Hello ${userName}, how can I assist you today?`,
          isUser: false,
          id: "kdkjdjdjdjjdjdjdjj",
        },
      ]);
      setShowUserPrompt(false);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      if (!sessionId) {
        if (userName) {
          axios
            .post("https://dhl-server.onrender.com/api/chat/start", {
              chatUser: userName,
            })
            .then((response) => {
              localStorage.setItem("sessionId", response.data.sessionId);
              setSessionId(response.data.sessionId);
              const newMessage = {
                message: userInput,
                id: Date.now().toString(),
                sender: "user",
                isUser: true,
                sessionId: response.data.sessionId,
              };

              setMessages((prev) => [
                ...prev,
                { text: userInput, isUser: true, id: newMessage.id },
              ]);
              socket.current.emit("sendMessage", newMessage);
              setUserInput("");
            })
            .catch((error) => {
              console.error("Error starting chat session:", error);
            });
        }
      } else {
        const newMessage = {
          message: userInput,
          id: Date.now().toString(),
          sender: "user",
          isUser: true,
          sessionId,
        };
        setMessages((prev) => [
          ...prev,
          { text: userInput, isUser: true, id: newMessage.id },
        ]);
        socket.current.emit("sendMessage", newMessage);
        setUserInput("");
      }
    }
  };

  return (
    <>
      <ChatButton onClick={toggleChatWindow}>
        <FaHeadset />
      </ChatButton>
      <ChatWindow isOpen={isOpen}>
        <Header>
          <HeaderUserInfo>
            <FaUserShield />
            <UserName>{userName}</UserName>
          </HeaderUserInfo>
          <CloseButton onClick={toggleChatWindow}>
            <FaTimes />
          </CloseButton>
        </Header>
        <MessageContainer ref={messageContainerRef}>
          {messages.map((msg, index) => (
            <MessageBubble key={index} isUser={msg.isUser}>
              {!msg.isUser && (
                <span
                  style={{
                    marginRight: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <FaHeadset color="#4caf50" />
                </span>
              )}
              {msg.text}
            </MessageBubble>
          ))}
        </MessageContainer>
        <InputArea>
          <InputField
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>➤</SendButton>
        </InputArea>
      </ChatWindow>

      {showUserPrompt && (
        <UserPromptOverlay>
          <UserPromptContainer>
            <CloseModalButton onClick={() => setShowUserPrompt(false)}>
              <FaTimes />
            </CloseModalButton>
            <form onSubmit={handleNameSubmit}>
              <h3>What's your name?</h3>
              <UserPromptInput
                type="text"
                value={userName || ""}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
              <SubmitButton type="submit">Start Chat</SubmitButton>
            </form>
          </UserPromptContainer>
        </UserPromptOverlay>
      )}
    </>
  );
};

export default ChatBot;