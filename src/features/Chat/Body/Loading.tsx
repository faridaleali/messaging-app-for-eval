import React from "react";
import { ActivityIndicator, ImageBackground, Text } from "react-native";

function Loading() {
  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      className="flex-1 w-full items-center justify-center gap-2"
      resizeMode="repeat"
    >
      <ActivityIndicator size="large" color="#083045" />

      <Text className="text-gray-700">Cargando...</Text>
    </ImageBackground>
  );
}

export default React.memo(Loading);
