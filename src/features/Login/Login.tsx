import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import logoSource from "../../assets/images/logo_chatter_color_2.png";
import { Text } from "../../components/Text/Text";
import { useLogin } from "../../hooks/useLogin";
import { setUser } from "../../redux/global";
import { useAppDispatch } from "../../redux/hooks";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginAsync, isLoading } = useLogin();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      return;
    }

    try {
      const response = await loginAsync({ username, password });
      dispatch(setUser(response.user));
      // La navegación es automática al cambiar el estado de autenticación
    } catch {
      // El error es manejado automáticamente por el ErrorProvider en _layout.tsx
    }
  };

  return (
    <View className="flex-1 bg-primary-500 items-center justify-center">
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        className="flex-1 items-center justify-center gap-4 w-full"
      >
        <View className="bg-transparent w-full flex-1 items-center justify-center gap-4 p-4">
          <Image
            source={logoSource}
            className="w-4/5 max-h-20 self-center mb-5"
            resizeMode="contain"
          />

          <TextInput
            className="bg-transparent border border-white/60 text-white rounded-lg px-4 py-3 text-base w-full h-12"
            placeholder="Nombre de usuario"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            editable={!isLoading}
          />
          <TextInput
            className="bg-transparent border border-white/60 text-white rounded-lg px-4 py-3 text-base w-full h-12"
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            textContentType="password"
            editable={!isLoading}
          />

          <TouchableOpacity
            className={`w-full items-center justify-center p-4 bg-primary-300 rounded-2xl ${isLoading ? "opacity-60" : ""}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-bold">
                Iniciar sesión
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default React.memo(Login);
