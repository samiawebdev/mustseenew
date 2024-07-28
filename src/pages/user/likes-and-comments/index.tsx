import React,{ useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api, RouterOutputs } from "@/utils/api";
 
 type LandCResults = RouterOutputs['likesAndComments']['getAll'];
 
 const LikesAndCommentsGrid = () => {

  const uidata: LandCResults  = []; 
  const userSession = useSession();
  // const [likesAndComments, setLikesAndComments] = useState<LandCResults | any>([]);

  // useEffect(() => {
  //  fecthLikesAndComments().then(data => {return data?.data}).then(data => setLikesAndComments(data)).catch(err => console.log(err))
  // }, [])

// const fecthLikesAndComments = async (event?: any) => {
//     if (event) {
//         event.preventDefault()
//     }

//     const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
//         params: {
//             api_key: API_KEY,
//             query: searchKey,
//             language: `${LANGUAGE_FR}`

//         }
//     });

const fecthLikesAndComments = async (event?: any) => {
  if (event) {
      event.preventDefault()
  }
  
  const data  = api.likesAndComments.getAll.useQuery(
     undefined,
    {
        enabled: userSession?.data?.user?.id ? true : false


        //   onSuccess: (data) => {
        //  setCurrentUser(currentUser ?? data[0] ?? null);
        //   },
      
    },

);

    
    // console.log("Likes ans Com :",data.data);
    if (data?.data != undefined && data?.data.length > 0) {
      // void setLikesAndComments(data?.data);
      console.log("Likes :", data);
      // setLikesAndComments(data);
      data.data.map((elt) => uidata.push(elt));
      return data;
    }

    // if (data.results.length) {
    //     await fetchMovie(data.results[0].id)
    // }
    return null;
}
//  fecthLikesAndComments();

if (uidata.length == 0 ) {
  fecthLikesAndComments();
}else{
  console.log( "LC: ", uidata)
}

if (userSession.status === "authenticated") {
   return (
    
<>

<div className="overflow-x-auto w-screen px-10 ms-10 md:ms-0 md:px-40">
  <table className="table table-xs md:table-lg bg-slate-950">
    {/* head */}
    <thead>
      <tr>
        {/* <th  className="p-6">
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
        <th  className="p-6">Média</th>
        <th  className="p-6">Like</th>
        <th  className="p-6">Commentaire</th>
        <th  className="p-6">Actions</th>
        <th  className="p-6"></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
      {uidata && uidata.map((elt) => {

return(
<tr>
{/* <th  className="p-6">
  <label>
    <input type="checkbox" className="checkbox" />
  </label>
</th> */}
<td>
  <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        <img
          src={elt.Likes.at(2)?.Movies.PosterUrl!}
          alt="Avatar Tailwind CSS Component" />
      </div>
    </div>
    <div>
      <div className="font-bold">{elt.Likes.at(2)?.Movies.title}</div>
      <div className="text-sm opacity-50">{elt.Likes.at(2)?.Movies.MovieType}</div>
    </div>
  </div>
</td>
<td>
  {elt.Likes.at(2)?.isLike ? "J'aime" : "Je n'aime pas" ?? ''}
  <br />
  <span className="badge badge-ghost badge-sm">icône ici</span>
</td>
<td>{elt.posts?.at(1)?.comment.trim()}</td>
<th  className="p-6">
  {/* <button className="btn btn-ghost btn-xs">details</button> */}
    <button className="btn btn-primary me-2" onClick={async(e) => await fecthLikesAndComments(e)}>Like</button>
    <button className="btn btn-secondary">Commentaire</button>
</th>
</tr>
)
      })
      

      
      }


    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        {/* <th  className="p-6"></th> */}
        <th  className="p-6">Média</th>
        <th  className="p-6">Like</th>
        <th  className="p-6">Commentaire</th>
        <th  className="p-12">Actions</th>
        {/* <th  className="p-6"></th> */}
      </tr>
    </tfoot>
  </table>
</div>




     </>
   )}
   return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
   <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
 </a>
 }
 
 export default LikesAndCommentsGrid
 