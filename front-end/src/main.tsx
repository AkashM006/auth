import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiErrorResponse } from "./Types/Response.ts";
import toastConfig from "./utils/ToastConfig.ts";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const requestError = error as ApiErrorResponse;
      if (requestError.response?.status === 401) {
        queryClient.setQueryData(["token"], null);
        const result = queryClient.getQueryState(["token"]);
        if (result?.dataUpdateCount !== 1) {
          toast("Session expired", toastConfig);
        }
        queryClient.setQueryDefaults(["token"], {
          enabled: false,
        });
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
