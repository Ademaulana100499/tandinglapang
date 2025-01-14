import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
export const Navbar = () => {
  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
