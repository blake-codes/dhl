/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext";

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

  span:nth-child(1) {
    font-weight: bold;
    color: #333;
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 769px) {
    flex-direction: row;
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

const ActionButton = styled.button`
  padding: 1rem 2rem;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #219150;
  }

  &.delete {
    background-color: #e74c3c;
  }

  &.add-movement {
    background-color: #f39c12;
  }
`;

type OrderType = {
  trackingNumber: string;
  movementHistory?: {
    movementLocation: string;
    movementDate: string;
    movementStatus: string;
  }[];
  user?: { username: string; password: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const Order: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://dhl-server.onrender.com/api/orders/${trackingNumber}`
        );
        if (!response.ok) throw new Error("Order not found");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [trackingNumber]);

  const handleEdit = () => navigate(`/edit-order/${trackingNumber}`);
  const formatTitle = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space between lowercase and uppercase letters
      .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone."
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `https://dhl-server.onrender.com/api/orders/${trackingNumber}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Order deleted successfully!");
        navigate(`/dashboard`);
      } else {
        toast.error(data.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Failed to delete order");
    }
  };

  const handleAddMovement = () => navigate(`/add-movement/${trackingNumber}`);

  if (loading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  if (!order) return <p>Order not found.</p>;

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
          <FormTitle>Order Details</FormTitle>
          <OrderDetail>
            {Object.entries(order).map(([key, value]) => {
              if (["_id", "locationUpdates", "__v"].includes(key)) {
                return null;
              }
              const formattedKey = formatTitle(key);
              if (key === "movementHistory" && Array.isArray(value)) {
                return (
                  <div key={key}>
                    <span style={{ color: "#333", fontWeight: "bold" }}>
                      Movement History
                    </span>

                    {value.map((movement, index) => (
                      <OrderItem key={index}>
                        <span>
                          <span style={{ color: "#333", fontWeight: "bold" }}>
                            Location:{" "}
                          </span>
                          <span style={{ color: "#555", fontWeight: "500" }}>
                            {" "}
                            {movement.movementLocation}
                          </span>
                        </span>
                        <span>
                          <span style={{ color: "#333", fontWeight: "bold" }}>
                            Date:{" "}
                          </span>{" "}
                          {new Date(movement.movementDate).toLocaleDateString()}
                        </span>
                        <span>
                          <span style={{ color: "#333", fontWeight: "bold" }}>
                            Status:{" "}
                          </span>
                          : {movement.movementStatus}
                        </span>
                      </OrderItem>
                    ))}
                  </div>
                );
              }

              if (key === "user" && typeof value === "object") {
                if (username === "admin") {
                  return (
                    <div key={key}>
                      <OrderItem>
                        <span>Username</span>
                        <span>{value.username ?? "N/A"}</span>
                      </OrderItem>
                      <OrderItem>
                        <span>Password</span>
                        <span>{value.password ?? "N/A"}</span>
                      </OrderItem>
                    </div>
                  );
                }
              }
              if (key === "user" && username !== "admin") {
                return null;
              }

              return (
                <OrderItem key={key}>
                  <span>{formattedKey}</span>
                  <span>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </OrderItem>
              );
            })}
          </OrderDetail>
          {username === "admin" && (
            <ActionButtons>
              <ActionButton onClick={handleEdit}>Edit Order</ActionButton>
              <ActionButton onClick={handleDelete} className="delete">
                Delete Order
              </ActionButton>
              <ActionButton
                onClick={handleAddMovement}
                className="add-movement"
              >
                Add Movement
              </ActionButton>
            </ActionButtons>
          )}
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Order;
