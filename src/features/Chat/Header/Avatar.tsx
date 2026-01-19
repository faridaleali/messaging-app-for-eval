import React from "react";
import { Image, View } from "react-native";

function Avatar() {
  return (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "transparent",
      }}
    >
      <Image
        source={require("../../../assets/images/chat-avatar.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
}

export default React.memo(Avatar);
