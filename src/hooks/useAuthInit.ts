import { useEffect, useState } from "react";
import { User } from "../api/domain/auth/auth.types";
import { setToken, setUser } from "../redux/global";
import { useAppDispatch } from "../redux/hooks";
import { TokenStorage } from "../services/storage/tokenStorage";

export const useAuthInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await TokenStorage.getToken();
        const userJson = await TokenStorage.getUser();

        if (token) {
          dispatch(setToken(token));

          if (userJson) {
            const user: User = JSON.parse(userJson);
            dispatch(setUser(user));
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  return { isLoading };
};
