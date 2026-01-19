import React, { useCallback } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "../../../components/Icon/Icon";
import { useLogout } from "../../../hooks/useLogout";
import Avatar from "./Avatar";
import Data from "./Data";

function Header() {
  const insets = useSafeAreaInsets();
  const { logout } = useLogout();

  const handleLogout = useCallback(() => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("¿Estás seguro que deseas salir?");
      if (confirmed) {
        logout();
      }
    } else {
      Alert.alert("Cerrar sesión", "¿Estás seguro que deseas salir?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", style: "destructive", onPress: logout },
      ]);
    }
  }, [logout]);

  return (
    <View
      className="flex-row items-center gap-4 w-full bg-primary-500 px-4 py-2"
      style={{ paddingTop: insets.top + 8, minHeight: 80 + insets.top }}
    >
      <Avatar />

      <Data />

      <View className="flex-1" />

      <TouchableOpacity onPress={handleLogout} className="p-2">
        <Icon
          name="rectangle.portrait.and.arrow.right"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Header);
