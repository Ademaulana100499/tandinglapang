import React from "react";

export const useBack = () => {
  const handleButtonBack = () => {
    window.history.back();
  };
  return { handleButtonBack };
};
