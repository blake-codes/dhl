import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2ecc71;
  }
`;

const ShipmentForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Create Shipment</h3>
      <Input type="text" placeholder="Tracking Code" required />
      <Input type="text" placeholder="Origin" required />
      <Input type="text" placeholder="Destination" required />
      <Input type="text" placeholder="Status" required />
      <Button type="submit">Create Shipment</Button>
    </Form>
  );
};

export default ShipmentForm;
