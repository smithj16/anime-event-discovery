// components/withAuth.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/slices/userSlice";
import { LoadingScreen } from "../shared/components/UI/LoadingScreen";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAuthenticated = useSelector((state) => state.user.token !== null);

    useEffect(() => {
      const authenticateUser = async () => {
        try {
          const token = localStorage.getItem("jwt");

          // Send the token to the backend for verification
          const response = await axios.post("/api/auth/verify", { token });

          const { newToken, userData } = response.data;

          // Update localStorage and Redux store with new token and user data
          localStorage.setItem("jwt", newToken);
          dispatch(setUserInfo({ account: userData, token: newToken }));

          setLoading(false);
        } catch (err) {
          console.error("Authentication error:", err);
          setError(err);
          setLoading(false);
          router.push("/login");
        }
      };

      authenticateUser();
    }, [dispatch, router]);

    if (loading) {
      return <LoadingScreen/>;
    }

    if (!isAuthenticated || error) {
      router.push("/login")
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
