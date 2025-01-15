import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";
import { useNavigate } from "react-router-dom";

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
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #555;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;

  li {
    font-size: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  background-color: #eb131e;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #d40511;
  }
`;

const EnterpriseLogistics: React.FC = () => {
  const navigate = useNavigate();

  const handleContactUs = () => navigate("/help");

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <Section>
          <FormTitle>Enterprise Logistics Services</FormTitle>
          <Description>
            Providing reliable and efficient logistics solutions for large
            enterprises.
          </Description>

          <ServiceList>
            <li>Customized Supply Chain Solutions</li>
            <li>Real-Time Tracking and Reporting</li>
            <li>Bulk Cargo Management</li>
            <li>24/7 Customer Support</li>
            <li>Global Freight Services</li>
          </ServiceList>

          <ActionButton onClick={handleContactUs}>
            Contact Us for Services
          </ActionButton>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default EnterpriseLogistics;
