import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const SubNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 50px;
  margin-top: 55px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinksLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px; /* Balanced spacing */

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: black;
    font-size: 0.9rem;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
      color: red;
    }
  }
`;

const NavLinksRight = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: black;
    font-size: 0.9rem;
    font-weight: 300;

    svg {
      font-size: 1rem; /* Smaller icon size */
    }

    &:hover {
      text-decoration: underline;
      color: red;
    }
  }
`;

const SubNavBar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <SubNav>
      {/* Left side with four items */}
      <NavLinksLeft>
        <Link to="/">
          Track <FaChevronDown />
        </Link>
        <Link to="/ship">
          Ship <FaChevronDown />
        </Link>
        <Link to="/services">
          Enterprise Logistics Service <FaChevronDown />
        </Link>
        <Link to="/help">
          Customer Service <FaChevronDown />
        </Link>
      </NavLinksLeft>
      {!isAuthenticated && (
        <NavLinksRight>
          <Link to="/login">
            Customer Portal Login <FaChevronDown />
          </Link>
        </NavLinksRight>
      )}
      {/* Right side with a dropdown icon */}
    </SubNav>
  );
};

export default SubNavBar;
