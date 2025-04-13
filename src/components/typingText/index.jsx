import React, { useEffect, useState } from "react";

const TypingText = ({ content, speed = 50 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content, speed]);

  return (
    <span dangerouslySetInnerHTML={{ __html: displayed }} style={{ whiteSpace: "pre-wrap" }} />
  );
};

export default TypingText;
