import { signIn, signOut, useSession } from "next-auth/react";

import MoviesGrid from "../../_components/design/MoviesGrid"

const Search = () => {

  const userSession = useSession();


  if (userSession.status === "authenticated") {
  return (
    <>
       <MoviesGrid />
    </>
  )}
  return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
           <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
         </a>
}

export default Search
