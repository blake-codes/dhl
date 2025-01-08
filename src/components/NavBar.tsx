import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaGlobe,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";

interface NavProps {
  $isOpen: boolean;
}

const NavBar = styled.nav<NavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #ffcc00;
  color: black;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .hamburger {
    display: none;
    cursor: pointer;
    color: #eb131e;

    @media (max-width: 768px) {
      display: block;
    }
  }

  ul {
    display: flex;
    gap: 35px;
    list-style: none;

    @media (max-width: 768px) {
      display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
      flex-direction: column;
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      background-color: #fff;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  }

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #f39c12;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
      font-size: small;
      font-weight: 300;
      gap: 8px;

      &:hover {
        color: #eb131e;
        text-decoration: underline;
      }
    }
  }
`;

const Logo = styled(Link)`
  img {
    height: 120px;
    width: 180px;
    object-fit: contain;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavBar $isOpen={isOpen}>
      <Logo to="/">
        <img src="/assets/images/dhl.png" alt="DHL Logo" />
      </Logo>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <ul>
        {isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Track
            </Link>
          </li>
        )}
        {isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Ship
            </Link>
          </li>
        )}
        {isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Customer Service
            </Link>
          </li>
        )}
        {!isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaHome /> Find a Location
            </Link>
          </li>
        )}
        {!isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaSearch /> Search
            </Link>
          </li>
        )}
        {!isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaGlobe /> United States of America
            </Link>
          </li>
        )}

        {isOpen && (
          <li style={{ marginBottom: "40px" }}>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <FaUser /> Customer Portal Login
            </Link>
          </li>
        )}
      </ul>
    </NavBar>
  );
};

export default Navbar;
