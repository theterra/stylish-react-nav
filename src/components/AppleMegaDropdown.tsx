
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AppleMegaDropdownProps {
  menuKey: string | null;
  visible: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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

// Backdrop overlay that will blur the background content
const BackdropOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  pointer-events: auto;
  z-index: 900;
`;

// Using motion.div for animated container
const DropdownContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 44px;
  width: 100vw;
  max-width: 100vw;
  background: rgba(25, 25, 26, 0.95); /* Semi-transparent background */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ffffff;
  z-index: 1050;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.34);
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 0; /* We'll add padding in the ContentWrapper */

  @media (max-width: 1080px) {
    max-width: 100vw;
    padding-left: 0;
    padding-right: 0;
  }
`;

const ContentWrapper = styled(motion.div)`
  width: 100vw;
  max-width: 1024px;
  overflow-x: auto;
  overflow-y: visible;
  display: flex;
  justify-content: center;
  padding: 42px 0 52px 0;
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
  color: #ffffff !important; /* Force white color */
  font-size: 23px;
  font-weight: 700;
  line-height: 1.18;
  text-decoration: none;
  margin-bottom: 1.5px;
  transition: color 0.13s;
  opacity: 1;
  &:hover {
    color: #cacaca !important;
    text-decoration: underline;
  }
`;

const RegularLink = styled(Link)`
  color: #ffffff !important; /* Force white color */
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 3px;
  transition: color 0.13s;
  opacity: 1;
  &:hover {
    color: #c8c8c9 !important;
    text-decoration: underline;
  }
`;

export const AppleMegaDropdown: React.FC<AppleMegaDropdownProps> = ({
  menuKey,
  visible,
  onMouseEnter,
  onMouseLeave
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Update activeMenuKey when menuKey changes and is valid
  useEffect(() => {
    if (menuKey && menuKey in DummyDropdownData) {
      setActiveMenuKey(menuKey);
    }
  }, [menuKey]);

  // Reset animation state when dropdown closes
  useEffect(() => {
    if (!visible) {
      // When dropdown closes, reset animation state after exit animation completes
      const timer = setTimeout(() => {
        setHasAnimated(false);
      }, 300); // slightly longer than exit animation duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Animation variants
  const backdropVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const dropdownVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { 
          duration: 0.3, 
        },
        opacity: { 
          duration: 0.2, 
        }
      }
    }
  };
  
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.25,
        delay: 0.05
      }
    }
  };

  // Add body scroll lock when dropdown is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && visible) {
        // Close the dropdown by dispatching a custom event
        const closeEvent = new CustomEvent('close-mega-dropdown');
        document.dispatchEvent(closeEvent);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible]);
  
  // Track when animation starts
  const handleAnimationStart = () => {
    if (!hasAnimated && visible) {
      setHasAnimated(true);
    }
  };

  // Get current menu data
  const dropdown = activeMenuKey && DummyDropdownData[activeMenuKey] ? DummyDropdownData[activeMenuKey] : null;

  // Check if this menu key has data before showing dropdown
  const shouldDisplayDropdown = visible && dropdown !== null;

  // Debug the current state
  console.log("Dropdown visible:", visible);
  console.log("Active menu key:", activeMenuKey);
  console.log("Current dropdown data:", dropdown);
  console.log("Should display dropdown:", shouldDisplayDropdown);
  console.log("Has animated:", hasAnimated);

  return (
    <AnimatePresence mode="sync">
      {shouldDisplayDropdown && (
        <>
          <BackdropOverlay
            key="backdrop-overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={(e) => {
              e.stopPropagation();
              const closeEvent = new CustomEvent('close-mega-dropdown');
              document.dispatchEvent(closeEvent);
            }}
          />
          <DropdownContainer
            key="dropdown-container"
            ref={dropdownRef}
            initial={!hasAnimated ? "hidden" : false}
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onAnimationStart={handleAnimationStart}
            style={{ opacity: 1 }} /* Force opacity */
          >
            <ContentWrapper
              key="content-wrapper"
              variants={!hasAnimated ? contentVariants : undefined}
              initial={!hasAnimated ? "hidden" : false}
              animate="visible"
              exit="hidden"
              style={{ opacity: 1 }} /* Force opacity */
            >
              <MegaMenu>
                {dropdown.sections.map((section: any, sectionIdx: number) => (
                  <Col key={`section-${sectionIdx}-${activeMenuKey}`}>
                    <SectionTitle>{section.title}</SectionTitle>
                    {section.items.map((item: any, idx: number) => (
                      idx < 2 && sectionIdx === 0 ? (
                        <SectionLink key={`${item.label}-${activeMenuKey}-${idx}`} to={item.path}>{item.label}</SectionLink>
                      ) : (
                        <RegularLink key={`${item.label}-${activeMenuKey}-${idx}`} to={item.path}>{item.label}</RegularLink>
                      )
                    ))}
                  </Col>
                ))}
              </MegaMenu>
            </ContentWrapper>
          </DropdownContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppleMegaDropdown;
