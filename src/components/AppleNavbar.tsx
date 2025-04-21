
import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Styled Components
const NavContainer = styled.nav`
  background-color: #000000;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0 22px;
  width: 100%;
  box-sizing: border-box;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  padding: 0 10px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const NavLink = styled(Link)`
  color: #f5f5f7;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  font-family: "SF Pro Text", "Myriad Set Pro", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LogoLink = styled(Link)`
  color: #f5f5f7;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  padding: 0;
  
  &:hover {
    opacity: 1;
  }
`;

// Mobile Menu Components
const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #f5f5f7;
  font-size: 16px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  background-color: #000000;
  height: ${props => (props.isOpen ? 'calc(100vh - 44px)' : '0')};
  overflow: hidden;
  transition: height 0.3s ease;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
`;

const MobileNavItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AppleIcon = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0729 6.26726C12.9825 6.33855 11.3458 7.21353 11.3458 9.17609C11.3458 11.4551 13.4441 12.2398 13.5 12.2398C13.4888 12.2856 13.1823 13.3784 12.3979 14.4939C11.7042 15.4695 10.9767 16.4451 9.85126 16.4451C8.77047 16.4451 8.42813 15.8056 7.16798 15.8056C5.9636 15.8056 5.48878 16.4451 4.50774 16.4451C3.38233 16.4451 2.59938 15.4237 1.87818 14.4481C1.04168 13.3096 0.316239 11.5638 0.316239 9.9054C0.316239 7.18268 1.99461 5.7502 3.62725 5.7502C4.66381 5.7502 5.53454 6.44508 6.19401 6.44508C6.81924 6.44508 7.77908 5.7502 8.95072 5.7502C9.35883 5.7502 11.0697 5.7959 12.2414 7.3919C12.168 7.43785 13.0729 6.26726 13.0729 6.26726ZM9.14123 4.24802C9.64879 3.65271 10.0011 2.81345 10.0011 1.97419C10.0011 1.85695 9.98991 1.73971 9.97867 1.64829C9.19571 1.67114 8.25707 2.15135 7.67607 2.80049C7.20125 3.30654 6.76039 4.14579 6.76039 4.99664C6.76039 5.12546 6.78282 5.25428 6.78282 5.28871C6.83854 5.3001 6.92879 5.31148 7.01904 5.31148C7.7291 5.31148 8.60546 4.86559 9.14123 4.24802Z" fill="white"/>
  </svg>
);

// Navigation links data
const navLinks = [
  { title: 'Store', path: '/store' },
  { title: 'Mac', path: '/mac' },
  { title: 'iPad', path: '/ipad' },
  { title: 'iPhone', path: '/iphone' },
  { title: 'Watch', path: '/watch' },
  { title: 'Vision', path: '/vision' },
  { title: 'AirPods', path: '/airpods' },
  { title: 'TV & Home', path: '/tv-home' },
  { title: 'Entertainment', path: '/entertainment' },
  { title: 'Accessories', path: '/accessories' },
  { title: 'Support', path: '/support' },
];

const AppleNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavContainer>
      <NavContent>
        <LogoLink to="/">
          <AppleIcon />
        </LogoLink>

        {/* Desktop Navigation */}
        <NavList>
          {navLinks.map((link) => (
            <NavItem key={link.title}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </NavItem>
          ))}
        </NavList>

        <IconContainer>
          <IconButton aria-label="Search">
            <Search size={16} />
          </IconButton>
          <IconButton aria-label="Shopping Bag">
            <ShoppingBag size={16} />
          </IconButton>
        </IconContainer>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </MobileMenuButton>
      </NavContent>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavList>
          {navLinks.map((link) => (
            <MobileNavItem key={link.title}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </MobileNavItem>
          ))}
        </MobileNavList>
      </MobileMenu>
    </NavContainer>
  );
};

export default AppleNavbar;
