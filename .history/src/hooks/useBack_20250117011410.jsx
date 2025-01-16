import React from "react";

export const useBack = () => {
  const goBack = () => {
    window.history.back();
  };
  return { goBack };
};
