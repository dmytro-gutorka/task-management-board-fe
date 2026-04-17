import { createBrowserRouter } from "react-router-dom";

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
        {
            path: "/",
            Component: "Will be replaced with a component later",
        },
    ]);
}
