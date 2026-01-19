import { store } from "../../../../../redux/store";

export const authInterceptor = async (config: any) => {
  // No establecer Content-Type para FormData, Axios lo maneja automáticamente
  const isFormData = config.data instanceof FormData;

  if (!config || (!config.headers["Content-Type"] && !isFormData)) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  // Si es FormData, eliminar Content-Type para que Axios agregue el boundary
  if (isFormData && config.headers["Content-Type"]) {
    delete config.headers["Content-Type"];
  }

  // Obtener token del store de Redux
  const token = store.getState().globalStatus.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
