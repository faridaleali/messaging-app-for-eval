import { Text as RNText, type TextProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

const typeClasses = {
  small: "text-xs",
  default: "text-base leading-6",
  defaultItalic: "text-sm italic",
  defaultSemiBold: "text-base leading-6 font-semibold",
  title: "text-3xl font-bold leading-8",
  subtitle: "text-lg font-bold",
  link: "text-base leading-8 text-[#0a7ea4]",
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: keyof typeof typeClasses;
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps & { className?: string }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <RNText
      className={`${typeClasses[type]} ${className || ""}`}
      style={[{ color }, style]}
      {...rest}
    />
  );
}
