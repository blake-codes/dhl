import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaArrowRight } from "react-icons/fa";
import TrackingFormTrack from "../components/TrackingFormTrack";
import SubNavBar from "../components/SubNav";

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

const TrackingDetails = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  line-height: 1.6;
  border: 1px solid #e1e1e1;
`;

const MovementHistory = styled.div`
  margin-top: 2rem;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ArrowIcon = styled(FaArrowRight)`
  color: #27ae60;
  font-size: 1.3rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #444;
`;

const DetailText = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 0.5rem 0;
`;

const Track = () => {
  const trackingInfo = {
    trackingCode: "DHL123456789",
    status: "In Transit",
    origin: "Berlin, Germany",
    destination: "Rome, Italy",
    currentLocation: "Paris, France",
    shipmentDetails: {
      weight: "2.5kg",
      dimensions: "30x20x10 cm",
      serviceType: "Express",
    },
    movementHistory: [
      {
        date: "2024-09-10",
        location: "Berlin, Germany",
        status: "Shipment Created",
      },
      {
        date: "2024-09-11",
        location: "Leipzig, Germany",
        status: "Departed Hub",
      },
      { date: "2024-09-12", location: "Paris, France", status: "In Transit" },
    ],
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <BaseContainer>
        <TrackingFormTrack />
        <Section>
          <Title>Tracking Details</Title>
          <TrackingDetails>
            <DetailText>
              <strong>Tracking Code:</strong> {trackingInfo.trackingCode}
            </DetailText>
            <DetailText>
              <strong>Status:</strong> {trackingInfo.status}
            </DetailText>
            <DetailText>
              <strong>Origin:</strong> {trackingInfo.origin}
            </DetailText>
            <DetailText>
              <strong>Destination:</strong> {trackingInfo.destination}
            </DetailText>
            <DetailText>
              <strong>Current Location:</strong> {trackingInfo.currentLocation}
            </DetailText>

            <SubHeading>Shipment Details</SubHeading>
            <DetailText>
              <strong>Weight:</strong> {trackingInfo.shipmentDetails.weight}
            </DetailText>
            <DetailText>
              <strong>Dimensions:</strong>{" "}
              {trackingInfo.shipmentDetails.dimensions}
            </DetailText>
            <DetailText>
              <strong>Service Type:</strong>{" "}
              {trackingInfo.shipmentDetails.serviceType}
            </DetailText>

            <MovementHistory>
              <SubHeading>Movement History</SubHeading>
              {trackingInfo.movementHistory.map((item, index) => (
                <HistoryItem key={index}>
                  <ArrowIcon />
                  <div>
                    <DetailText>
                      <strong>Date:</strong> {item.date}
                    </DetailText>
                    <DetailText>
                      <strong>Location:</strong> {item.location}
                    </DetailText>
                    <DetailText>
                      <strong>Status:</strong> {item.status}
                    </DetailText>
                  </div>
                </HistoryItem>
              ))}
            </MovementHistory>
          </TrackingDetails>
        </Section>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Track;
