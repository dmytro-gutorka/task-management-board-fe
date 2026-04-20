import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/app/mui-theme/theme.ts";
import { queryClient } from "@/app/query-client";
import { router } from "@/app/routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
