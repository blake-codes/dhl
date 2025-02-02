import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import ChatBot from "../components/ChatBot";

const Container = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -40px;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const StepCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    color: #555;
  }
`;

const Ship = () => {
  return (
    <>
      <Navbar />
      <SubNavBar />
      <Container>
        <h1>Shipping Process</h1>
        <p>Follow these simple steps for a smooth shipping experience.</p>

        <StepContainer>
          <StepCard>
            <h3>Step 1: Prepare Your Package</h3>
            <p>
              Ensure your items are properly packed and labeled for shipping.
            </p>
          </StepCard>

          <StepCard>
            <h3>Step 2: Select a Service</h3>
            <p>Choose the right shipping service based on your needs.</p>
          </StepCard>

          <StepCard>
            <h3>Step 3: Schedule a Pickup</h3>
            <p>Book a pickup or drop your package at a nearby location.</p>
          </StepCard>

          <StepCard>
            <h3>Step 4: Track Your Shipment</h3>
            <p>Use our tracking system to monitor your package in real-time.</p>
          </StepCard>

          <StepCard>
            <h3>Step 5: Receive Your Delivery</h3>
            <p>
              Your package will be delivered to the recipient's address safely.
            </p>
          </StepCard>
        </StepContainer>
      </Container>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Ship;
