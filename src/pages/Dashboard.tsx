import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const BaseContainer = styled.div`
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  color: #333;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const DashboardTitle = styled.h1`
  font-size: 1.8rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const { username } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url =
          username === "admin"
            ? "https://dhl-server.onrender.com/api/orders"
            : `https://dhl-server.onrender.com/api/orders/find/${username}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <DashboardContainer>
          <DashboardTitle>Shipping Orders</DashboardTitle>
          {username === "admin" && (
            <Link to="/add-shipment-order">
              <ActionButton>Add Shipping Order</ActionButton>
            </Link>
          )}

          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Tracking ID</TableHeader>
                  <TableHeader>Shipment Name</TableHeader>
                  <TableHeader>Sender</TableHeader>
                  <TableHeader>Receiver</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        to={`/order/${order.trackingNumber}`}
                        style={{ textDecoration: "none", color: "#0275d8" }}
                      >
                        {order.trackingNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{order.shipmentName}</TableCell>
                    <TableCell>{order.senderName}</TableCell>
                    <TableCell>{order.receiverName}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </DashboardContainer>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Dashboard;
