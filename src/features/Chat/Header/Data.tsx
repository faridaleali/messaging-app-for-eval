import React from "react";
import { Text, View } from "react-native";

import { useLastMessageTime } from "../../../hooks/useLastMessageTime";

function Data() {
  const lastMessageTime = useLastMessageTime();

  return (
    <View className="flex-col items-start justify-center gap-0.5 bg-transparent shrink">
      <Text className="text-lg font-semibold text-white">Agustin Levin</Text>

      <Text className="text-sm text-white/90">Últ vez. {lastMessageTime}</Text>
    </View>
  );
}

export default React.memo(Data);
