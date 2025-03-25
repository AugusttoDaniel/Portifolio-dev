import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

// Mova o componente estilizado para fora do componente funcional
const Container = styled.div`
  position: absolute;
  bottom: 10px; // Distância do fundo da tela
  left: 50%; // Centraliza horizontalmente
  transform: translateX(-50%); // Ajusta a posição para o centro
  z-index: 100; // Garante que fique acima de outros elementos
  cursor: pointer; // Muda o cursor para indicar que é clicável
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ScrollIndicator() {
  return (
    <Container>
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3], 
          y: [0, 10, 0], 
        }}
        transition={{
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut", 
          repeatType: "loop",
          repeatDelay: 0.5,
        }}
      >
        <ChevronDown size={40} className="text-white" />
      </motion.div>
    </Container>
  );
}