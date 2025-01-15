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
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";

interface NavProps {
  $isOpen: boolean;
  $isDropdownOpen: boolean;
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

  .dropdown {
    position: absolute;
    background-color: white;
    top: 60px;
    right: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: ${({ $isDropdownOpen }) => ($isDropdownOpen ? "block" : "none")};
    z-index: 1001;
  }

  .dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f1f1f1;
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

const AdminDropdown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  font-weight: 300;
  gap: 8px;

  &:hover {
    color: #eb131e;
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, username, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <NavBar $isOpen={isOpen} $isDropdownOpen={isDropdownOpen}>
      <Logo to="/">
        <img src="/assets/images/dhl.png" alt="DHL Logo" />
      </Logo>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <ul>
        {isOpen && isAuthenticated && (
          <li>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
        )}

        {isOpen && isAuthenticated && username === "admin" && (
          <li>
            <Link to="/messages" onClick={() => setIsOpen(false)}>
              Messages
            </Link>
          </li>
        )}
        {isOpen && (
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Track
            </Link>
          </li>
        )}
        {isOpen && (
          <li>
            <Link to="/ship" onClick={() => setIsOpen(false)}>
              Ship
            </Link>
          </li>
        )}
        {isOpen && (
          <li>
            <Link to="/help" onClick={() => setIsOpen(false)}>
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
        {/* Styled admin dropdown */}
        {!isOpen && isAuthenticated && (
          <li onClick={toggleDropdown}>
            <AdminDropdown>
              <FaUser /> {username} <FaChevronDown />
            </AdminDropdown>
            <ul className="dropdown">
              <li>
                <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>
                  Dashboard
                </Link>
              </li>
              {username === "admin" && (
                <li>
                  <Link to="/messages" onClick={() => setIsDropdownOpen(false)}>
                    Messages
                  </Link>
                </li>
              )}

              <li>
                <Link to="/" onClick={logout}>
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            </ul>
          </li>
        )}
        {isOpen && !isAuthenticated && (
          <li>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <FaUser /> Customer Portal Login
            </Link>
          </li>
        )}
        {isOpen && isAuthenticated && (
          <li style={{ marginBottom: "40px" }}>
            <Link to="/" onClick={logout}>
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        )}
      </ul>
    </NavBar>
  );
};

export default Navbar;
