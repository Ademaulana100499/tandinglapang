const handleFormLogin = async () => {
  try {
    const response = await handleLogin(formData);
    console.log(response);
    const token = response.data.data.token;

    // Simpan token di cookie
    setCookie("token", token);

    // Kirim token ke server API (jika diperlukan)
    await fetch("/api/store-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    Swal.fire({
      title: response.data.message,
      icon: "success",
      draggable: true,
    });
    router.push("/");
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Email or Password is incorrect!",
      icon: "error",
      draggable: true,
    });
  }
};
