
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileMenuSubpanel from "./MobileMenuSubpanel";
import AppleMegaDropdown from './AppleMegaDropdown';
import { ScrollArea } from './ui/scroll-area';

type NavLink = { title: string; path: string };

type NavigationModuleProps = {
  navLinks: NavLink[],
  mobileSubmenus: Record<string, Array<{ label: string; path?: string }>>
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
    <div ref={navRef} style={{ width: '100vw' }} onMouseLeave={handleNavMouseLeave}>
      {/* Mobile header */}
      <div className="md:hidden flex w-screen items-center justify-between h-12 px-2 bg-black">
        <Link to="/" className="h-12 w-11 flex items-center">
          <AppleIcon />
        </Link>
        <button
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="rounded focus:outline-none"
          onClick={() => {
            setIsMobileMenuOpen((o) => !o);
            if (!isMobileMenuOpen) {
              setActiveMobileMenu(null);
            }
          }}
        >
          {isMobileMenuOpen
            ? <X size={28} className="text-zinc-200" />
            : <Menu size={28} className="text-zinc-200" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
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
            hideCloseButton={false}
          />
        )}
      </div>

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

