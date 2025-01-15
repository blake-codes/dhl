import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 20px;
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
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: black;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
`;

const EditShipmentOrder: React.FC = () => {
  const navigate = useNavigate();
  const { trackingNumber } = useParams();
  const [shipmentData, setShipmentData] = useState({
    shipmentName: "",
    origin: "",
    destination: "",
    currentLocation: "",
    senderName: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress: "",
    status: "",
    weight: "",
    dimensions: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await fetch(
          `https://dhl-server.onrender.com/api/orders/${trackingNumber}`
        );
        const data = await response.json();
        setShipmentData(data);
      } catch (error) {
        console.error("Error fetching shipment details:", error);
      }
    };

    fetchShipmentDetails();
  }, [trackingNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://dhl-server.onrender.com/api/orders/${trackingNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shipmentData),
        }
      );
      if (response.ok) {
        alert("Shipment updated successfully!");

        navigate(`/order/${trackingNumber}`);
      } else {
        alert("Failed to update shipment.");
      }
    } catch (error) {
      console.error("Error updating shipment:", error);
    }
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Edit Shipment Order</FormTitle>
          <FormWrapper onSubmit={handleSubmit}>
            {Object.keys(shipmentData)
              .filter(
                (key) =>
                  ![
                    "user",
                    "movementHistory",
                    "__v",
                    "locationUpdates",
                    "_id",
                    "trackingNumber",
                  ].includes(key)
              )
              .map((key) => (
                <InputField
                  key={key}
                  type="text"
                  name={key}
                  value={shipmentData[key as keyof typeof shipmentData]}
                  onChange={handleInputChange}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  required
                />
              ))}
            <SubmitButton type="submit">Update Order</SubmitButton>
          </FormWrapper>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default EditShipmentOrder;
