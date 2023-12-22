import React, { useLayoutEffect, useRef } from "react";
import {
  checkAuthAction,
  useAppDispatch,
  useAppSelector,
} from "../../../libs/redux";
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const isCalledRef = useRef(false);

  useLayoutEffect(() => {
    if (!user && !isCalledRef.current) {
      isCalledRef.current = true;
      dispatch(checkAuthAction());
    }
  }, [dispatch, user]);

  if (user) {
    localStorage.removeItem("redirectTo");
    return children;
  }

  if (loading || !isCalledRef.current) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!user) {
    localStorage.setItem("redirectTo", location.pathname);
    return <Navigate to="/auth/login" replace />;
  }

  return null;
};

export { RequireAuth };
