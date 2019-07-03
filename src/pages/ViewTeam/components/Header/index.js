import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  padding-top: 10px;
`;

const ChannelName = styled.h3`
  text-align: center;
`;

const Header = ({ channelName }) => (
  <HeaderWrapper>
    <ChannelName>{channelName}</ChannelName>
  </HeaderWrapper>
);

export default Header;
