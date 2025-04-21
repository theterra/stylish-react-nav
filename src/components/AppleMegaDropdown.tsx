
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface AppleMegaDropdownProps {
  menuKey: string | null;
  visible: boolean;
}

const DummyDropdownData: Record<string, any> = {
  Store: {
    sections: [
      {
        title: "Shop",
        items: [
          { label: "Shop the Latest", path: "/store" },
          { label: "Mac", path: "/mac" },
          { label: "iPad", path: "/ipad" },
          { label: "iPhone", path: "/iphone" },
          { label: "Apple Watch", path: "/watch" },
          { label: "Apple Vision Pro", path: "/vision" },
          { label: "Accessories", path: "/accessories" },
        ],
      },
      {
        title: "Quick Links",
        items: [
          { label: "Find a Store", path: "/find-a-store" },
          { label: "Order Status", path: "/order-status" },
          { label: "Apple Trade In", path: "/trade-in" },
          { label: "Financing", path: "/financing" },
          { label: "Personal Setup", path: "/personal-setup" },
        ],
      },
      {
        title: "Shop Special Stores",
        items: [
          { label: "Certified Refurbished", path: "/refurbished" },
          { label: "Education", path: "/education" },
          { label: "Business", path: "/business" },
          { label: "Veterans and Military", path: "/veterans" },
          { label: "Government", path: "/government" },
        ],
      },
    ],
  },
  Mac: {
    sections: [
      {
        title: "Explore Mac",
        items: [
          { label: "Explore All Mac", path: "/mac" },
          { label: "MacBook Air", path: "/macbook-air" },
          { label: "MacBook Pro", path: "/macbook-pro" },
          { label: "iMac", path: "/imac" },
          { label: "Mac mini", path: "/mac-mini" },
          { label: "Mac Studio", path: "/mac-studio" },
          { label: "Mac Pro", path: "/mac-pro" },
          { label: "Compare Mac", path: "/compare-mac" },
          { label: "Mac Does That", path: "/mac-does-that" },
        ],
      },
      {
        title: "Shop Mac",
        items: [
          { label: "Shop Mac", path: "/mac/shop" },
          { label: "Mac Accessories", path: "/mac/accessories" },
          { label: "Apple Trade In", path: "/trade-in" },
          { label: "Financing", path: "/financing" },
        ],
      },
      {
        title: "More from Mac",
        items: [
          { label: "Mac Support", path: "/support" },
          { label: "AppleCare+ for Mac", path: "/mac/applecare-plus" },
          { label: "macOS Sonoma", path: "/macos-sonoma" },
        ],
      },
    ],
  },
  iPad: {
    sections: [
      {
        title: "Explore iPad",
        items: [
          { label: "Explore All iPad", path: "/ipad" },
          { label: "iPad Pro", path: "/ipad-pro" },
          { label: "iPad Air", path: "/ipad-air" },
          { label: "iPad", path: "/ipad" },
          { label: "iPad mini", path: "/ipad-mini" },
          { label: "Apple Pencil", path: "/apple-pencil" },
          { label: "Keyboards", path: "/keyboards" },
          { label: "Compare iPad", path: "/compare-ipad" },
          { label: "Why iPad", path: "/why-ipad" },
        ],
      },
      {
        title: "Shop iPad",
        items: [
          { label: "Shop iPad", path: "/ipad/shop" },
          { label: "iPad Accessories", path: "/ipad/accessories" },
          { label: "Apple Trade In", path: "/trade-in" },
          { label: "Financing", path: "/financing" },
        ],
      },
      {
        title: "More from iPad",
        items: [
          { label: "iPad Support", path: "/support" },
          { label: "AppleCare+ for iPad", path: "/ipad/applecare-plus" },
          { label: "iPadOS 17", path: "/ipados-17" },
        ],
      },
    ],
  },
  iPhone: {
    sections: [
      {
        title: "Explore iPhone",
        items: [
          { label: "Explore All iPhone", path: "/iphone" },
          { label: "iPhone 15 Pro", path: "/iphone-15-pro" },
          { label: "iPhone 15", path: "/iphone-15" },
          { label: "iPhone 14", path: "/iphone-14" },
          { label: "iPhone SE", path: "/iphone-se" },
          { label: "Compare iPhone", path: "/compare-iphone" },
          { label: "Switch from Android", path: "/switch" },
        ],
      },
      {
        title: "Shop iPhone",
        items: [
          { label: "Shop iPhone", path: "/iphone/shop" },
          { label: "iPhone Accessories", path: "/iphone/accessories" },
          { label: "Apple Trade In", path: "/trade-in" },
          { label: "Carrier Offers", path: "/carrier-offers" },
        ],
      },
      {
        title: "More from iPhone",
        items: [
          { label: "iPhone Support", path: "/support" },
          { label: "AppleCare+ for iPhone", path: "/iphone/applecare-plus" },
          { label: "iOS 17", path: "/ios-17" },
          { label: "Wallet", path: "/wallet" },
        ],
      },
    ],
  },
};

// Animation: collapse height, fade content for smooth open/close
const DropdownAnim = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 0;
  top: 44px;
  width: 100vw;
  max-width: 100vw;
  background: #19191a;
  color: #fff;
  z-index: 1050;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.34);
  display: flex;
  justify-content: center;
  overflow: hidden;
  /* Height transition */
  max-height: ${({ $visible }) => ($visible ? "550px" : "0")};
  transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  padding: ${({ $visible }) => ($visible ? "42px 0 52px 0" : "0")};

  @media (max-width: 1080px) {
    max-width: 100vw;
    padding-left: 0;
    padding-right: 0;
  }
`;

const ContentWrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? "1" : "0")};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "-10px")});
  transition: opacity 0.33s cubic-bezier(0.4, 0, 0.2, 1), transform 0.33s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${({ $visible }) => ($visible ? "0.08s" : "0s")};
  width: 100vw;
  max-width: 1024px;
  overflow-x: auto;
  overflow-y: visible;
  display: flex;
  justify-content: center;
`;

const MegaMenu = styled.div`
  background: none;
  width: 100%;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 70px;
  margin: 0 auto;

  @media (max-width: 1080px) {
    padding: 0 10px;
    gap: 30px;
    max-width: 100vw;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 170px;
  max-width: 300px;
  word-break: break-word;
  @media (max-width: 850px) {
    max-width: 98vw;
  }
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

export const AppleMegaDropdown: React.FC<{ menuKey: string | null, visible: boolean }> = ({
  menuKey,
  visible,
}) => {
  // Unmount content after close for accessibility and layout
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) setShouldRender(true);
    else {
      const timeout = setTimeout(() => setShouldRender(false), 430); // match closing transition
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!menuKey || !(menuKey in DummyDropdownData)) return (
    <DropdownAnim $visible={false} aria-hidden="true" />
  );

  const dropdown = DummyDropdownData[menuKey];
  return (
    <DropdownAnim $visible={visible} aria-hidden={!visible ? "true" : "false"}>
      {shouldRender &&
        <ContentWrapper $visible={visible}>
          <MegaMenu>
            {dropdown.sections.map((section: any, sectionIdx: number) => (
              <Col key={sectionIdx}>
                <SectionTitle>{section.title}</SectionTitle>
                {section.items.map((item: any, idx: number) =>
                  idx < 2 && sectionIdx === 0 ? (
                    <SectionLink key={item.label} to={item.path}>{item.label}</SectionLink>
                  ) : (
                    <RegularLink key={item.label} to={item.path}>{item.label}</RegularLink>
                  )
                )}
              </Col>
            ))}
          </MegaMenu>
        </ContentWrapper>
      }
    </DropdownAnim>
  );
};

export default AppleMegaDropdown;
