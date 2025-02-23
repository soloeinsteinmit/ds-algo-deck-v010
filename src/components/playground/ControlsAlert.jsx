import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ControlsAlert({ message, isError, isVisible, onHide }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 10000); // Hide after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-center ${
            isError ? "text-danger" : "text-success"
          } whitespace-pre-line mx-auto text-center `}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default ControlsAlert;
