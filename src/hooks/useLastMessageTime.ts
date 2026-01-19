import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import { getChatEvents } from "../redux/chat/chat.selector";
import { useAppSelector } from "../redux/hooks";

export function useLastMessageTime(): string {
  const events = useAppSelector(getChatEvents);

  return useMemo(() => {
    if (!events || Object.keys(events).length === 0) {
      return "Sin mensajes";
    }

    const messages = Object.values(events);
    const latestMessage = messages.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    });

    const messageDate = new Date(latestMessage.timestamp);
    const today = new Date();

    if (messageDate.toDateString() === today.toDateString()) {
      return `hoy ${format(messageDate, "HH:mm")} hs.`;
    }

    return format(messageDate, "dd/MM HH:mm", { locale: es }) + " hs.";
  }, [events]);
}
