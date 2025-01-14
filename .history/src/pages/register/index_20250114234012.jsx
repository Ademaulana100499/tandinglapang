import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Name" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <input type="number" placeholder="Phone Number" />
      <button>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default RegisterPage;
