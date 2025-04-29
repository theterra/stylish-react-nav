import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileMenuSubpanel from "./MobileMenuSubpanel";
import AppleMegaDropdown from './AppleMegaDropdown';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '../hooks/use-mobile';

type NavLink = { title: string; path: string };

type NavigationModuleProps = {
  navLinks: NavLink[],
  mobileSubmenus: Record<string, Array<{ label: string; path?: string }>}
};

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

const NavLinkStyled = styled(Link)`
  color: #f5f5f7;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  font-family: "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f5f5f7;
    opacity: 0;
    transform: scaleX(0);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  
  &:hover:after {
    opacity: 0.8;
    transform: scaleX(1);
  }
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

const MobileMenuDrawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  background: #18181b;
  transition: opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.33s cubic-bezier(.4,0,.2,1);
  display: flex;
  opacity: ${({ open }) => open ? 1 : 0};
  pointer-events: ${({ open }) => open ? 'auto' : 'none'};
  transform: ${({ open }) => open ? 'scale(1)' : 'scale(0.98)'};
  backdrop-filter: ${({ open }) => open ? "blur(2px)" : "none"};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 8px 0 2px;
    background: #000;
  }
`;

const ScrollAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 44px 0 0 0;
`;

const MobileNav = styled.nav`
  width: 100%;
`;

const MobileMenuList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 34px;
  margin: 0;
  list-style: none;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #f2f2f2;
  font-size: 2.1rem;
  font-weight: 400;
  text-align: left;
  padding: 0.2em 0.5em 0.2em 0.2em;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.18s;
  &:hover {
    opacity: 0.85;
  }
`;

const MobileMenuCloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
`;

const MobileIconButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavigationModule: React.FC<NavigationModuleProps> = ({
  navLinks,
  mobileSubmenus
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownMenuKey, setDropdownMenuKey] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const mouseLeaveTimeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

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

  const handleNavMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect && (e.clientX < navRect.left || e.clientX > navRect.right || e.clientY < navRect.top || e.clientY > navRect.bottom)) {
      setIsDropdownOpen(false);
      setDropdownMenuKey(null);
    }
  };

  // Listen for the custom close event
  useEffect(() => {
    const handleCloseDropdown = () => {
      setIsDropdownOpen(false);
      setDropdownMenuKey(null);
    };
    
    document.addEventListener('close-mega-dropdown', handleCloseDropdown);
    return () => {
      document.removeEventListener('close-mega-dropdown', handleCloseDropdown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      if (mouseLeaveTimeoutRef.current !== null) window.clearTimeout(mouseLeaveTimeoutRef.current);
    };
  }, []);

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
    <div ref={navRef} style={{ width: '100%' }} onMouseLeave={handleNavMouseLeave}>
      {/* Mobile header - Only visible on mobile */}
      <MobileHeader>
        <LogoLink to="/">
          <AppleIcon />
        </LogoLink>
        <MobileIconButton
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          onClick={() => {
            setIsMobileMenuOpen((o) => !o);
            if (!isMobileMenuOpen) {
              setActiveMobileMenu(null);
            }
          }}
        >
          {isMobileMenuOpen
            ? <X size={28} style={{ color: "#F5F5F7" }} />
            : <Menu size={28} style={{ color: "#F5F5F7" }} />}
        </MobileIconButton>
      </MobileHeader>

      {/* Mobile Menu Drawer - Only visible on mobile */}
      <MobileMenuDrawer open={isMobileMenuOpen}>
        {!activeMobileMenu && (
          <>
            <MobileMenuCloseBtn
              aria-label="Close Menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={34} style={{ color: "#caced6" }} />
            </MobileMenuCloseBtn>

            <ScrollArea style={{ width: "100%", height: "100%", padding: "44px 0 0 0" }}>
              <MobileNav>
                <MobileMenuList>
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <MobileMenuButton
                        type="button"
                        onClick={() => handleMobileNavClick(link.title)}
                      >
                        {link.title}
                      </MobileMenuButton>
                    </li>
                  ))}
                </MobileMenuList>
              </MobileNav>
            </ScrollArea>
          </>
        )}
        {activeMobileMenu && (
          <MobileMenuSubpanel
            open={!!activeMobileMenu}
            menuLabel={activeMobileMenu}
            items={activeMobileMenu ? mobileSubmenus[activeMobileMenu] : []}
            onClose={() => setIsMobileMenuOpen(false)}
            onBack={() => setActiveMobileMenu(null)}
            hideCloseButton={false}
          />
        )}
      </MobileMenuDrawer>

      {/* Desktop Navbar */}
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
                <NavLinkStyled to={link.path}>{link.title}</NavLinkStyled>
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

      <AppleMegaDropdown visible={isDropdownOpen} menuKey={dropdownMenuKey} />
    </div>
  );
};

export default NavigationModule;
