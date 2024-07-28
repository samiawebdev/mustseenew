import Head from "next/head";
import HTML from "next";
import Navbar from "./NavBar"
import SideBar from "./SideBar"
import Footer from "./Footer"
import Fab from "../design/Fab"
import CookieAccept from "@/_components/main-layout/CookieAccept";

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <>
      {/* <html lang="fr" data-theme="dark" className="dark"> */}
        <Head>
          <meta charSet="UTF-8" />
          <title>Must See</title>
          <meta name="description" content="Blog sur le must du cinéma" />
          <link rel="icon" type="image/svg+xml" href="/assets/svg/mustsee.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        </Head>
        {/* <body> */}
          <section>
            <header>
              <Navbar />
            </header>
            <SideBar />

            <main className="flex min-h-screen flex-col items-center justify-center relative">
              <div className="container flex flex-col items-center justify-center gap-12 px-8 pb-16">{children}</div>
            </main>
            <Footer />
            <Fab />
            <CookieAccept />

          </section>
        {/* </body> */}
      {/* </html> */}
    </>
  )
}
export default Layout