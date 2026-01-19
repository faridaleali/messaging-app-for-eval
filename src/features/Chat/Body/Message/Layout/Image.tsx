import React, { useCallback, useState } from "react";
import {
  Image as RNImage,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { config } from "../../../../../api/config";
import { ImageViewer } from "../../../../../components/ImageViewer/ImageViewer";
import { getChatEventPropertyById } from "../../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../../redux/hooks";
import { getMessageTextColor } from "../../../../../utils/getMessageTextColor";
import { useMessageContext } from "../Provider";

const MAX_HEIGHT = 200;
const MIN_WIDTH = 150;
const MIN_HEIGHT = 120;

function ImageMessage() {
  const ctx = useMessageContext();
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  // Usar useWindowDimensions para que sea responsivo
  const { width: windowWidth } = useWindowDimensions();
  const imageWidth = Math.min(windowWidth * 0.55, 280);

  const imageUrl = useAppSelector(getChatEventPropertyById(ctx.id, "imageUrl"));
  const text = useAppSelector(getChatEventPropertyById(ctx.id, "text"));
  const isAutoResponse = useAppSelector(
    getChatEventPropertyById(ctx.id, "isAutoResponse"),
  );

  const isReceived = !!isAutoResponse;
  const color = getMessageTextColor(isReceived);

  const fullImageUrl = imageUrl ? `${config.socketUrl}${imageUrl}` : "";

  const handleOpenViewer = useCallback(() => {
    setIsViewerVisible(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setIsViewerVisible(false);
  }, []);

  return (
    <View className="w-full">
      {fullImageUrl ? (
        <>
          <TouchableOpacity onPress={handleOpenViewer} activeOpacity={0.9}>
            <RNImage
              source={{ uri: fullImageUrl }}
              className="rounded-lg bg-gray-100"
              style={{
                width: imageWidth,
                minWidth: MIN_WIDTH,
                height: MAX_HEIGHT,
                minHeight: MIN_HEIGHT,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <ImageViewer
            visible={isViewerVisible}
            imageUrl={fullImageUrl}
            onClose={handleCloseViewer}
          />
        </>
      ) : null}

      {text ? (
        <Text className="mt-2" style={{ color }}>
          {text}
        </Text>
      ) : null}
    </View>
  );
}

export default React.memo(ImageMessage);
