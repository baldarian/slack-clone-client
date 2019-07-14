import styled from 'styled-components';
import { space } from 'styled-system';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
padding: 30px;
background-color: #fff;
border: 1px solid #e6e6e6
max-width: 350px;
width: 100%;
text-align: center;

${space}
`;

export const Logo = styled.img`
  width: 50% !important;
`;

export const BlueButton = styled(Button)`
  background: ${props => props.theme.colors.blue} !important;
  color: #fff !important;
`;

export const BlueLink = styled(Link)`
  font-weight: bold;
`;
