import { useSnackbar, OptionsObject, ProviderContext, SnackbarKey } from "notistack";
import { useCallback } from "react";
import { Fade } from "@mui/material";

interface Position {
  vertical?: "top" | "button";
  horizontal?: "left" | "right";
}

interface CustomSnackInterface extends ProviderContext {
  error: (message: string, position?: Position) => SnackbarKey;
  warning: (message: string, position?: Position) => SnackbarKey;
  info: (message: string, position?: Position) => SnackbarKey;
  success: (message: string, position?: Position) => SnackbarKey;
}

const useCustomSnackbar = (): CustomSnackInterface => {
  const { enqueueSnackbar, ...rest } = useSnackbar();

  const options: OptionsObject = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    autoHideDuration: 2000,
    // TransitionComponent: Fade,
  };

  const error = useCallback(
    (message: string, position?: Position) =>
      enqueueSnackbar(message, { ...options, variant: "error" }),
    []
  );
  const warning = useCallback(
    (message: string, position?: Position) =>
      enqueueSnackbar(message, { ...options, variant: "warning" }),
    []
  );
  const info = useCallback(
    (message: string, position?: Position) =>
      enqueueSnackbar(message, { ...options, variant: "info" }),
    []
  );
  const success = useCallback(
    (message: string, position?: Position) =>
      enqueueSnackbar(message, { ...options, variant: "success" }),
    []
  );

  return {
    ...rest,
    enqueueSnackbar,
    error,
    info,
    warning,
    success,
  };
};

export default useCustomSnackbar;
