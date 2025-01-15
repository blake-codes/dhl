import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BaseContainer = styled.div`
  color: #333;
  background: #f3f4f6;
  min-height: 100vh;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

const Section = styled.section`
  padding: 3rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 3rem auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const MessageDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MessageItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #555;

  span:nth-child(1) {
    font-weight: bold;
    color: #333;
  }
`;

const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const MessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          `https://dhl-server.onrender.com/api/messages/${id}`
        );
        if (!response.ok) throw new Error("Message not found");
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!message) return <p>Message not found.</p>;

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Message Details</FormTitle>
          <MessageDetail>
            <MessageItem>
              <span>Name</span>
              <span>{message.name}</span>
            </MessageItem>
            <MessageItem>
              <span>Email</span>
              <span>{message.email}</span>
            </MessageItem>
            <MessageItem>
              <span>Message</span>
              <span>{message.message}</span>
            </MessageItem>
          </MessageDetail>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default MessageDetails;
