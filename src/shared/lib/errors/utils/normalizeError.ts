import type { AppError } from "@/shared/lib/errors/error.types.ts";
import { normalizeUnknownError } from "@/shared/lib/errors/utils/normalizeUnknownError.ts";
import { normalizeAxiosError } from "@/shared/lib/errors/utils/normalizeAxiosError.ts";

export function normalizeError(error: unknown): AppError {
    return normalizeAxiosError(error) ?? normalizeUnknownError(error);
}
