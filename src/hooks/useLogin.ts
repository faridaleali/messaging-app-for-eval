import { useMutation } from "@tanstack/react-query";
import AuthService from "../api/domain/auth/auth.service";
import { LoginRequest } from "../api/domain/auth/auth.types";
import { setToken, setUser } from "../redux/global";
import { useAppDispatch } from "../redux/hooks";
import { TokenStorage } from "../services/storage/tokenStorage";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const authService = new AuthService();
      const response = await authService.login(credentials);

      // Guardar en AsyncStorage
      await TokenStorage.setToken(response.token);
      await TokenStorage.setUser(response.user);

      // Guardar en Redux
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));

      return response;
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
