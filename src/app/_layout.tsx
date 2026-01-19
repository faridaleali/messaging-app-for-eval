import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../../global.css";
import { HttpStatusCode } from "../api/baseRepositories/api/http/constants";
import { BaseError } from "../api/errors/BaseError";
import {
  ErrorProvider,
  useError,
} from "../components/ErrorProvider/ErrorProvider";
import { useColorScheme } from "../hooks/useColorSchemeWeb";
import { store } from "../redux/store";
import { TokenStorage } from "../services/storage/tokenStorage";
import SocketProvider from "./socketProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: 1,
    },
  },
});

function AppContent() {
  const colorScheme = useColorScheme();
  const { showError } = useError();

  const clearStorage = useCallback(async () => {
    await TokenStorage.clearAll();
    store.dispatch({ type: "reset" });
  }, []);

  useEffect(() => {
    queryClient.setDefaultOptions({
      mutations: {
        onError: (e) => {
          const error = e as BaseError;
          if (error?.status === HttpStatusCode.UNAUTHORIZED) {
            clearStorage();
            return;
          }
          showError({
            title: "Error",
            message: error?.message || "Ha ocurrido un error inesperado",
            code: error?.status,
          });
        },
      },
    });
  }, [showError, clearStorage]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SocketProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorProvider>
          <AppContent />
        </ErrorProvider>
      </QueryClientProvider>
    </Provider>
  );
}
