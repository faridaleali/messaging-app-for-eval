import { PayloadAction } from "@reduxjs/toolkit";

import { Message } from "../../api/domain/chat/chat.types";
import { Pagination } from "../../api/types/paginated";
import { ChatsSlice } from "./chat.types";

export const chatReducers = {
  setChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>,
  ) => {
    if (action.payload) {
      state.chatEvents = action.payload.reduce(
        (acc, message) => {
          acc[message.id] = message;
          return acc;
        },
        {} as Record<string, Message>,
      );
    } else {
      state.chatEvents = undefined;
    }
  },

  // Agregar más mensajes a los existentes (para paginación)
  appendChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>,
  ) => {
    if (action.payload) {
      const newMessages = action.payload.reduce(
        (acc, message) => {
          acc[message.id] = message;
          return acc;
        },
        {} as Record<string, Message>,
      );

      state.chatEvents = {
        ...state.chatEvents,
        ...newMessages,
      };
    }
  },

  setChatPagination: (
    state: ChatsSlice,
    action: PayloadAction<Pagination | undefined>,
  ) => {
    state.pagination = action.payload;
  },

  setLoadingMore: (state: ChatsSlice, action: PayloadAction<boolean>) => {
    state.isLoadingMore = action.payload;
  },

  setMessageInput: (
    state: ChatsSlice,
    action: PayloadAction<string | undefined>,
  ) => {
    state.messageInput = action.payload;
  },

  setAddEvent: (state: ChatsSlice, action: PayloadAction<Message>) => {
    if (state.chatEvents) {
      state.chatEvents[action.payload.id] = action.payload;
    } else {
      state.chatEvents = { [action.payload.id]: action.payload };
    }
  },
};
