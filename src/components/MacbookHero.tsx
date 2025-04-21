
import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 60px 20px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "SF Pro Display", "SF Pro Icons", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Subtitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  font-family: "SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const Button = styled.a<{ $primary?: boolean }>`
  background-color: ${props => props.$primary ? '#0071e3' : 'transparent'};
  color: white;
  border: none;
  border-radius: 980px;
  padding: 12px 22px;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? '#0077ed' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  margin-top: 50px;
  width: 800px;
`;

const TagLine = styled.div`
  margin-top: 50px;
  font-size: 24px;
  color: #6e6e73;
  
  span {
    color: #2997ff;
  }
`;

interface MacbookHeroProps {
  variant?: 'pro' | 'air';
}

const MacbookHero: React.FC<MacbookHeroProps> = ({ variant = 'pro' }) => {
  if (variant === 'air') {
    return (
      <HeroContainer style={{ backgroundColor: '#f5f5f7' }}>
        <Title style={{ color: '#1d1d1f' }}>MacBook Air</Title>
        <Subtitle style={{ color: '#1d1d1f' }}>Sky blue color.</Subtitle>
        <ButtonContainer>
          <Button $primary href="#">Learn more</Button>
          <Button href="#">Buy</Button>
        </ButtonContainer>
      </HeroContainer>
    );
  }
  
  return (
    <HeroContainer>
      <Title>MacBook Pro</Title>
      <Subtitle>A work of smart.</Subtitle>
      <ButtonContainer>
        <Button $primary href="#">Learn more</Button>
        <Button href="#">Buy</Button>
      </ButtonContainer>
      <ProductImage src="/lovable-uploads/f36e5e10-a9ef-49aa-837d-e9f9d6bca9f3.png" alt="MacBook Pro" />
      <TagLine>Built for <span>Apple Intelligence</span>.</TagLine>
    </HeroContainer>
  );
};

export default MacbookHero;
