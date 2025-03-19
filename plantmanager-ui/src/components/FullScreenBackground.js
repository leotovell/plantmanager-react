import React from "react";
import { Container } from "react-bootstrap";

const FullScreenBackground = ({ image, children }) => {
  return (
    <Container
      fluid
      style={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Container
        fluid
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          zIndex: 1,
        }}
      ></Container>

      <Container
        fluid
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </Container>
    </Container>
  );
};

export default FullScreenBackground;
