import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../Icon/Icon";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ImageViewerProps {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}

export function ImageViewer({ visible, imageUrl, onClose }: ImageViewerProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/95 justify-center items-center">
        <TouchableOpacity
          className="absolute right-4 z-10 p-2 bg-white/20 rounded-full"
          style={{ top: insets.top + 16 }}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Icon name="xmark" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={{ uri: imageUrl }}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.8 }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}
