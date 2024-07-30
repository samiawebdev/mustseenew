// @ts-nocheck

import Toaster from "./Toasterator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

/* parameter movie => == id de movie => pour l'appel en bdd et le update des like ou comment */
const Modalitor = ({ movie, text, cssClass, onClick = {}, isLike = null }, { movie: number, text: string, cssClass: any, isLike: boolean }) => {

    const modalId = text === ("Liker" || "Update_Like") ? `lik_modal-${movie}` : `post_modal-${movie}`;

    // const getLikeValueFromModalitor = () => {
    //    const radios = [...document.querySelectorAll('input[type="radio"]')];

    //    const firstRadio = radios.at(0);
    //    const secondRadio = radios.at(1);



    //    if (firstRadio?.getAttribute('checked')) {
    //          return true;
    //    }else if(secondRadio?.getAttribute('checked')){
    //          return false;
    //    }else{
    //       return null;
    //    }
    // }
    const uxToTextArea = (e: React.FormEvent<HTMLFormElement>) => {

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
            remChars.innerHTML = `${maxLength - currentLength} characters left`;
            remChars.style.display = "block";
        }
    }

    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
{(() => {             
    
                       const modalBtn = [];
                       if (text === "Update_Like") {
                          modalBtn.push(
                         <button className={`btn btn-primary me-2 ${cssClass}`} onClick={(movie) => document.getElementById(modalId)?.showModal()}>
                            <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                         </button>
                          );
                        }
                        else{
                        modalBtn.push(
                        <button className={`btn ${cssClass} bg-zinc-800 hover:bg-zinc-600/90 border-none`} onClick={(movie) => document.getElementById(modalId)?.showModal()}>{text}</button>
                        );   }

                        return modalBtn.at(0);
                       
})()}
            {/* <button className={`btn ${cssClass}`} onClick={(movie) => document.getElementById(modalId)?.showModal()}>{text}</button> */}
            {/* <button className={`btn ${cssClass}`} onClick={() =>  <Toaster state="ok" message="*****  R.A.S  *****" />  }>Toast it !</button> */}



            {(text === "Liker" || text === "Update_Like") ? 
                <dialog id={`lik_modal-${movie}`} className="modal modal-top sm:modal-middle">
                    <div className="modal-box bg-zinc-900">
                        <h3 className="font-bold text-lg">Liker ou Disliker?</h3>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action w-fit">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}

                                <div className="flex" data-qpe={movie}>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text me-2 text-red-500">Liker&nbsp;&nbsp;</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-640q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14H400q-33 0-56.5-23.5T320-200v-407q0-16 6.5-30.5T344-663l217-216q15-14 35.5-17t39.5 7q19 10 27.5 28t3.5 37l-45 184h218ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640q33 0 56.5 23.5T240-560v360q0 33-23.5 56.5T160-120Z" /></svg>
                                            {(() =>
                                                
                                                {if (isLike == null || isLike == false ) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-red-500 ms-2 brightness-150 bg-zinc-700" />

                                                    )
                                                } 
                                                if (!isLike == null && isLike == true) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-red-500 ms-2 brightness-150 bg-zinc-700" defaultChecked />

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
                                                {if (isLike == null || isLike == true ) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-blue-500 ms-2 brightness-150 bg-zinc-700" />

                                                    )
                                                } 
                                                if (!isLike == null && isLike == false) {
                                                    return(
                                                        <input type="radio" name="radio-10" className="radio checked:bg-blue-500 ms-2 brightness-150 bg-zinc-700" defaultChecked />

                                                    )
                                                }}
                                            
                                             )()
                                            }
                                        </label>
                                    </div>

                                </div>
                                <button className="btn mt-4 btn-warning" onClick={onClick} >Valider</button>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>

               :
               
                ( text === "Commenter") &&
                <dialog id={`post_modal-${movie}`} className="modal modal-top sm:modal-middle">
                    <div className="modal-box bg-zinc-900">
                        <h3 className="font-bold text-lg">Commenter</h3>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action w-fit">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}

                                <div className="flex">
                                    <label className="form-control">
                                        <div className="label pb-4">
                                            <span className="label-text text-white font-bold">Ton Commentaire</span>

                                        </div>
                                        <textarea id={`txt-${movie}`} className="textarea textarea-bordered textarea-error h-24 w-96 ms-1 bg-zinc-900" placeholder="Commentaire" maxLength={100} onInput={(e) => uxToTextArea(e)}></textarea>

                                        <div>
                                            <div ><progress className="progress progress-info w-56" value={0} max={100} id={`p-bar-${movie}`}></progress></div>
                                            <p id={`r-chars-${movie}`}></p>
                                        </div>
                                    </label>


                                </div>
                                <button className="btn mt-4 btn-error text-white ms-1" onClick={onClick}>Valider</button>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-4 font-bold hover:bg-error/90 text-white text-2xl">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
              

            }

            {/* <Toaster state="" message="*****  R.A.S  *****" /> */}



        </>
    )
}

export default Modalitor