import { PropsWithChildren, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/useColorSchemeWeb";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import { ThemedView } from "../ThemedView/ThemedView";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        className="flex-row items-center gap-1.5"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Icon
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />
        <Text type="defaultSemiBold">{title}</Text>
      </TouchableOpacity>
      {isOpen && <View className="mt-1.5 ml-6">{children}</View>}
    </ThemedView>
  );
}
