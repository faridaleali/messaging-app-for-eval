import { useCallback } from "react";
import { BaseError } from "../api/errors/BaseError";
import { useError } from "../components/ErrorProvider/ErrorProvider";

export const useErrorHandler = () => {
  const { showError, hideError } = useError();

  const handleError = useCallback(
    (error: unknown, customTitle?: string) => {
      if (error instanceof BaseError) {
        showError({
          title: customTitle || "Error",
          message:
            error.message ||
            "Ha ocurrido un error en la comunicación con el servidor",
          code: error.status,
        });
      } else if (error instanceof Error) {
        showError({
          title: customTitle || "Error",
          message: error.message || "Ha ocurrido un error inesperado",
        });
      } else {
        showError({
          title: customTitle || "Error",
          message:
            "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.",
        });
      }
    },
    [showError],
  );

  const handleApiError = useCallback(
    (error: unknown) => {
      handleError(error, "Error de conexión");
    },
    [handleError],
  );

  return { handleError, handleApiError, showError, hideError };
};
