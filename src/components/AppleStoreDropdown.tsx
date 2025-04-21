
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DropdownContainer = styled.div`
  position: absolute;
  left: 0;
  top: 44px;
  width: 100vw;
  background: #1a1f2c;
  color: #fff;
  z-index: 1000;
  padding: 40px 0 60px 0;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
`;

const MegaMenu = styled.div`
  width: 100%;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 60px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SectionTitle = styled.div`
  color: #c8c8c9;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const SectionLink = styled(Link)`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  margin-bottom: 2px;
  transition: color 0.15s;
  &:hover {
    color: #f5f5f7;
    text-decoration: underline;
  }
`;

const RegularLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 4px;
  transition: color 0.15s;
  &:hover {
    color: #c8c8c9;
    text-decoration: underline;
  }
`;

const AppleStoreDropdown: React.FC = () => (
  <DropdownContainer>
    <MegaMenu>
      <Col>
        <SectionTitle>Shop</SectionTitle>
        <SectionLink to="/store">Shop the Latest</SectionLink>
        <SectionLink to="/mac">Mac</SectionLink>
        <SectionLink to="/ipad">iPad</SectionLink>
        <SectionLink to="/iphone">iPhone</SectionLink>
        <SectionLink to="/watch">Apple Watch</SectionLink>
        <SectionLink to="/vision">Apple Vision Pro</SectionLink>
        <SectionLink to="/accessories">Accessories</SectionLink>
      </Col>
      <Col>
        <SectionTitle>Quick Links</SectionTitle>
        <RegularLink to="/find-a-store">Find a Store</RegularLink>
        <RegularLink to="/order-status">Order Status</RegularLink>
        <RegularLink to="/trade-in">Apple Trade In</RegularLink>
        <RegularLink to="/financing">Financing</RegularLink>
        <RegularLink to="/personal-setup">Personal Setup</RegularLink>
      </Col>
      <Col>
        <SectionTitle>Shop Special Stores</SectionTitle>
        <RegularLink to="/refurbished">Certified Refurbished</RegularLink>
        <RegularLink to="/education">Education</RegularLink>
        <RegularLink to="/business">Business</RegularLink>
        <RegularLink to="/veterans">Veterans and Military</RegularLink>
        <RegularLink to="/government">Government</RegularLink>
      </Col>
    </MegaMenu>
  </DropdownContainer>
);

export default AppleStoreDropdown;

