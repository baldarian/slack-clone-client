import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  padding-top: 10px;
`;

const Text = styled.h3`
  text-align: center;
`;

const Header = ({ text }) => (
  <HeaderWrapper>
    <Text>{text}</Text>
  </HeaderWrapper>
);

export default Header;
