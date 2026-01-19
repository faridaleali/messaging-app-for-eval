import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SendMessageResponse } from "../../../api/domain/chat/chat.types";
import {
  ActionSheet,
  ActionSheetOption,
} from "../../../components/ActionSheet/ActionSheet";
import {
  CameraModal,
  CapturedPhoto,
} from "../../../components/CameraModal/CameraModal";
import { Icon } from "../../../components/Icon/Icon";
import { useImagePicker } from "../../../hooks/useImagePicker";
import { useSendImageMessage } from "../../../hooks/useSendImage";
import { setAddEvent, setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Send from "./Send";

function Footer() {
  const insets = useSafeAreaInsets();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const dispatch = useAppDispatch();

  const message = useAppSelector(getMessageInput);

  const { selectedImage, clearImage, takePhoto } = useImagePicker();
  const { mutate: sendImage, isPending: isSendingImage } =
    useSendImageMessage();

  const onChangeText = useCallback((text: string) => {
    dispatch(setMessageInput(text));
  }, []);

  const handleSendImage = useCallback(
    (imageData: { uri: string; name: string; size: number }) => {
      sendImage(
        {
          imageUri: imageData.uri,
          imageName: imageData.name,
          imageSize: imageData.size,
        },
        {
          onSuccess: (response: SendMessageResponse) => {
            dispatch(setAddEvent(response.data));
            clearImage();
          },
          onError: () => {
            const errorMsg = "No se pudo enviar la imagen";
            if (Platform.OS === "web") {
              window.alert(errorMsg);
            } else {
              Alert.alert("Error", errorMsg);
            }
            clearImage();
          },
        },
      );
    },
    [sendImage, clearImage, dispatch],
  );

  const handleOpenCamera = useCallback(() => {
    setIsActionSheetVisible(false);
    // Pequeño delay para cerrar el ActionSheet primero
    setTimeout(() => {
      setIsCameraVisible(true);
    }, 300);
  }, []);

  const handleCloseCamera = useCallback(() => {
    setIsCameraVisible(false);
  }, []);

  const handleCapturePhoto = useCallback(
    (photo: CapturedPhoto) => {
      handleSendImage(photo);
    },
    [handleSendImage],
  );

  // Fallback para web (expo-camera no funciona en web)
  const handleTakePhotoFallback = useCallback(async () => {
    const photo = await takePhoto();
    if (photo) {
      handleSendImage(photo);
    }
  }, [takePhoto, handleSendImage]);

  const actionSheetOptions: ActionSheetOption[] = useMemo(
    () => [
      {
        label: "Cámara",
        icon: "camera",
        onPress:
          Platform.OS === "web" ? handleTakePhotoFallback : handleOpenCamera,
        disabled: false,
      },
      {
        label: "Fototeca",
        icon: "photo.on.rectangle",
        disabled: true,
      },
      {
        label: "Archivo",
        icon: "doc",
        disabled: true,
      },
      {
        label: "Audio",
        icon: "mic",
        disabled: true,
      },
    ],
    [handleOpenCamera, handleTakePhotoFallback],
  );

  const openActionSheet = useCallback(() => {
    setIsActionSheetVisible(true);
  }, []);

  const closeActionSheet = useCallback(() => {
    setIsActionSheetVisible(false);
  }, []);

  return (
    <View
      className="border-t border-gray-300 w-full px-4 py-3 min-h-[70px] bg-white"
      style={{ paddingBottom: insets.bottom }}
    >
      {selectedImage && (
        <View className="mb-2.5 relative self-start">
          <Image
            source={{ uri: selectedImage.uri }}
            className="w-20 h-20 rounded-lg"
          />
          <TouchableOpacity
            className="absolute -top-2 -right-2 bg-primary-500 rounded-xl"
            onPress={clearImage}
          >
            <Icon name="xmark.circle.fill" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={openActionSheet}
          className="p-1"
          disabled={isSendingImage}
        >
          <Icon
            name="plus.circle.fill"
            size={28}
            color={isSendingImage ? "#ccc" : "#083045"}
          />
        </TouchableOpacity>

        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base bg-white min-h-[44px] max-h-28"
          value={message}
          onChangeText={onChangeText}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="gray"
          multiline
          numberOfLines={4}
          maxLength={1000}
          textAlignVertical="top"
          scrollEnabled={true}
        />

        <Send />
      </View>

      <ActionSheet
        visible={isActionSheetVisible}
        onClose={closeActionSheet}
        options={actionSheetOptions}
        title="Adjuntar"
      />

      {/* Modal de cámara usando expo-camera */}
      {Platform.OS !== "web" && (
        <CameraModal
          visible={isCameraVisible}
          onClose={handleCloseCamera}
          onCapture={handleCapturePhoto}
        />
      )}
    </View>
  );
}

export default React.memo(Footer);
