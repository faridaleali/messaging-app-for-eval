import { Message } from "../../api/domain/chat/chat.types";
import { Pagination } from "../../api/types/paginated";

export interface ChatsSlice {
  chatEvents?: Record<string, Message>;

  pagination?: Pagination;

  messageInput?: string;

  isLoadingMore?: boolean;
}
