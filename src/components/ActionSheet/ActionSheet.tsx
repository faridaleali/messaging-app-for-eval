import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../Icon/Icon";

export interface ActionSheetOption {
  label: string;
  icon: string;
  onPress?: () => void;
  disabled?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  options: ActionSheetOption[];
  title?: string;
}

export function ActionSheet({
  visible,
  onClose,
  options,
  title,
}: ActionSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end">
          <TouchableWithoutFeedback>
            <View
              className="bg-white rounded-t-2xl p-4"
              style={{ paddingBottom: insets.bottom + 16 }}
            >
              {title && (
                <Text className="text-base font-semibold text-center mb-4 text-gray-500">
                  {title}
                </Text>
              )}

              <View className="flex-row flex-wrap justify-start gap-4 mb-5">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`items-center w-20 ${option.disabled ? "opacity-50" : ""}`}
                    onPress={() => {
                      if (!option.disabled && option.onPress) {
                        option.onPress();
                        onClose();
                      }
                    }}
                    disabled={option.disabled}
                    activeOpacity={option.disabled ? 1 : 0.7}
                  >
                    <View
                      className={`w-14 h-14 rounded-full justify-center items-center mb-2 ${
                        option.disabled ? "bg-gray-200" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        name={option.icon}
                        size={24}
                        color={option.disabled ? "#999" : "#083045"}
                      />
                    </View>
                    <Text
                      className={`text-xs text-center ${
                        option.disabled ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                className="bg-gray-100 p-4 rounded-xl items-center"
                onPress={onClose}
              >
                <Text className="text-base font-semibold text-primary-500">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
