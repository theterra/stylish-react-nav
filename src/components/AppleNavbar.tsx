
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Search, ShoppingBag, Menu, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppleMegaDropdown from './AppleMegaDropdown';
import { ScrollArea } from './ui/scroll-area';
import MobileMenuSubpanel from "./MobileMenuSubpanel";

// Styled Components
const NavContainer = styled.nav`
  background-color: #000;
  height: 44px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0px;

  @media (max-width: 768px) {
    padding: 0 0px;
    justify-content: flex-start;
    height: 48px;
    border-bottom: 1.5px solid #18181b;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100vw;
    padding: 0 10px;
    height: 48px;
  }
`;

const MobileRow = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 10px;
  }
`;

const MobileIconsRow = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const LogoLink = styled(Link)`
  color: #f5f5f7;
  opacity: 0.8;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  margin-left: 2px;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-left: 2px;
    height: 48px;
    width: 44px;
    align-items: center;
    justify-content: flex-start;
  }
`;

const AppleIcon = () => (
  <svg width="22" height="26" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0729 6.26726C12.9825 6.33855 11.3458 7.21353 11.3458 9.17609C11.3458 11.4551 13.4441 12.2398 13.5 12.2398C13.4888 12.2856 13.1823 13.3784 12.3979 14.4939C11.7042 15.4695 10.9767 16.4451 9.85126 16.4451C8.77047 16.4451 8.42813 15.8056 7.16798 15.8056C5.9636 15.8056 5.48878 16.4451 4.50774 16.4451C3.38233 16.4451 2.59938 15.4237 1.87818 14.4481C1.04168 13.3096 0.316239 11.5638 0.316239 9.9054C0.316239 7.18268 1.99461 5.7502 3.62725 5.7502C4.66381 5.7502 5.53454 6.44508 6.19401 6.44508C6.81924 6.44508 7.77908 5.7502 8.95072 5.7502C9.35883 5.7502 11.0697 5.7959 12.2414 7.3919C12.168 7.43785 13.0729 6.26726 13.0729 6.26726ZM9.14123 4.24802C9.64879 3.65271 10.0011 2.81345 10.0011 1.97419C10.0011 1.85695 9.98991 1.73971 9.97867 1.64829C9.19571 1.67114 8.25707 2.15135 7.67607 2.80049C7.20125 3.30654 6.76039 4.14579 6.76039 4.99664C6.76039 5.12546 6.78282 5.25428 6.78282 5.28871C6.83854 5.3001 6.92879 5.31148 7.01904 5.31148C7.7291 5.31148 8.60546 4.86559 9.14123 4.24802Z" fill="white"/>
  </svg>
);

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
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const NavLink = styled(Link)`
  color: #f5f5f7;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  font-family: "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    display: none;
  }
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
  transition: opacity 0.3s;
  padding: 0;

  &:hover {
    opacity: 1;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    width: 100vw;
    background: #111;
    box-shadow: 0 4px 22px 1px #00000073;
    z-index: 9999;
    transition: max-height 0.33s cubic-bezier(0.65, 0, 0.33, 1);
    overflow-y: auto;
    max-height: ${({ isOpen }) => (isOpen ? '420px' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
    padding: ${({ isOpen }) => (isOpen ? '18px 0 22px 0' : '0')};
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin: 0;
  width: 100%;
`;

const MobileNavItem = styled.li`
  padding: 14px 0;
  border-bottom: 1px solid #22272b;
  &:last-child {
    border-bottom: none;
  }
`;

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

const mobileSubmenus: Record<string, Array<{ label: string; path?: string }>> = {
  Store: [
    { label: "Shop the Latest", path: "/store/shop-latest" },
    { label: "Quick Links", path: "#" },
    { label: "Find a Store", path: "/find-a-store" },
    { label: "Order Status", path: "/order-status" },
    { label: "Apple Trade In", path: "/trade-in" },
    { label: "Financing", path: "/financing" },
    { label: "Personal Setup", path: "/personal-setup" },
  ],
  Mac: [
    { label: "MacBook Air", path: "/mac/macbook-air" },
    { label: "MacBook Pro", path: "/mac/macbook-pro" },
    { label: "iMac", path: "/mac/imac" },
    { label: "Mac mini", path: "/mac/mac-mini" },
    { label: "Compare all Mac", path: "/mac/compare" },
  ],
  iPad: [
    { label: "iPad Pro", path: "/ipad/pro" },
    { label: "iPad Air", path: "/ipad/air" },
    { label: "iPad", path: "/ipad" },
    { label: "iPad mini", path: "/ipad/mini" },
    { label: "Compare all iPad", path: "/ipad/compare" },
  ],
  iPhone: [
    { label: "iPhone 15 Pro", path: "/iphone/15-pro" },
    { label: "iPhone 15", path: "/iphone/15" },
    { label: "iPhone SE", path: "/iphone/se" },
    { label: "Compare all iPhone", path: "/iphone/compare" },
  ],
  Watch: [
    { label: "Apple Watch Series 9", path: "/watch/series-9" },
    { label: "Apple Watch SE", path: "/watch/se" },
    { label: "Apple Watch Ultra 2", path: "/watch/ultra-2" },
    { label: "Compare all Watches", path: "/watch/compare" },
  ],
  Vision: [
    { label: "Apple Vision Pro", path: "/vision/pro" },
    { label: "Apps & Experiences", path: "/vision/apps" },
    { label: "Tech Specs", path: "/vision/specs" },
  ],
  AirPods: [
    { label: "AirPods Pro (2nd gen)", path: "/airpods/pro" },
    { label: "AirPods (3rd gen)", path: "/airpods/3" },
    { label: "AirPods Max", path: "/airpods/max" },
    { label: "Compare all AirPods", path: "/airpods/compare" },
  ],
  "TV & Home": [
    { label: "Apple TV 4K", path: "/tv-home/tv4k" },
    { label: "HomePod", path: "/tv-home/homepod" },
    { label: "HomePod mini", path: "/tv-home/homepod-mini" },
    { label: "Apple TV+ Streaming", path: "/tv-home/tvplus" },
  ],
  Entertainment: [
    { label: "Apple TV+", path: "/entertainment/tvplus" },
    { label: "Apple Music", path: "/entertainment/music" },
    { label: "Apple Arcade", path: "/entertainment/arcade" },
    { label: "Apple Fitness+", path: "/entertainment/fitness" },
  ],
  Accessories: [
    { label: "Shop All Accessories", path: "/accessories/all" },
    { label: "Mac Accessories", path: "/accessories/mac" },
    { label: "iPad Accessories", path: "/accessories/ipad" },
    { label: "iPhone Accessories", path: "/accessories/iphone" },
    { label: "Watch Accessories", path: "/accessories/watch" },
  ],
  Support: [
    { label: "iPhone Support", path: "/support/iphone" },
    { label: "Mac Support", path: "/support/mac" },
    { label: "iPad Support", path: "/support/ipad" },
    { label: "Watch Support", path: "/support/watch" },
    { label: "Contact Support", path: "/support/contact" },
  ],
};

const AppleNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownMenuKey, setDropdownMenuKey] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = React.useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const mouseLeaveTimeoutRef = useRef<number | null>(null);

  const handleMenuMouseEnter = (key: string) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (mouseLeaveTimeoutRef.current !== null) {
      window.clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }
    setDropdownMenuKey(key);
    setIsDropdownOpen(true);
  };

  const handleNavMouseLeave = () => {
    mouseLeaveTimeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // Click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      if (mouseLeaveTimeoutRef.current !== null) window.clearTimeout(mouseLeaveTimeoutRef.current);
    };
  }, []);

  // Control body overflow for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (menuKey: string) => {
    setActiveMobileMenu(menuKey);
  };

  return (
    <div ref={navRef} style={{ width: '100vw' }} onMouseLeave={handleNavMouseLeave}>
      {/* Mobile header */}
      <div className="md:hidden flex w-screen items-center justify-between h-12 px-2 bg-black">
        <Link to="/" className="h-12 w-11 flex items-center">
          <svg width="22" height="26" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0729 6.26726C12.9825 6.33855 11.3458 7.21353 11.3458 9.17609C11.3458 11.4551 13.4441 12.2398 13.5 12.2398C13.4888 12.2856 13.1823 13.3784 12.3979 14.4939C11.7042 15.4695 10.9767 16.4451 9.85126 16.4451C8.77047 16.4451 8.42813 15.8056 7.16798 15.8056C5.9636 15.8056 5.48878 16.4451 4.50774 16.4451C3.38233 16.4451 2.59938 15.4237 1.87818 14.4481C1.04168 13.3096 0.316239 11.5638 0.316239 9.9054C0.316239 7.18268 1.99461 5.7502 3.62725 5.7502C4.66381 5.7502 5.53454 6.44508 6.19401 6.44508C6.81924 6.44508 7.77908 5.7502 8.95072 5.7502C9.35883 5.7502 11.0697 5.7959 12.2414 7.3919C12.168 7.43785 13.0729 6.26726 13.0729 6.26726ZM9.14123 4.24802C9.64879 3.65271 10.0011 2.81345 10.0011 1.97419C10.0011 1.85695 9.98991 1.73971 9.97867 1.64829C9.19571 1.67114 8.25707 2.15135 7.67607 2.80049C7.20125 3.30654 6.76039 4.14579 6.76039 4.99664C6.76039 5.12546 6.78282 5.25428 6.78282 5.28871C6.83854 5.3001 6.92879 5.31148 7.01904 5.31148C7.7291 5.31148 8.60546 4.86559 9.14123 4.24802Z" fill="white"/>
          </svg>
        </Link>
        <button
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="rounded focus:outline-none"
          onClick={() => {
            setIsMobileMenuOpen(o => !o);
            if (!isMobileMenuOpen) {
              setActiveMobileMenu(null); // Reset active menu when opening
            }
          }}
        >
          {isMobileMenuOpen
            ? <X size={28} className="text-zinc-200" />
            : <Menu size={28} className="text-zinc-200" />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`
          fixed top-0 left-0 z-[99999] w-screen h-screen bg-[#18181b] transition-all duration-300
          ${isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-98'}
          flex md:hidden
        `}
        style={{
          backdropFilter: isMobileMenuOpen ? "blur(2px)" : undefined,
          transition: 'opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.33s cubic-bezier(.4,0,.2,1)'
        }}
      >
        {!activeMobileMenu && (
          <button
            className="absolute top-7 right-7 z-10"
            aria-label="Close Menu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={34} className="text-zinc-200" />
          </button>
        )}
        
        {!activeMobileMenu && (
          <ScrollArea className="w-full h-full px-8 py-10">
            <nav className="flex flex-col items-start justify-center w-full select-none">
              <ul className="w-full flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <button
                      type="button"
                      className="text-zinc-100 font-normal text-[2.1rem] leading-tight tracking-tight block py-[0.15em] px-2 hover:opacity-85 transition-opacity w-full text-left"
                      style={{
                        fontWeight: 400,
                        letterSpacing: '-0.011em',
                        wordBreak: "break-word"
                      }}
                      onClick={() => handleMobileNavClick(link.title)}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        )}

        {activeMobileMenu && (
          <MobileMenuSubpanel
            open={!!activeMobileMenu}
            menuLabel={activeMobileMenu}
            items={activeMobileMenu ? mobileSubmenus[activeMobileMenu] : []}
            onClose={() => setIsMobileMenuOpen(false)}
            onBack={() => setActiveMobileMenu(null)}
            hideCloseButton={false}  // Show both Back and Close buttons inside submenu
          />
        )}
      </div>

      <NavContainer>
        <NavContent>
          <LogoLink to="/">
            <AppleIcon />
          </LogoLink>
          <NavList>
            {navLinks.map((link) => (
              <NavItem
                key={link.title}
                onMouseEnter={() => handleMenuMouseEnter(link.title)}
              >
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
        </NavContent>
      </NavContainer>

      <AppleMegaDropdown
        visible={isDropdownOpen}
        menuKey={dropdownMenuKey}
      />
    </div>
  );
};

export default AppleNavbar;
