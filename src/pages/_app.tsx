import "@/styles/globals.css";
import "@/styles/fab.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { Toaster } from "react-hot-toast";
import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

// import "@/styles/globals.css";
// import '@/styles/fab.css';
 import Layout from "@/_components/main-layout/layout";
// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    
    <SessionProvider session={session}>
      <Layout>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
      <Toaster position="top-center" />
      </Layout>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
