import { format } from "date-fns";
import React from "react";
import { Text, View } from "react-native";

import { getMessageTextColor } from "../../utils/getMessageTextColor";
import { Icon } from "../Icon/Icon";
import { BottomComposerProps } from "./types";

function BottomComposer(props: BottomComposerProps) {
  const { icon, timestamp, isReceived } = props;

  const textColor = getMessageTextColor(isReceived);
  const time = format(timestamp, "HH:mm");

  return (
    <View className="flex-row items-center gap-0.5 self-end">
      <Text className="text-xs" style={{ color: textColor }}>
        {time}
      </Text>
      <Icon name={icon} size={16} color={textColor} />
    </View>
  );
}

export default React.memo(BottomComposer);
