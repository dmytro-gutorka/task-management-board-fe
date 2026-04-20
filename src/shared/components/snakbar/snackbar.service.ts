import type {
    ShowSnackbarParams,
    SnackbarHandler,
} from "@/shared/components/snakbar/snackbar.types.ts";
import type { Nullable } from "@/shared/types/common.ts";

let snackbarHandler: Nullable<SnackbarHandler> = null;

export const snackbarService = {
    register(handler: SnackbarHandler) {
        snackbarHandler = handler;
    },

    unregister() {
        snackbarHandler = null;
    },

    show(params: ShowSnackbarParams) {
        snackbarHandler?.(params);
    },

    error(message: string) {
        snackbarHandler?.({ message, variant: "error" });
    },

    success(message: string) {
        snackbarHandler?.({ message, variant: "success" });
    },
};
