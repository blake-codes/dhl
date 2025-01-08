/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useState } from "react";
import { Link } from "react-router-dom";

const BaseContainer = styled.div`
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  color: #333;
  @media (max-width: 768px) {
    margin-top: 60px;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orders, setOrders] = useState([
    {
      trackingId: "DHL123456789",
      senderName: "Alice Smith",
      receiverName: "Bob Johnson",
    },
    {
      trackingId: "DHL987654321",
      senderName: "Charlie Brown",
      receiverName: "Dana White",
    },
  ]);

  const handleOrderClick = (order: any) => {
    alert(`You clicked on order with Tracking ID: ${order.trackingId}`);
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <DashboardContainer>
          <DashboardTitle>Shipping Orders</DashboardTitle>
          <Link to="/add-shipment-order">
            <ActionButton>Add Shipping Order</ActionButton>
          </Link>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Tracking ID</TableHeader>
                  <TableHeader>Sender</TableHeader>
                  <TableHeader>Receiver</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <TableRow key={index} onClick={() => handleOrderClick(order)}>
                    <TableCell>
                      <Link
                        to={`/order/${order.trackingId}`}
                        style={{ textDecoration: "none", color: "#0275d8" }}
                      >
                        {order.trackingId}
                      </Link>
                    </TableCell>
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
