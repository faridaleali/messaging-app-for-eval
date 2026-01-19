import { RootState } from "../store";

export const getToken = (state: RootState) => state.globalStatus.token;

export const getUser = (state: RootState) => state.globalStatus.user;

export const getIsAuthenticated = (state: RootState) =>
  !!state.globalStatus.token;
