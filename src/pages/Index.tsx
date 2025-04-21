
import React from 'react';
import AppleNavbar from '@/components/AppleNavbar';
import MacbookHero from '@/components/MacbookHero';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: white;
`;

const AirSection = styled.section`
  background-color: #f5f5f7;
  width: 100%;
`;

const Index = () => {
  return (
    <PageContainer>
      <AppleNavbar />
      <MacbookHero variant="pro" />
      <AirSection>
        <MacbookHero variant="air" />
      </AirSection>
    </PageContainer>
  );
};

export default Index;
