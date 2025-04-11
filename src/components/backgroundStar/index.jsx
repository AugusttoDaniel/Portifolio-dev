import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

function StarField() {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const animationRef = useRef(0);
  const starsRef = useRef([]);

  // Initialize stars
  useEffect(() => {
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 10000) + 30;
    const initialStars = [];

    for (let i = 0; i < starCount; i++) {
      initialStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.2 + 0.1,
        connections: [],
      });
    }

    setStars(initialStars);
    starsRef.current = initialStars;

    // Handle window resize
    const handleResize = () => {
      const updatedStars = starsRef.current.map((star) => ({
        ...star,
        x: star.x % window.innerWidth,
        y: star.y % window.innerHeight,
      }));

      starsRef.current = updatedStars;
      setStars(updatedStars);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || stars.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update star positions directly in the ref (not state)
      starsRef.current = starsRef.current.map((star) => ({
        ...star,
        y: (star.y + star.speed) % canvas.height,
      }));

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle ="#ffffff";
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.5;

      starsRef.current.forEach((star) => {
        star.connections.forEach((connectedId) => {
          const connectedStar = starsRef.current.find((s) => s.id === connectedId);
          if (connectedStar) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(connectedStar.x, connectedStar.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [stars]);

  // Handle click on stars

  return <StyledCanvas ref={canvasRef} />;
}

function StarConstellation() {
  return (
    <Container>
      <StarField />
    </Container>
  );
}

export default StarConstellation;