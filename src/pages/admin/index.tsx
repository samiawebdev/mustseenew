import { useState } from "react";

import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "@/utils/api";

type User = RouterOutputs["account"]["me"][0];

const Admin = () => {

     const { data: sessionData, status } = useSession();


    // const getProfile = api.account.me.useQuery(
    //     undefined, // no input
    //     {
    //         enabled: sessionData?.user !== undefined,

    //         //   onSuccess: (data) => {
    //         //  setCurrentUser(currentUser ?? data[0] ?? null);
    //         //   },

    //     });

    // const profile = getProfile?.data ? getProfile?.data[0] : null;
    // console.log("profile :", profile);



if (status === 'authenticated') {
    return (
        <>

<div className="container w-fit scale-75 -translate-y-10 z-90 bg-amber-50 min-h-[50svh] max-h-[80svh] mx-auto">
    <h3 className="title text-red-800  p-6 text-2xl font-bold">Administration MustSee</h3>
    <div className="flex scale-75 sm:scale-100 -translate-y-40 sm:translate-y-0 w-75 me-8 z-20 flex-col xl:flex-row mx-auto items-center">
<div className="join join-vertical lg:join-horizontal self-center place-self-center translate-y-0 lg:translate-y-20 admin-card-wrapper">

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-red-700 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Gestion des Membres</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-amber-700 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Gestion des Roles</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-sky-700 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Gestion des Vidéos</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-teal-700 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Gestion des E-mails</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>


</div>
</div>
</div>


        </>
    )
}
return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
          <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
        </a>

}

export default Admin
