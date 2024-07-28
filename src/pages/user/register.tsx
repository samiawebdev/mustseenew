import { useState } from "react";

import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "@/utils/api";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = RouterOutputs["account"]["getAll"][0];

const Register = () => {

    const router = useRouter();

    const { data: sessionData } = useSession();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const { data: users, refetch: refetchUsers } = api.account.getAll.useQuery(
        undefined, // no input
        {
            enabled: sessionData?.user !== undefined,

            //   onSuccess: (data) => {
            //  setCurrentUser(currentUser ?? data[0] ?? null);
            //   },

        },
    );



    const createUser = api.account.create.useMutation({
        onSuccess: async(res) => {
            // let sess = useSession();
            // await sess?.update(res);
            setCurrentUser(res);
            void refetchUsers();
            toast.success('Votre compte a bien été créé', {duration: 10000});
            router.push('/auth/signin');
        },
    });

    const handleCreateUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        let form = document.querySelector('#ms-cuf') as HTMLFormElement;

        let values = [...document.querySelectorAll('.grow')] as HTMLFormElement[] ;

        console.log(values);

        if (values != undefined && values.length > 0) {
            createUser.mutate({username: values[0]!.value.toString(), email: values[1]!.value.toString(), password: values[2]!.value.toString() });  
        }

    };

    return (
        <>
            <h2 className="p-6">Je crée mon compte MustSee</h2>

            <form id="ms-cuf" onSubmit={(e) => handleCreateUserSubmit(e)} className="grid gap-2">

                <label className="input input-bordered flex items-center gap-2 bg-zinc-900 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Nom d'utilisateur" required />
                </label>

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
                    <input type="text" className="grow" placeholder="E-mail" required />
                </label>

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
                    <input type="password" className="grow" placeholder="mot de passe" required />
                </label>

              <button type='submit' className="p-4 mt-1 btn btn-outline bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white border-none">Valider</button>
            </form>


        </>
    )
}

export default Register
