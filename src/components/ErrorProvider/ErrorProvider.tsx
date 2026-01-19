import React, { createContext, useCallback, useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../Icon/Icon";

interface ErrorInfo {
  title: string;
  message: string;
  code?: string | number;
}

interface ErrorContextType {
  showError: (error: ErrorInfo) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}

interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const showError = useCallback((errorInfo: ErrorInfo) => {
    setError(errorInfo);
    setVisible(true);
  }, []);

  const hideError = useCallback(() => {
    setVisible(false);
    setTimeout(() => setError(null), 300);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hideError}
        statusBarTranslucent
      >
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <View
            className="bg-white rounded-2xl p-6 w-full max-w-[340px] items-center shadow-lg"
            style={{
              marginTop: insets.top + 20,
              marginBottom: insets.bottom + 20,
            }}
          >
            <View className="w-18 h-18 rounded-full bg-red-500 justify-center items-center mb-4">
              <Icon
                name="exclamationmark.triangle.fill"
                size={40}
                color="#fff"
              />
            </View>

            <Text className="text-xl font-bold text-gray-800 text-center mb-2">
              {error?.title || "Error"}
            </Text>

            <Text className="text-base text-gray-500 text-center leading-6 mb-2">
              {error?.message || "Ha ocurrido un error inesperado"}
            </Text>

            {error?.code && (
              <Text className="text-xs text-gray-400 text-center mb-4">
                Código: {error.code}
              </Text>
            )}

            <TouchableOpacity
              className="bg-primary-500 py-3 px-8 rounded-lg mt-2 min-w-[120px]"
              onPress={hideError}
              activeOpacity={0.8}
            >
              <Text className="text-white text-base font-semibold text-center">
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ErrorContext.Provider>
  );
}
