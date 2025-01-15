import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    margin-top: 20px;
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

const AddShipmentOrder: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = {
      shipmentName: form["shipmentName"].value,
      origin: form["origin"].value,
      destination: form["destination"].value,
      currentLocation: form["currentLocation"].value,
      senderName: form["senderName"].value,
      receiverName: form["receiverName"].value,
      receiverEmail: form["receiverEmail"].value,
      receiverPhone: form["receiverPhone"].value,
      receiverAddress: form["receiverAddress"].value,
      status: form["status"].value,
      weight: form["weight"].value,
      dimensions: form["dimensions"].value,
      movementHistory: [
        {
          movementLocation: form["movementLocation"].value,
          movementDate: form["movementDate"].value,
          movementStatus: form["movementStatus"].value,
        },
      ],
      username: form["username"].value,
      password: form["password"].value,
      assignedOldUser: form["assignedOldUser"].value,
    };

    try {
      const response = await fetch(
        "https://dhl-server.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Order created successfully!");
        navigate(`/dashboard`);
      } else {
        toast.error(data.message || "Failed to create order.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error submitting the order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <ToastContainer />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Add Shipment Order</FormTitle>
          <FormWrapper onSubmit={handleSubmit}>
            <InputField
              name="shipmentName"
              placeholder="Shipment Name"
              required
            />
            <InputField name="origin" placeholder="Origin" required />
            <InputField name="destination" placeholder="Destination" required />
            <InputField
              name="currentLocation"
              placeholder="Current Location"
              required
            />
            <InputField name="senderName" placeholder="Sender Name" required />
            <InputField
              name="receiverName"
              placeholder="Receiver Name"
              required
            />
            <InputField
              name="receiverEmail"
              placeholder="Receiver Email"
              required
            />
            <InputField
              name="receiverPhone"
              placeholder="Receiver Phone"
              required
            />
            <InputField
              name="receiverAddress"
              placeholder="Receiver Address"
              required
            />
            <InputField name="status" placeholder="Status" required />
            <InputField name="weight" placeholder="Weight" required />
            <InputField
              name="dimensions"
              placeholder="Dimensions (LxWxH)"
              required
            />

            <FormTitle>Initial Movement History</FormTitle>
            <InputField
              name="movementLocation"
              placeholder="Movement Location"
              required
            />
            <InputField type="date" name="movementDate" required />
            <InputField
              name="movementStatus"
              placeholder="Movement Status"
              required
            />

            <FormTitle>User Login Details(new user)</FormTitle>
            <InputField name="username" placeholder="Username" />
            <InputField type="text" name="password" placeholder="Password" />

            <FormTitle>Assign To User(old user)</FormTitle>
            <InputField name="assignedOldUser" placeholder="Username" />

            <SubmitButton type="submit">Submit Order</SubmitButton>
          </FormWrapper>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default AddShipmentOrder;
