import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  View,
} from "react-native";
import { Message } from "../../../api/domain/chat/chat.types";
import Paginated from "../../../api/types/paginated";
import { DEFAULT_LIMIT } from "../../../constants/pagination";
import { useGetEvents } from "../../../hooks/useGetEvents";
import {
  appendChatEvents,
  setChatPagination,
  setLoadingMore,
} from "../../../redux/chat";
import {
  getChatEvents,
  getChatPagination,
  getIsLoadingMore,
} from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import MessageComponent from "./Message/Message";

function Body() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(getChatEvents);
  const pagination = useAppSelector(getChatPagination);
  const isLoadingMore = useAppSelector(getIsLoadingMore);
  const { mutate: getEvents } = useGetEvents();

  const sortedMessages = useMemo(
    () =>
      Object.values(events || {}).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [events],
  );

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !pagination?.hasNextPage) {
      return;
    }

    dispatch(setLoadingMore(true));

    const nextOffset = (pagination?.nextPage ?? 0) * DEFAULT_LIMIT;

    getEvents(
      { limit: DEFAULT_LIMIT, offset: nextOffset },
      {
        onSuccess: (data: Paginated<Message>) => {
          const { elements, ...paginationData } = data;
          dispatch(appendChatEvents(elements));
          dispatch(setChatPagination(paginationData));
          dispatch(setLoadingMore(false));
        },
        onError: () => {
          dispatch(setLoadingMore(false));
        },
      },
    );
  }, [isLoadingMore, pagination, dispatch, getEvents]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#083045" />
      </View>
    );
  }, [isLoadingMore]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageComponent key={item.id} id={item.id} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Message) => item.id.toString(), []);

  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <FlatList
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          flexDirection: "column",
          gap: 8,
          flexGrow: 1,
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
        inverted
        overScrollMode="never"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={undefined}
      />
    </ImageBackground>
  );
}

export default React.memo(Body);
