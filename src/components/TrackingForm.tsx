import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 55%;
  margin: 20px;
  padding: 1.5rem;
  margin-top: -80px;
  @media (max-width: 768px) {
    margin-top: -100px;
    width: 95%;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  color: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  background-color: white;
  padding: 5px;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  height: 60px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: auto 30px;
  background: #eb131e;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  height: 60px;
  width: 100px;

  &:hover {
    background: #d40511;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 5px;
  }
`;

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (trackingNumber) {
      navigate(`/track/${trackingNumber}`);
    } else {
      alert("Please enter a tracking number.");
    }
  };

  return (
    <FormContainer>
      <Title>Track Your Shipment</Title>
      <InputContainer>
        <Input
          placeholder="Enter your Tracking number(s)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Button onClick={handleSubmit}>Track</Button>
      </InputContainer>
    </FormContainer>
  );
};

export default TrackingForm;
