import React, { useMemo } from "react";

import { View } from "react-native";
import * as MessageView from "../../../../components/MessageView/MessageView";
import { getChatEventPropertyById } from "../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../redux/hooks";
import ImageMessage from "./Layout/Image";
import Regular from "./Layout/Regular";
import { MessageProvider } from "./Provider";
import { MessageProps } from "./types";

function Message(props: MessageProps) {
  const { id } = props;

  const isAutoResponse = useAppSelector(
    getChatEventPropertyById(id, "isAutoResponse"),
  );

  const timestamp = useAppSelector(getChatEventPropertyById(id, "timestamp"));

  const messageType = useAppSelector(getChatEventPropertyById(id, "type"));

  const isReceived = !!isAutoResponse;

  const timestampDate = useMemo(
    () => new Date(timestamp ?? Date.now()),
    [timestamp],
  ); // Mejora de performance guardando el dato co n useMemo

  return (
    <MessageProvider id={id}>
      <MessageView.Root isReceived={isReceived}>
        <View className="px-1.5 w-full content-start">
          {messageType === "image" ? <ImageMessage /> : <Regular />}
        </View>

        <MessageView.BottomComposer
          icon={"check.fill"}
          isReceived={isReceived}
          timestamp={timestampDate}
        />
      </MessageView.Root>
    </MessageProvider>
  );
}

export default React.memo(Message);
