import { useCallback } from "react";
import { logout } from "../redux/global";
import { useAppDispatch } from "../redux/hooks";
import { TokenStorage } from "../services/storage/tokenStorage";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    await TokenStorage.clearAll();
    dispatch(logout());
  }, [dispatch]);

  return { logout: handleLogout };
};
