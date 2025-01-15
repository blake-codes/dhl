import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const BaseContainer = styled.div`
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  color: #333;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const MessagesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const MessagesTitle = styled.h1`
  font-size: 1.8rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

interface Message {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  name: string;
  email: string;
  message: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://dhl-server.onrender.com/api/messages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [username]);

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <MessagesContainer>
          <MessagesTitle>Messages</MessagesTitle>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        to={`/messages/${message._id}`}
                        style={{ textDecoration: "none", color: "#0275d8" }}
                      >
                        {message.name}
                      </Link>
                    </TableCell>
                    <TableCell>{message.email}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </MessagesContainer>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Messages;
