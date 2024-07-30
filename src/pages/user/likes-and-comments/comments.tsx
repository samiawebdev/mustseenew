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

type CommentResults = RouterOutputs['likesAndComments']['getAllComments'];


const Comments = () => {
  const uidata: CommentResults  = []; 

  const mod: HTMLDialogElement[] = [];
  const idv = uuidv4(); 
  const router = useRouter();
  
  const uxToTextArea = (e: React.FormEvent<HTMLFormElement>, movie: number, dataElmt: any) => {

    const textarea = document.getElementById(`txt-${movie}`);
    const progressBar = document.getElementById(`p-bar-${movie}`);
    const remChars = document.getElementById(`r-chars-${movie}`);

    const maxLength = textarea.getAttribute("maxlength");
    const currentLength = textarea.value.length;
    const progressWidth = (currentLength / maxLength) * 100;

    progressBar.style.width = `${progressWidth}%`;
    remChars.style.display = "none";
    if (progressWidth <= 60) {
        progressBar.style.backgroundColor = "rgb(19, 160, 19)";
    } else if (progressWidth > 60 && progressWidth < 85) {
        progressBar.style.backgroundColor = "rgb(236, 157, 8)";
    } else {
        progressBar.style.backgroundColor = "rgb(241, 9, 9)";
        remChars.innerHTML = `${maxLength - currentLength} caractères restants`;
        remChars.style.display = "block";
    }
    
    
}

  mod.push(
  <dialog id={idv} className="modal modal-top sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Commenter</h3>
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
      const deletion = api.likesAndComments.deleteComment.useMutation({
        onSuccess: async(res) => {
  
                
          console.log("DELETE COMMENT dbop result: ", res);
  
          const refresh = async() => router.refresh();
          // setTimeout(() => {
          //    toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
          // }, 2000 );
          toast.success('Votre Commentaire a bien été supprimé',
          {
              style: {
                  minWidth: '30svw',
                },
                duration: 3000
  
          })
          // toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
      },
      onError: async(res) =>{
          toast.error('Un problème est survenu. Merci de bien vouloir réessayer.', {duration: 3000});
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
  
      const commentUpdate = api.likesAndComments.updateComment.useMutation({
        onSuccess: async(res) => {
  
          closeDialog();        
          console.log("UPDATE COMMENT dbop result: ", res);
  
          // setTimeout(() => {
          //    toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
          // }, 2000 );
          toast.success('Votre Commentaire a bien été mis à jour',
          {
              style: {
                  minWidth: '30svw',
                },
                duration: 3000
  
          })
  
          const modalElmt = document.querySelector('dialog');
  
          //  closeDialog();
          //  return refresh();
          // toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
      },
        onError: async(res) =>{
            toast.error('Un problème est survenu. Merci de bien vouloir réessayer.', {duration: 3000});
            // router.refresh();
  
            
        }
      });
  
      const updateCommentValue = (event: React.FormEvent<HTMLFormElement>, commentId: number, movie: number, user: string) => {
          event.preventDefault();
          event.stopPropagation();
          console.log('Test UPDATE COMMENT: ', parseInt(commentId.toString()), movie, name, user );

          const commentTxt = event.currentTarget?.parentNode?.children.item(0)?.querySelector('textarea');
          if (commentTxt?.value?.length! <= 0) {
            return
        }
           
          commentUpdate.mutate({ movieId: movie, postId: commentId, name: `Commentaire du ${new Date(Date.now())}` , userId: user, comment: commentTxt?.value.trim()  });
          closeDialog();
          refresh();
            
      }
      const onConfirmedDelete = (e: React.FormEvent<HTMLFormElement> , comment: number, toastToDismissId: string) => {
        console.log('Test ON CONFIRMED DELETE COMMENT: ', parseInt(comment.toString()) );
  
        e.preventDefault();
        e.stopPropagation();
        toast.dismiss(toastToDismissId);
        return deletion.mutate({postId: parseInt(comment.toString())});
      }
      const deleteCommentValue = (event: React.FormEvent<HTMLFormElement>, commentId: number ) => {
  
          console.log('Test DELETE lIKE: ', commentId );
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
                <button className="btn btn-error px-6 text-white rounded-sm" onClick={() => {return onConfirmedDelete(event, commentId, t.id)}}>Confirmer</button>
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
          
          const data  = api.likesAndComments.getAllComments.useQuery(
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
              console.log("Comments :", data);
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
          console.log( "Comments New List Page: ", uidata)
        }
      const allComments = [...uidata?.map((elt) => elt.posts)];
      console.log( "Comments New List Page 2: ", allComments)
  
  
      if (userSession.status === "authenticated") {    
  return (
  <>
  
  {uidata.length > 0 &&
  <div className="overflow-x-auto w-screen px-10 ms-10 md:ms-0 md:px-40">
    <table className="table table-xs md:table-lg bg-slate-950">
      {/* head */}
      <thead>
        <tr>
          <th  className="p-6">Média</th>
          <th  className="p-6">Commentaire</th>
          <th  className="p-6">Actions</th>
  
        </tr>
      </thead>
      <tbody>
        
  {(() => {
      const responseArray = [];
     for (let index = 0; index < allComments.length; index++) {
      const element = allComments[index];
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
                {element2?.comment ?? ''}
                <br />
  

  
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
                  <button className={`btn btn-primary me-2 text-purple-300`} onClick={() => document.getElementById(`post_modal-${element2.movieId}`)?.showModal()}>
                              <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                  </button>
                  <dialog id={`post_modal-${element2.movieId}`} className="modal modal-top sm:modal-middle text-purple-300">
                  <div className="modal-box bg-zinc-950 text-white">
                        <h3 className="font-bold text-lg">Commenter</h3>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action w-fit bg-zinc-950 text-white">
                            <form method="dialog" className="bg-zinc-950 text-white">
                                {/* if there is a button in form, it will close the modal */}

                                <div className="flex">
                                    <label className="form-control">
                                        <div className="label pb-4">
                                            <span className="label-text text-white font-bold">Ton Commentaire</span>

                                        </div>
                                        {/* <textarea id={`txt-${element2.movieId}`} className="textarea textarea-bordered textarea-error h-24 w-96 ms-1" placeholder={element2.name} maxLength={1000} onInput={(e) => uxToTextArea(e, element2.movieId)} value={element2.comment}></textarea> */}
                                        <textarea id={`txt-${element2.movieId}`} className="textarea textarea-bordered textarea-error h-24 w-96 ms-1 bg-zinc-950 text-white" maxLength={100} onInput={(e) => uxToTextArea(e, element2.movieId, element2)} defaultValue={element2.comment}></textarea>

                                        <div>
                                            <div ><progress className="progress progress-info w-56" value={0} max={100} id={`p-bar-${element2.movieId}`}></progress></div>
                                            <p id={`r-chars-${element2.movieId}`}></p>
                                        </div>
                                    </label>


                                </div>
                                <button className="btn mt-4 btn-warning" onClick={(e: React.FormEvent<HTMLFormElement>) => updateCommentValue(e, element2.id, element2.movieId, userSession.data.user.id)} >Valider</button>

                                <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                            </form>
                        </div>
                    </div>
                  </dialog>
                  
                  
                  </div>
                  {/* <button className="btn btn-error me-2" onClick={async(e) => await deleteLike(e, element2.id)}> */}
                  {/* <button className="btn btn-error me-2" onClick={async(e: any) =>{return(deleteLikeValue(e, element2.id))}}> */}
                  <button className="btn btn-error me-2" onClick={async(e: any) =>{deleteCommentValue(e, element2.id)}}>
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

export default Comments
