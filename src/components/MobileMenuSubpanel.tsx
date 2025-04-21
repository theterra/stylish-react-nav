
import React from "react";
import { X, ChevronLeft } from "lucide-react";
import styled from "styled-components";

type SubmenuItem = {
  label: string;
  path?: string;
};

interface MobileMenuSubpanelProps {
  open: boolean;
  menuLabel: string;
  items: SubmenuItem[];
  onClose: () => void;
  onBack: () => void;
  hideCloseButton?: boolean;
}

const SubpanelContainer = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: #18181b;
  transition: all 0.3s;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 24px 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #e4e4e7;
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #e4e4e7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptySpace = styled.div`
  width: 28px;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 20px;
`;

const ItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ItemLink = styled.a`
  display: block;
  font-size: 24px;
  font-weight: 500;
  color: white;
  padding: 8px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  text-decoration: none;
  word-break: break-word;

  &:hover {
    background-color: #27272a;
  }
`;

const MobileMenuSubpanel: React.FC<MobileMenuSubpanelProps> = ({
  open,
  menuLabel,
  items,
  onClose,
  onBack,
  hideCloseButton = false,
}) => {
  return (
    <SubpanelContainer open={open} aria-hidden={!open}>
      <HeaderRow>
        <BackButton aria-label="Back" onClick={onBack}>
          <ChevronLeft size={32} />
        </BackButton>
        <HeaderTitle>{menuLabel}</HeaderTitle>
        {!hideCloseButton ? (
          <CloseButton aria-label="Close menu" onClick={onClose}>
            <X size={28} />
          </CloseButton>
        ) : (
          <EmptySpace />
        )}
      </HeaderRow>
      <ContentArea>
        <ItemsList>
          {items.map((item) => (
            <li key={item.label}>
              <ItemLink href={item.path || "#"}>{item.label}</ItemLink>
            </li>
          ))}
        </ItemsList>
      </ContentArea>
    </SubpanelContainer>
  );
};

export default MobileMenuSubpanel;
