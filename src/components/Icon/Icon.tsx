// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, keyof typeof MaterialIcons.glyphMap>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chat.fill": "chat",
  "settings.fill": "settings",
  "check.fill": "check",
  "send.fill": "send",
  photo: "photo",
  "photo.fill": "photo",
  "xmark.circle.fill": "cancel",
  "rectangle.portrait.and.arrow.right": "logout",
  // Nuevos íconos para Action Sheet y cámara
  "plus.circle.fill": "add-circle",
  camera: "camera-alt",
  "photo.on.rectangle": "photo-library",
  doc: "description",
  mic: "mic",
  xmark: "close",
  "exclamationmark.triangle.fill": "warning",
  "arrow.triangle.2.circlepath": "flip-camera-android",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
