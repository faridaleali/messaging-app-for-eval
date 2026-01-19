import { Platform } from "react-native";

const BASE_URL = "http://192.168.100.37:3000";

const getApiUrl = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000/api";
  }
  if (Platform.OS === "web") {
    return "http://localhost:3000/api";
  }
  return `${BASE_URL}/api`;
};

const getSocketUrl = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  }
  return BASE_URL;
};

export const config = {
  apiUrl: getApiUrl(),
  socketUrl: getSocketUrl(),
};
