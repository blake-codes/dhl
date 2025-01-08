import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

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

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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
  margin-top: 1.5rem;

  &:hover {
    background-color: #219150;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto 20px auto auto;
  gap: 0.5rem;
`;

const AddShipmentOrder: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle shipment order form submission
    console.log("Shipment order submitted");
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>{" "}
          {/* Back arrow button */}
          <FormTitle>Add Shipment Order</FormTitle>
          <FormWrapper onSubmit={handleSubmit}>
            <InputField type="text" placeholder="Shipment Name" required />
            <InputField type="text" placeholder="Origin" required />
            <InputField type="text" placeholder="Destination" required />
            <InputField type="text" placeholder="Current Location" required />
            <InputField type="text" placeholder="Sender Name" required />
            <InputField type="text" placeholder="Receiver Name" required />
            <InputField type="text" placeholder="Receiver Email" required />
            <InputField type="text" placeholder="Receiver Phone" required />
            <InputField type="text" placeholder="Receiver Address" required />
            <InputField type="text" placeholder="Status" required />
            <InputField type="text" placeholder="Weight" required />
            <InputField type="text" placeholder="Dimensions" required />

            <SubmitButton type="submit">Submit Order</SubmitButton>
          </FormWrapper>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default AddShipmentOrder;
