// @ts-nocheck
import React,{ useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api, RouterOutputs } from "@/utils/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faThumbsDown, faPenToSquare, faTrashCan, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import Modalitor from "@/_components/design/Modalitor";
import {v4 as uuidv4} from 'uuid';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
type LikeResults = RouterOutputs['likesAndComments']['getAllLikes'];


const Likes = () => {
const uidata: LikeResults  = []; 

const mod: HTMLDialogElement[] = [];
const idv = uuidv4(); 
const router = useRouter();

mod.push(
<dialog id={idv} className="modal modal-top sm:modal-middle">
          <div className="modal-box">
              <h3 className="font-bold text-lg">Liker ou Disliker?</h3>
              {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
              <div className="modal-action w-fit">
                  <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}

                      <div className="flex">

                       <div className="form-control bg-red-700 text-white">
                        <button className="btn mt-4 btn-warning" onClick={(e) => onConfirmedDelete(e)} >Confirmer la suppression</button>
                       </div>

                      </div>
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                  </form>
              </div>
          </div>
      </dialog>
      );

    const userSession = useSession();
    const deletion = api.likesAndComments.deleteLike.useMutation({
      onSuccess: async(res) => {

              
        console.log("DELETE LIKE dbop result: ", res);

        const refresh = async() => router.refresh();
        // setTimeout(() => {
        //    toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
        // }, 2000 );
        toast.success('Votre Like a bien été supprimé',
        {
            style: {
                minWidth: '30svw',
              },
              duration: 10000

        })
        // toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
    },
    onError: async(res) =>{
        toast.error('Un problème est survenu. Merci de bien vouloir réessayer.', {duration: 10000});
        // router.refresh();
    }
    });
    
    const refresh = async() => router.refresh();
     
    const closeDialog = () => {

      const modalElmt = () => document.querySelectorAll('dialog').item(0);
       console.log("Modal to close :", modalElmt())
      let dialog = modalElmt();
      dialog.removeAttribute('open'); 
      dialog.setAttribute('close','true'); 
      modalElmt()?.close("close");
    }
    const forceOpenDialog = () => {

      const modalElmtToForce = () => document.querySelectorAll('dialog').item(0);
      let dialog = modalElmtToForce();
      dialog.removeAttribute('close'); 
      dialog.setAttribute('open',true); 
      console("IS FORCING DIALOG TRIAL: ", dialog);
      return dialog.showModal();

      // modalElmt()?.close("close");
    }

    const likeUpdate = api.likesAndComments.updateLike.useMutation({
      onSuccess: async(res) => {

        closeDialog();        
        console.log("UPDATE LIKE dbop result: ", res);

        // setTimeout(() => {
        //    toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
        // }, 2000 );
        toast.success('Votre Like a bien été mis à jour',
        {
            style: {
                minWidth: '30svw',
              },
              duration: 10000

        })

        const modalElmt = document.querySelector('dialog');

        //  closeDialog();
        //  return refresh();
        // toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
    },
      onError: async(res) =>{
          toast.error('Un problème est survenu. Merci de bien vouloir réessayer.', {duration: 10000});
          // router.refresh();

          
      }
    });

    const updateLikeValue = (likeId: bigint, movie: number, isLike: boolean, user: string) => {
        // event.preventDefault();
        // event.stopPropagation();
        console.log('Test UPDATE lIKE: ', parseInt(likeId.toString()), movie, !isLike, user );
         
        likeUpdate.mutate({ movieId: movie, likeId: parseInt(likeId), islike: !isLike, userId: user });
        closeDialog();
        refresh();
          
    }
    const onConfirmedDelete = (e: React.FormEvent<HTMLFormElement> , like: bigint, toastToDismissId: string) => {
      console.log('Test ON CONFIRMED DELETE lIKE: ', parseInt(like.toString()) );

      e.preventDefault();
      e.stopPropagation();
      toast.dismiss(toastToDismissId);
      return deletion.mutate({likeId: parseInt(like.toString())});
    }
    const deleteLikeValue = (event: React.FormEvent<HTMLFormElement>, likeId: bigint ) => {

        console.log('Test DELETE lIKE: ', parseInt(likeId.toString()) );
        const idv = uuidv4(); 

{/* {(() => {
           const mod: HTMLDialogElement[] = [];
           mod.push(
           <dialog id={idv} className="modal modal-top sm:modal-middle">
                     <div className="modal-box">
                         <h3 className="font-bold text-lg">Liker ou Disliker?</h3>
                         {/* <p className="py-4">Press ESC key or click the button below to close</p> }
                         <div className="modal-action w-fit">
                             <form method="dialog">
                                 {/* if there is a button in form, it will close the modal }
 
                                 <div className="flex" data-lk={likeId}>
 
                                  <div className="form-control bg-red-700 text-white">
                                   <button className="btn mt-4 btn-warning" onClick={(e) => onConfirmedDelete(e, likeId)} >Confirmer la suppression</button>
                                  </div>
 
                                 </div>
                                 <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                             </form>
                         </div>
                     </div>
                 </dialog>
                 );
                 console.log("MODAL ???????: ",mod.at(0));

                 document.body.append(mod.at(0));
                //  return mod.at(0)?.getElementsByTagNameNS('dialog')?.at(0).showModal();
                //  return mod.at(0)!.show();
})()} }


        */

        toast(
          (t) => (

                                        <form className="diag bg-red-150 ">

                                        <div className="flex">



                                        </div>
                                        <span>
              <span className="inline-block text-bold text-red-700 font-current pb-2 mb-1">Confirmer la <b>Suppression</b> ?</span>
              <button className="btn btn-error px-6 text-white rounded-sm" onClick={() => {return onConfirmedDelete(event, likeId, t.id)}}>Confirmer</button>
              <button className="btn btn-info px-6 text-white ms-2 rounded-sm" onClick={() => {toast.dismiss(t.id);}}>Annuler</button>
            </span>
            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button> */}

                                        {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button> */}
                                    </form>
          )
          ,
          {
            icon: <FontAwesomeIcon icon={faCircleExclamation} className="fa-xl text-white bg-red-700 p-1 rounded-full" />,
            style:{
              whiteSpace:true,
              width: '50svw',
              position: 'center-center',
            },
            duration: Infinity
          }
        );
          
}}

    const fecthLikesAndComments = async (event?: any) => {
        if (event) {
            event.preventDefault()
        }
        
        const data  = api.likesAndComments.getAllLikes.useQuery(
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

      
      if (uidata.length == 0 ) {
        fecthLikesAndComments();
      }else{
        console.log( "Likes New List Page: ", uidata)
      }
    const allLikes = [...uidata?.map((elt) => elt.Likes)];
    console.log( "Likes New List Page 2: ", allLikes)


    if (userSession.status === "authenticated") {    
return (
<>

{uidata.length > 0 &&
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
        <th  className="p-6">Actions</th>

      </tr>
    </thead>
    <tbody>
      
{(() => {
    const responseArray = [];
   for (let index = 0; index < allLikes.length; index++) {
    const element = allLikes[index];
    for (let index2 = 0; index2 < element?.length!; index2++) {
        const element2 = element?.at(index2)!;
        responseArray.push(
            <tr key={element2.id}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={element2?.Movies.PosterUrl! ?? '/assets/placeholders/slider.jpg'}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{element2?.Movies.title?.replace('_', ' ')}</div>
                  <div className="text-sm opacity-50">{element2?.Movies.MovieType}</div>
                </div>
              </div>
            </td>
            <td className="flex items-center gap-1">
              {element2?.isLike ? "J'aime" : "Je n'aime pas" ?? 'Non renseigné'}
              <br />

              {element2?.isLike ?
              <span className="badge badge-default badge-sm text-red-600">

              <FontAwesomeIcon icon={faHeart} className="fa-lg" />   
              </span>

              :   
              <span className="badge badge-default badge-sm text-blue-400 p-1">

              <FontAwesomeIcon icon={faThumbsDown} className="fa-xl"/>
              </span>
              ??              
              'N/A'}

            </td>
            <th  className="p-6 mx-auto">
              {/* <button className="btn btn-ghost btn-xs">details</button> */}
                {/* <button className="btn btn-primary me-2" onClick={async(e) => await updateLikeValue(e, element2.id, element2.movieId)}> */}
                {/* <button className="btn btn-primary me-2" onClick={(e) => function(){ return(<><Modalitor movie={element2.movieId} text={"Liker"} cssClass={'text-purple-300'} onClick={(e: React.FormEvent<HTMLFormElement>) => updateLikeValue(e, element2.id, element2.movieId)} /></>)}()}>
                    <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                </button> */}
                <div className="flex items-center">
                <div>



                {/* <Modalitor movie={element2.movieId} text={"Update_Like"} cssClass={'text-purple-300'} onClick={(e: React.FormEvent<HTMLFormElement>) => updateLikeValue(e, element2.id, element2.movieId, element2.isLike, element2.userId)} isLike={element2?.isLike!} /> */}
                <button className={`btn btn-primary me-2 text-purple-300`} onClick={() => document.getElementById(`lik_modal-${element2.movieId}-${index2}`)?.showModal()}>
                            <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                </button>
                <dialog id={`lik_modal-${element2.movieId}-${index2}`} className="modal modal-top sm:modal-middle text-purple-300">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Liker ou Disliker?</h3>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action w-fit">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}

                                <div className="flex" data-qpe={element2.movieId}>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text me-2 text-red-500">Liker&nbsp;&nbsp;</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-640q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14H400q-33 0-56.5-23.5T320-200v-407q0-16 6.5-30.5T344-663l217-216q15-14 35.5-17t39.5 7q19 10 27.5 28t3.5 37l-45 184h218ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640q33 0 56.5 23.5T240-560v360q0 33-23.5 56.5T160-120Z" /></svg>
                                            {(() =>
                                                
                                                {if (element2.isLike == null || element2.isLike == false ) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-red-500 ms-2 brightness-150" />

                                                    )
                                                } 
                                                if (!element2.isLike == null && element2.isLike == true) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-red-500 ms-2 brightness-150" defaultChecked />

                                                    )
                                                }}
                                            
                                             )()
                                            }
                                            </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text me-2 text-blue-500">Disliker</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-320q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14h320q33 0 56.5 23.5T640-760v407q0 16-6.5 30.5T616-297L399-81q-15 14-35.5 17T324-71q-19-10-27.5-28t-3.5-37l45-184H120Zm680-520q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320q-33 0-56.5-23.5T720-400v-360q0-33 23.5-56.5T800-840Z" /></svg>
                                            {(() =>
                                                {if (element2.isLike == null || element2.isLike == true ) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-blue-500 ms-2 brightness-150" />

                                                    )
                                                } 
                                                if (!element2.isLike == null && element2.isLike == false) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-blue-500 ms-2 brightness-150" defaultChecked />

                                                    )
                                                }}
                                            
                                             )()
                                            }
                                        </label>
                                    </div>

                                </div>
                                <button className="btn mt-4 btn-warning" onClick={() => {console.log("appel vers update: ");return updateLikeValue(element2.id, element2.movieId, element2.isLike, element2.userId);}} >Valider</button>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                
                
                </div>
                {/* <button className="btn btn-error me-2" onClick={async(e) => await deleteLike(e, element2.id)}> */}
                {/* <button className="btn btn-error me-2" onClick={async(e: any) =>{return(deleteLikeValue(e, element2.id))}}> */}
                <button className="btn btn-error me-2" onClick={async(e: any) =>{deleteLikeValue(e, element2.id)}}>
                    <FontAwesomeIcon icon={faTrashCan} className="fa-xl"/>
                </button>
                </div>

            </th>
            </tr>
                 );
    }
  

   }
return responseArray;

})()}




    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        {/* <th  className="p-6"></th> */}
        <th  className="p-6">Média</th>
        <th  className="p-6">Like</th>
        <th  className="p-12">Actions</th>
        <th  className="p-1"></th>
        {/* <th  className="p-6"></th> */}
      </tr>
    </tfoot>
  </table>
</div>

}

{uidata?.length <= 0 &&

<div className="flex flex-col md:flex-row w-screen">
  <h1>Pas de données</h1>
</div>


}






     </>
  )}
  return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
           <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
         </a>
}

export default Likes
