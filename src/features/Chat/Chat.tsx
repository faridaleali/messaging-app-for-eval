import { useCallback, useLayoutEffect } from "react";
import { View } from "react-native";

import { Message } from "../../api/domain/chat/chat.types";
import Paginated from "../../api/types/paginated";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../constants/pagination";
import { useGetEvents } from "../../hooks/useGetEvents";
import { setChatEvents, setChatPagination } from "../../redux/chat";
import { useAppDispatch } from "../../redux/hooks";
import Body from "./Body/Body";
import Loading from "./Body/Loading";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Chat() {
  const { mutate: getEvents, isPending } = useGetEvents();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    getEvents({ limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET }, { onSuccess });
  }, []);

  const onSuccess = useCallback((data: Paginated<Message>) => {
    const { elements, ...pagination } = data;

    dispatch(setChatEvents(elements));
    dispatch(setChatPagination(pagination));
  }, []);

  return (
    <View className="flex-1">
      <Header />

      {!isPending ? <Body /> : <Loading />}

      <Footer />
    </View>
  );
}
