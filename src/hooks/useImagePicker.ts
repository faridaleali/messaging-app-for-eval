import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";

export interface SelectedImage {
  uri: string;
  name: string;
  size: number;
}

const showAlert = (title: string, message: string) => {
  if (Platform.OS === "web") {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );

  const pickImage = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      showAlert(
        "Permiso requerido",
        "Necesitamos acceso a tus fotos para enviar imágenes",
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const image: SelectedImage = {
        uri: asset.uri,
        name: asset.fileName || `image_${Date.now()}.jpg`,
        size: asset.fileSize || 0,
      };
      setSelectedImage(image);
      return image;
    }

    return null;
  }, []);

  const takePhoto = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      showAlert(
        "Permiso requerido",
        "Necesitamos acceso a la cámara para tomar fotos",
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const image: SelectedImage = {
        uri: asset.uri,
        name: asset.fileName || `photo_${Date.now()}.jpg`,
        size: asset.fileSize || 0,
      };
      setSelectedImage(image);
      return image;
    }

    return null;
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return { selectedImage, pickImage, takePhoto, clearImage };
};
