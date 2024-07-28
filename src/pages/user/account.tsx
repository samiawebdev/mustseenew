import { useState } from "react";

import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "@/utils/api";

type User = RouterOutputs["account"]["me"][0];

const Profile = () => {

    const { data: sessionData, status } = useSession();


    const getProfile = api.account.me.useQuery(
        undefined, // no input
        {
            enabled: sessionData?.user !== undefined,

            //   onSuccess: (data) => {
            //  setCurrentUser(currentUser ?? data[0] ?? null);
            //   },

        });

    const profile = getProfile?.data ? getProfile?.data[0] : null;
    console.log("profile :", profile);



if (status === 'authenticated') {
    return (
        <>
            {/* {profile ?

                <div className="card card-side bg-base-100 shadow-xl w-96 h-60">
                    <figure className="w-fit h-fit pt-8">
                        {profile.image == null ?

                            <div className="avatar p-6">
                                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                    <div className="skeleton h-32 w-32"></div>
                                </div>
                            </div>

                            :

                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                    <img src={profile.image} alt="Profil" />
                                </div>
                            </div>

                        }
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{profile.name}</h2>
                        <p>{profile.email}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Mon compte</button>
                        </div>
                    </div>
                </div>

                : <h1>Pas de données</h1>
            } */}

<div className="flex w-fit lg:ps-6 scale-75 flex-col xl:flex-row">
<div className="join join-vertical lg:join-horizontal">

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-blue-950 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Mon compte</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-blue-950 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="/user/likes-and-comments/likes" className="self-center"> <h2 className="card-title">Mes Favoris</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-blue-950 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Mes Commentaires</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>

<div className="card bg-blue-950 hover:bg-white w-96 join-item min-h-48  text-white hover:text-blue-950">
  <div className="card-body align-middle justify-center h-full">
   <a href="#/" className="self-center"> <h2 className="card-title">Mes Bonus</h2> </a>
  </div>
</div>

<div className="divider lg:divider-horizontal">|</div>


</div>
</div>

        </>
    )
}
return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
          <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
        </a>

}

export default Profile
