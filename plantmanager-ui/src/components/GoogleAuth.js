import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleAuth = () => {
  const nav = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/auth/google-auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            credential: credentialResponse.credential,
            client_id: process.env.REACT_APP_G_CLIENT_ID,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("Login Successful", data);
        toast.success("Successfully logged in.");
        nav("/features");
      } else {
        console.error("Error:", data.error);
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Request failed", error);
      toast.error("Login Failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.error("Login Failed");
      }}
    />
  );
};

export default GoogleAuth;
