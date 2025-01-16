const handleFormLogin = async () => {
  if (!formData.email || !formData.password) {
    console.error("Email or password cannot be empty");
    return;
  }

  try {
    const res = await axios.post("/api/authentication/ssrlogin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data && res.data.data && res.data.data.token) {
      setCookie("token", res.data.data.token);
      router.push("/");
    } else {
      console.error("Token not found in response");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
