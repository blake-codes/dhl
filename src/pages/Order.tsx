import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

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

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  font-weight: 500;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  background-color: #27ae60;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #219150;
  }

  @media (max-width: 768px) {
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

const Order: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Handle order edit (navigate to edit page)
    navigate("/edit-order");
  };

  const handleDelete = () => {
    // Handle order deletion (confirmation, API call, etc.)
    console.log("Order deleted");
  };

  const handleAddMovement = () => {
    // Handle adding order movement
    console.log("Add order movement");
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Order Details</FormTitle>
          <OrderDetail>
            <OrderItem>
              <span>Shipment Name</span>
              <span>Shipment ABC</span>
            </OrderItem>
            <OrderItem>
              <span>Origin</span>
              <span>New York</span>
            </OrderItem>
            <OrderItem>
              <span>Destination</span>
              <span>Los Angeles</span>
            </OrderItem>
            <OrderItem>
              <span>Current Location</span>
              <span>Chicago</span>
            </OrderItem>
            <OrderItem>
              <span>Sender Name</span>
              <span>John Doe</span>
            </OrderItem>
            <OrderItem>
              <span>Receiver Name</span>
              <span>Jane Doe</span>
            </OrderItem>
            <OrderItem>
              <span>Status</span>
              <span>In Transit</span>
            </OrderItem>
            <OrderItem>
              <span>Weight</span>
              <span>10 kg</span>
            </OrderItem>
            <OrderItem>
              <span>Dimensions</span>
              <span>10x10x10 cm</span>
            </OrderItem>
          </OrderDetail>

          <ActionButtons>
            <ActionButton onClick={handleEdit}>Edit Order</ActionButton>
            <ActionButton
              onClick={handleDelete}
              style={{ backgroundColor: "#e74c3c" }}
            >
              Delete Order
            </ActionButton>
            <ActionButton
              onClick={handleAddMovement}
              style={{ backgroundColor: "#f39c12" }}
            >
              Add Movement
            </ActionButton>
          </ActionButtons>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Order;
