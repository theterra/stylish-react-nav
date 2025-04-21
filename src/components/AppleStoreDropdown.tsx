
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface DropdownProps {
  visible: boolean;
}

const DropdownAnim = styled.div<DropdownProps>`
  position: fixed;
  left: 0;
  top: 44px;
  width: 100vw;
  background: #19191a;
  color: #fff;
  z-index: 999;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.34);
  display: flex;
  justify-content: center;
  /* height animates smoothly when visible changes */
  height: ${({ visible }) => (visible ? "360px" : "0px")};
  transition: height 0.36s cubic-bezier(.4,0,.2,1);
`;

const MegaMenu = styled.div`
  width: 100%;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 70px;
  padding: 42px 0 52px 0;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SectionTitle = styled.div`
  color: #8A898C;
  font-size: 14.5px;
  font-weight: 400;
  margin-bottom: 12px;
  margin-top: 4px;
`;

const SectionLink = styled(Link)`
  color: #fff;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.18;
  text-decoration: none;
  margin-bottom: 1.5px;
  transition: color 0.13s;
  &:hover {
    color: #cacaca;
    text-decoration: underline;
  }
`;

const RegularLink = styled(Link)`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 3px;
  transition: color 0.13s;
  &:hover {
    color: #c8c8c9;
    text-decoration: underline;
  }
`;

const AppleStoreDropdown: React.FC<DropdownProps> = ({ visible }) => (
  <DropdownAnim visible={visible} aria-hidden={!visible}>
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
  </DropdownAnim>
);

export default AppleStoreDropdown;

