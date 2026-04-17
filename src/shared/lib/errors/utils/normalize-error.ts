import type {ApiError, ApiErrorResponse} from "@/shared/lib/errors/error.types.ts";
import {ApiErrorMessages, ApiErrors} from "@/shared/lib/errors/error.constants.ts";
import axios from 'axios';


export const normalizeError = (error: unknown): ApiError => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {

        const status = error.response?.status;
        const data = error.response?.data;

        if (!error.response)
            return {
                code: ApiErrors.networkError,
                message: ApiErrorMessages.networkError,
                originalError: error,
            };

        // TODO: 1
        // ВОТ ТУТ НЕ ОСОБО НРАВИТЬСЯ ЧТО КУЧА РАЗ (ДЛЯ КАЖДОГО СТАТУС КОДА ПО СУТИ
        // ПОВТОРЯЕТСЯ ОДНА +- СТРУКТУРА, НО ПОКА ЧТО ХЗ КАК ЭТО МОЖНО АДЕКВАТНО
        // УНИФИЦИРОВАТЬ ЧТО БЫ НЕ УБИВАТЬСЯ В ОВЕРАБСТРАКЦИИ
        if (status === 401)
            return {
                code: ApiErrors.unauthorized,
                message: data?.message || ApiErrorMessages.unauthorized,
                status,
                details: data?.errors,
                originalError: error,
            };


        if (status === 403)
            return {
                code: ApiErrors.forbidden,
                message: data?.message || ApiErrorMessages.forbidden,
                status,
                details: data?.errors,
                originalError: error,
            };


        if (status === 404)
            return {
                code: ApiErrors.notFound,
                message: data?.message || ApiErrorMessages.notFound,
                status,
                details: data?.errors,
                originalError: error,
            };


        if (status === 422 || status === 400)
            return {
                code: ApiErrors.validationError,
                message: data?.message || ApiErrorMessages.validationError,
                status,
                details: data?.errors,
                originalError: error,
            };


        if (status && status >= 500)
            return {
                code: ApiErrors.serverError,
                message: data?.message || ApiErrorMessages.serverError,
                status,
                details: data?.errors,
                originalError: error,
            };

        return {
            code: ApiErrors.unknownError,
            message: data?.message || ApiErrorMessages.unknownError,
            status,
            details: data?.errors,
            originalError: error,
        };
    }

    if (error instanceof Error)
        return {
            code: ApiErrors.unknownError,
            message: error.message || ApiErrorMessages.unknownError,
            originalError: error,
        };


    return {
        code: ApiErrors.unknownError,
        message: ApiErrorMessages.unknownError,
        originalError: error,
    };
};