const ApiErrorInterface = {
    validationError: "validationError",
    unauthorized: "unauthorized",
    forbidden: "forbidden",
    notFound: "notFound",
    serverError: "serverError",
    networkError: "networkError",
    unknownError: "unknownError",
} as const


export const ApiErrors = {
    [ApiErrorInterface.validationError] : "VALIDATION_ERROR",
    [ApiErrorInterface.unauthorized]: "UNAUTHORIZED",
    [ApiErrorInterface.forbidden]: "FORBIDDEN",
    [ApiErrorInterface.notFound]: "NOT_FOUND",
    [ApiErrorInterface.serverError]: "SERVER_ERROR",
    [ApiErrorInterface.networkError]: "NETWORK_ERROR",
    [ApiErrorInterface.unknownError]: "UNKNOWN_ERROR",
} as const


export const ApiErrorMessages = {
    [ApiErrorInterface.validationError]: "Validation failed",
    [ApiErrorInterface.unauthorized]: "Session expired. Please sign in again.",
    [ApiErrorInterface.forbidden]: "You do not have access to this action",
    [ApiErrorInterface.notFound]: "Requested resource was not found.",
    [ApiErrorInterface.serverError]: "Server error. Please try again later.",
    [ApiErrorInterface.networkError]: "Network error. Please check your internet connection.",
    [ApiErrorInterface.unknownError]: "Something went wrong.",
}

