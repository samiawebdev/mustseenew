import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next"
  import { getCsrfToken } from "next-auth/react"
  
  export default function SignIn({
     csrfToken,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
        <div className="flex w-96 h-60 items-center mx-auto">
            <img src="/assets/svg/mustsee.svg" alt="brand logo" className="mx-auto" />
        </div>

<form action="/api/auth/callback/credentials" method="POST" className="grid gap-2">
<input type="hidden" name="csrfToken" defaultValue={csrfToken} />
<div>
    <label className="input input-bordered flex items-center gap-2 bg-zinc-900 text-white" htmlFor="input-username-for-credentials-provider">
    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
        
    <input name="username" id="input-username-for-credentials-provider" type="text" placeholder="Nom d'utilisateur" aria-label="Nom d'utilisateur" required />
        
        </label>
    </div><div>
    <label className="input input-bordered flex items-center gap-2 bg-zinc-900 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input name="email" type="email" className="grow" placeholder="E-mail" required />
                </label>
        </div><div>
    <label className="input input-bordered flex items-center gap-2 bg-zinc-900 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input name="password" type="password" className="grow" placeholder="mot de passe" required />
    </label>
            </div>
            <button type='submit' className="p-4 mt-1 btn btn-outline bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white border-none">Se connecter</button>
</form>
            <div className="flex w-96 h-60 items-center mx-auto gap-4">
              <h4>Pas encore inscrit ?</h4>
              <a href="/user/register"><button type="button" className="p-4 mt-1 btn btn-outline bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white border-none">Créer un Compte</button></a>
            </div>
</>
    )
  }
  
  export async function getServerSideProps(context: GetServerSidePropsContext) {

    return {
      props: {
        csrfToken: await getCsrfToken(context),
        // redirect: { destination: "/" }
      },
    }
  }