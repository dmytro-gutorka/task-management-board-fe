export type SnackbarVariant = "success" | "error" | "info" | "warning";

export type ShowSnackbarParams = {
    message: string;
    variant?: SnackbarVariant;
};

export type SnackbarHandler = (params: ShowSnackbarParams) => void;

export type SnackbarState = {
    open: boolean;
    message: string;
    variant: SnackbarVariant;
};
