import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

const BaseContainer = styled.div`
  color: #333;
  background: #f3f4f6;
  min-height: 100vh;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 60px;
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
    padding: 2rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const MovementHistoryContainer = styled.div`
  margin-top: 2rem;
`;

const MovementHistoryTitle = styled(FormTitle)`
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1rem;
`;

const MovementItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const InputField = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: #27ae60;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #219150;
  }
`;

const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;
  margin-bottom: 1rem;

  &:hover {
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AddMovement: React.FC = () => {
  const navigate = useNavigate();
  const { trackingNumber } = useParams(); // Get tracking number from URL params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movementHistory, setMovementHistory] = React.useState<any[]>([]);
  const [newMovement, setNewMovement] = React.useState({
    movementLocation: "",
    movementDate: "",
    movementStatus: "",
  });

  // Fetch the order details when the component is mounted
  useEffect(() => {
    if (!trackingNumber) return;

    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://dhl-server.onrender.com/api/orders/${trackingNumber}`
        );
        setMovementHistory(response.data.movementHistory);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };

    fetchOrder();
  }, [trackingNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the new movement to the backend
      await axios.patch(
        `https://dhl-server.onrender.com/api/orders/${trackingNumber}/add-movement`,
        {
          movementLocation: newMovement.movementLocation,
          movementDate: newMovement.movementDate,
          movementStatus: newMovement.movementStatus,
        }
      );

      // Update local state with new movement
      setMovementHistory((prev) => [
        ...prev,
        {
          movementLocation: newMovement.movementLocation,
          movementDate: newMovement.movementDate,
          movementStatus: newMovement.movementStatus,
        },
      ]);

      setNewMovement({
        movementLocation: "",
        movementDate: "",
        movementStatus: "",
      });
    } catch (error) {
      console.error("Failed to add movement", error);
    }
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Add Movement History</FormTitle>

          <FormWrapper onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="movementLocation" // Fixed here
              placeholder="Movement Location"
              value={newMovement.movementLocation}
              onChange={handleChange}
              required
            />
            <InputField
              type="date"
              name="movementDate" // Fixed here
              value={newMovement.movementDate}
              onChange={handleChange}
              required
            />
            <InputField
              type="text"
              name="movementStatus" // Fixed here
              placeholder="Movement Status"
              value={newMovement.movementStatus}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Add Movement</SubmitButton>
          </FormWrapper>

          <MovementHistoryContainer>
            <MovementHistoryTitle>
              Existing Movement History
            </MovementHistoryTitle>
            {movementHistory.map((movement, index) => (
              <MovementItem key={index}>
                <span>{movement.movementLocation}</span>
                <span>{movement.movementStatus}</span>
                <span>
                  {new Date(movement.movementDate).toLocaleDateString()}
                </span>
              </MovementItem>
            ))}
          </MovementHistoryContainer>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default AddMovement;
