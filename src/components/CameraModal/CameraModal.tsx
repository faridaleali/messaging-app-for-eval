import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color } from "../../constants/colors";
import { Icon } from "../Icon/Icon";

export interface CapturedPhoto {
  uri: string;
  name: string;
  size: number;
}

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onCapture: (photo: CapturedPhoto) => void;
}

export function CameraModal({ visible, onClose, onCapture }: CameraModalProps) {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [isCapturing, setIsCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo?.uri) {
        onCapture({
          uri: photo.uri,
          name: `photo_${Date.now()}.jpg`,
          size: 0, // expo-camera no provee size directamente
        });
        onClose();
      }
    } catch (error) {
      console.error("Error al capturar foto:", error);
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing, onCapture, onClose]);

  const toggleFacing = useCallback(() => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }, []);

  // Si no tenemos permiso, mostramos pantalla de solicitud
  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide" statusBarTranslucent>
        <View className="flex-1 justify-center items-center bg-white p-6 gap-4">
          <ActivityIndicator size="large" color={Color.PRIMARY_500} />
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" statusBarTranslucent>
        <View
          className="flex-1 justify-center items-center bg-white p-6 gap-4"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          <Icon name="camera" size={64} color={Color.PRIMARY_500} />
          <Text className="text-2xl font-bold text-gray-800 mt-4">
            Acceso a la cámara
          </Text>
          <Text className="text-base text-gray-500 text-center">
            Necesitamos tu permiso para usar la cámara
          </Text>
          <TouchableOpacity
            className="bg-primary-500 py-3.5 px-8 rounded-xl mt-4"
            onPress={requestPermission}
          >
            <Text className="text-white text-base font-semibold">
              Dar permiso
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 px-6" onPress={onClose}>
            <Text className="text-gray-500 text-base">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1, width: "100%", height: "100%" }}
          facing={facing}
        >
          {/* Header con botón cerrar */}
          <View
            className="absolute top-0 left-0 right-0 px-4 z-10"
            style={{ paddingTop: insets.top + 10 }}
          >
            <TouchableOpacity
              onPress={onClose}
              className="w-11 h-11 rounded-full bg-black/50 justify-center items-center"
            >
              <Icon name="xmark" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Footer con controles */}
          <View
            className="absolute bottom-0 left-0 right-0 px-4"
            style={{ paddingBottom: insets.bottom + 20 }}
          >
            <View className="flex-row justify-between items-center">
              {/* Espaciador izquierdo */}
              <View className="w-[50px] h-[50px] justify-center items-center" />

              {/* Botón de captura */}
              <TouchableOpacity
                className="w-[72px] h-[72px] rounded-full bg-white justify-center items-center border-4 border-white/50"
                onPress={handleCapture}
                disabled={isCapturing}
              >
                {isCapturing ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <View className="w-[58px] h-[58px] rounded-full bg-white" />
                )}
              </TouchableOpacity>

              {/* Botón rotar cámara */}
              <TouchableOpacity
                className="w-[50px] h-[50px] justify-center items-center"
                onPress={toggleFacing}
              >
                <Icon
                  name="arrow.triangle.2.circlepath"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}
