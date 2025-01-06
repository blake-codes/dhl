import styled from "styled-components";
import Navbar from "../components/NavBar";
import TrackingForm from "../components/TrackingForm";
import Footer from "../components/Footer";
import SubNavBar from "../components/SubNav";

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  background: url("../assets/images/header.jpg") center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 1rem;
  }
`;

const Section = styled.section`
  padding: 4rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #2c3e50;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  blockquote {
    font-style: italic;
    opacity: 0.85;
  }

  h3 {
    margin: 1rem 0 0.5rem;
    color: #2c3e50;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Testimonials = () => (
  <Section style={{ background: "#f9f9f9" }}>
    <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
      What Our Customers Say
    </h2>
    <GridContainer>
      <TestimonialCard>
        <img src="../assets/images/woman.jpg" alt="Jane Doe" />
        <blockquote>
          "Amazing service! My package arrived even earlier than expected."
        </blockquote>
        <h3>Jessica Brooks</h3>
      </TestimonialCard>

      <TestimonialCard>
        <img src="../assets/images/man.jpg" alt="John Smith" />
        <blockquote>
          "Exceptional customer support and reliable delivery. Highly
          recommended!"
        </blockquote>
        <h3>Michael Reynolds</h3>
      </TestimonialCard>

      <TestimonialCard>
        <img src="../assets/images/black.jpg" alt="Sarah Lee" />
        <blockquote>
          "I trust this company with all my logistics needs. Fantastic
          experience!"
        </blockquote>
        <h3>Emily Carter</h3>
      </TestimonialCard>
    </GridContainer>
  </Section>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <SubNavBar />
      <HeroSection>
        <TrackingForm />
      </HeroSection>

      {/* Why Choose Us Section */}
      <Section style={{ background: "#f5f5f5" }}>
        <h2>Why Choose Us</h2>
        <GridContainer>
          <ServiceCard>
            <h3>Fast Delivery</h3>
            <p>We ensure your packages reach their destination quickly.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>Reliable Service</h3>
            <p>Our logistics network guarantees dependability.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>24/7 Support</h3>
            <p>Our support team is available around the clock.</p>
          </ServiceCard>
        </GridContainer>
      </Section>

      {/* Our Services Section */}
      <Section>
        <h2>Our Services</h2>
        <GridContainer>
          <ServiceCard>
            <img src="../assets/images/express.jpeg" alt="Express Shipping" />
            <h3>Express Shipping</h3>
            <p>Get your deliveries within 1-3 business days.</p>
          </ServiceCard>
          <ServiceCard>
            <img
              src="../assets/images/deliver.jpeg"
              alt="Logistics Solutions"
            />
            <h3>Logistics Solutions</h3>
            <p>Comprehensive supply chain solutions for businesses.</p>
          </ServiceCard>
          <ServiceCard>
            <img
              src="../assets/images/container.jpeg"
              alt="International Shipping"
            />
            <h3>International Shipping</h3>
            <p>Reliable global shipping services.</p>
          </ServiceCard>
        </GridContainer>
      </Section>

      {/* Updated Testimonials Section */}
      <Testimonials />

      {/* Document & Parcel Shipping Section */}
      <Section style={{ background: "#f5f5f5" }}>
        <h2>Document & Parcel Shipping</h2>
        <GridContainer>
          <ServiceCard>
            <img src="../assets/images/woman.jpeg" alt="Document Shipping" />
            <h3>Secure Document Handling</h3>
            <p>Ensure your documents are delivered safely and securely.</p>
          </ServiceCard>
          <ServiceCard>
            <img src="../assets/images/tracker.jpeg" alt="Parcel Tracking" />
            <h3>Parcel Tracking</h3>
            <p>Real-time parcel tracking for peace of mind.</p>
          </ServiceCard>
        </GridContainer>
      </Section>

      <Footer />
    </>
  );
};

export default Home;
