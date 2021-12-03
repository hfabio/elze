import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ color }) => (color ? color : "blue")};
  color: ${({ fontColor }) => (fontColor ? fontColor : "black")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "16px")};
  border-radius: 16px;
`;

export const Header = styled.header`
  margin: 10vh 0 10vh;
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw 0;
`;

export const PageTitle = styled.h1`
  font-size: 56px;
  width: 100vw;
  height: 5vh;
  padding-top: 5px;
  display: inline-block;
  text-align: center;
`;

export const NotaDeRodape = styled.span`
  position: fixed;
  bottom: 0;
  left: 0;
  color: #939292;
`;