import React from "react";
import { View } from "react-native";
import { RootProps } from "./types";

function Root(props: RootProps) {
  const { isReceived, children } = props;

  return (
    <View
      className={`items-start gap-1 py-2 rounded-xl max-w-[80%] min-w-[35%] px-1.5 ${
        isReceived ? "bg-primary-100 self-start" : "bg-primary-500 self-end"
      }`}
    >
      {children}
    </View>
  );
}

export default React.memo(Root);
