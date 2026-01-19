import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import logoSource from "../../assets/images/logo_chatter_color_2.png";

function Splash() {
  return (
    <View className="flex-1 bg-primary-500 items-center justify-center">
      <Image
        source={logoSource}
        className="w-3/5 max-h-24"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" className="mt-8" />
    </View>
  );
}

export default React.memo(Splash);
