import { useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const UsersAdminManager = () => {
    //define constants
    const router = useRouter();
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("");
    const [emailToUpdate, setEmailToUpdate] = useState("");
    const [passwordToUpdate, setPasswordToUpdate] = useState("");
    const [userId, setUserId] = useState("");
    const [userIdToUpdate, setUserIdToUpdate] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState("");

    //define functions
    const fetchAllUsers = api.account.getAllUsers.useQuery();
    const fetchOneUser = api.account.getOne.useQuery({ id: userId });

    const createUserMutation = api.account.create.useMutation();
    const updateUserMutation = api.account.updateUser.useMutation();
    const deleteUserMutation = api.account.deleteUser.useMutation();

    //define handlers
    const handleCreateUser = async () => {
        try {
            await createUserMutation.mutateAsync({
                username: name,
                email: email,
                password
            });
            setName("");
            setEmail("");
            setPassword("");
            fetchAllUsers.refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updateUserMutation.mutateAsync({
                id: userIdToUpdate,
                name: nameToUpdate,
                email: emailToUpdate,
            });
            setNameToUpdate("");
            setEmailToUpdate("");
            setUserIdToUpdate("");
            fetchAllUsers.refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUserMutation.mutateAsync({
                id: userIdToDelete,
            });
            setUserIdToDelete("");
            fetchAllUsers.refetch();
        } catch (error) {
            console.log(error);
        }
    };

    //return an empty div
    if (status === "authenticated") {
    if (session.user.name === "Admin") {
        
    
    return (
<>
        <div className="grid align-middle items-center place-content-center text-3xl font-semibold w-screen mx-auto p-10"><h1>Gestion des Membres</h1></div>
         

        <div className="w-[84dvw] mx-auto p-8">
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Lister tous les Membres</h2>
            </div>
            <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 mb-2 text-lg"
                onClick={() => fetchAllUsers.refetch()}
            >
                Lister tous les Membres
            </button>
            {/* <div className="overflow-x-auto w-fit px-10 ms-10 md:ms-0 md:px-40"> */}
            <div className="h-96 overflow-x-auto mb-4">
                <table className="table table-pin-rows table-pin-cols bg-slate-950">

                    <thead className="bg-zinc-950 text-white">
                        <tr className="text-red-100 bg-zinc-950">
                            <th className="p-6 bg-zinc-950 text-red-100">Id</th>
                            <th className="p-6 bg-zinc-950 text-red-100">Name</th>
                            <th className="p-6 bg-zinc-950 text-red-100">Email</th>
                            <th className="p-6 bg-zinc-950 text-red-100">Password</th>

                        </tr>
                    </thead>


                    <tbody>
                        {fetchAllUsers.data &&
                            fetchAllUsers.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className=""
                                >
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}


                    </tbody>
                    <tfoot>
                        <tr className="bg-zinc-950 text-red-100">
                            {/* <th  className="p-6"></th> */}
                            <th className="bg-zinc-950 text-red-100">Id</th>
                            <th className="bg-zinc-950 text-red-100">Nom</th>
                            <th className="bg-zinc-950 text-red-100">E-mail</th>
                            <th className="bg-zinc-950 text-red-100">Password</th>
                            {/* <th  className="p-6"></th> */}
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/* </div> */}
            {/* {fetchAllUsers.data &&
        fetchAllUsers.data.map((user) => (
          <div
            key={user.id}
            className="my-4 grid grid-cols-4 gap-4 rounded border border-gray-300 bg-zinc-900 p-4 shadow"
          >
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        ))} */}
            <div className="divider divider-info"></div>
            {/* Get one user UI */}

            <div className="mb-8 mt-10">
                <h2 className="mb-4 text-xl font-bold">Rechercher un Membre</h2>
                <div className="mb-4 flex">
                    <input
                        className="mr-2 input input-bordered input-error p-2 bg-zinc-950 text-white"
                        placeholder="Saisir l'ID d'un membres"
                        value={userId || ""}
                        onChange={(e) => setUserId(String(e.target.value))}
                    />
                    <button
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 text-lg"
                        onClick={() => fetchOneUser.refetch()}
                    >
                        Rechercher un Membre
                    </button>
                </div>
                {fetchOneUser.data && (
                    <div>
                        <p>Name: {fetchOneUser.data.name}</p>
                        <p>Email: {fetchOneUser.data.email}</p>
                    </div>
                )}
            </div>

            <div className="divider divider-info"></div>

            {/* Create User */}
            <div className="my-10">
                <h2 className="mb-4 text-xl font-bold">Créer un Nouveau Membre</h2>
                <div className="mb-4 flex">
                    <input
                        className="mr-2 w-1/3 input input-bordered input-error p-2 bg-zinc-950 text-white"
                        placeholder="Nom d'utilisateur"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-1/3 input input-bordered input-error p-2 mr-2 bg-zinc-950 text-white"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-1/3 input input-bordered input-error p-2 bg-zinc-950 text-white"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 text-lg"
                    onClick={handleCreateUser}
                >
                    Créer un Nouveau Membre
                </button>
            </div>

            <div className="divider divider-info"></div>

            {/* Update User */}
            <div className="my-10">
                <h2 className="mb-4 text-xl font-bold">Modifier un Membre</h2>
                <div className="mb-4 flex">
                    <input
                        className="w-1/3 mr-2 input input-bordered input-error p-2 bg-zinc-950 text-white"
                        placeholder="Nom d'utilisateur à modifier"
                        value={nameToUpdate}
                        onChange={(e) => setNameToUpdate(e.target.value)}
                    />
                    <input
                        className="w-1/3 input input-bordered input-error p-2 mr-2 bg-zinc-950 text-white"
                        placeholder="E-mail à modifier"
                        value={emailToUpdate}
                        onChange={(e) => setEmailToUpdate(e.target.value)}
                    />
                    <input
                        placeholder="ID à modifier"
                        className="w-1/3 mr-2 input input-bordered input-error p-2 bg-zinc-950 text-white"
                        value={userIdToUpdate}
                        onChange={(e) => setUserIdToUpdate(e.target.value)}
                    />
                </div>

                <button
                    className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 text-lg"
                    onClick={handleUpdateUser}
                >
                    Mettre à jour
                </button>
            </div>

            <div className="divider divider-info"></div>

            {/* Delete User */}

            <div className="my-10">
                <h2 className="mb-4 text-xl font-bold">Supprimer un Membre</h2>
                <input
                    placeholder="Saisir un ID "
                    className="mr-2 input input-bordered input-error p-2 bg-zinc-950 text-white"
                    value={userIdToDelete}
                    onChange={(e) => setUserIdToDelete(e.target.value)}
                />
                <button
                    className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 text-lg"
                    onClick={handleDeleteUser}
                >
                    Supprimer le Membre
                </button>
            </div>
        </div>
        </>
    );
     return router.replace("/");
    
}
return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
        <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
    </a>  
}
}

export default UsersAdminManager
