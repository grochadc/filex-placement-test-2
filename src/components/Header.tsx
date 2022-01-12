import React from "react";
import styled from "styled-components";
import Jumbotron from "react-bootstrap/Jumbotron";

const Container = styled.div`
  border: 1px dashed gray;
  height: 30vh;
  margin: 0;
`;

type HeaderProps = {
  title: string;
};
const Header = (props: HeaderProps) => {
  return (
    <Jumbotron>
      <h1>FILEX - {props.title}</h1>
    </Jumbotron>
  );
};

export default Header;
