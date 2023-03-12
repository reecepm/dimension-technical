import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import localfont from "next/font/local";
import { Toaster } from "sonner";

const gtWalsheim = localfont({
  src: [
    {
      path: "font/GTWalsheimPro-Regular.woff2",
      weight: "400",
    },
    {
      path: "font/GTWalsheimPro-Medium.woff2",
      weight: "500",
    },
    {
      path: "font/GTWalsheimPro-Bold.woff2",
      weight: "700",
    },
    {
      path: "font/GTWalsheimPro-Black.woff2",
      weight: "900",
    },
    {
      path: "font/GTWalsheimPro-Light.woff2",
      weight: "300",
    },
    {
      path: "font/GTWalsheimPro-Thin.woff2",
      weight: "100",
    },
  ],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`${gtWalsheim.className} flex min-h-screen flex-col items-center justify-center bg-white`}
    >
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
