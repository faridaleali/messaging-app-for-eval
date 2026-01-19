import Chat from "../features/Chat/Chat";
import Login from "../features/Login/Login";
import Splash from "../features/Splash/Splash";
import { useAuthInit } from "../hooks/useAuthInit";
import { getIsAuthenticated } from "../redux/global/global.selector";
import { useAppSelector } from "../redux/hooks";

export default function HomeScreen() {
  const { isLoading } = useAuthInit();
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  // Mostrar Splash mientras verifica el token
  if (isLoading) {
    return <Splash />;
  }

  if (isAuthenticated) {
    return <Chat />;
  }

  return <Login />;
}
