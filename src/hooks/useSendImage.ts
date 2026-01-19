import { useCallback } from "react";
import ChatService from "../api/domain/chat/chat.service";
import useQuery from "./useQuery";

const chatService = new ChatService();

export interface SendImageParams {
  imageUri: string;
  imageName: string;
  imageSize: number;
}

export const useSendImageMessage = () => {
  const send = useCallback(async (params: SendImageParams) => {
    return chatService.sendImageMessage(
      params.imageUri,
      params.imageName,
      params.imageSize,
    );
  }, []);

  return useQuery({ fetchFn: send });
};
