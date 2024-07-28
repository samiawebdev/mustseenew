import { useSession } from "next-auth/react";

import Modalitor from "@/_components/design/Modalitor";
import { api, type RouterOutputs } from "@/utils/api";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Films = RouterOutputs["movie"]["getAll"][0];



const Movies = () => {

    const router = useRouter();

    const { data: session, status } = useSession();

    const likeToDB = api.likesAndComments.createLike.useMutation({
        onSuccess: async (res) => {


            console.log("like dbop result: ", res);


            toast.success('Votre Like a bien été pris en compte', { duration: 10000 });
            // router.refresh();
        },
        onError: async (res) => {
            toast.error('Un problème est survenu. Merci de réessayer votre ajout/modification de Like.', { duration: 10000 });
            // router.refresh();
        }
    });


    const commentToDB = api.likesAndComments.createComment.useMutation({
        onSuccess: async (res) => {


            console.log("comment dbop result: ", res);

            const refresh = async () => router.refresh();
            // setTimeout(() => {
            //    toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
            // }, 2000 );
            toast.success('Votre Commentaire a bien été pris en compte',
                {
                    style: {
                        minWidth: '30svw',
                    },
                    duration: 10000

                })
            // toast.success('Votre Commentaire a bien été pris en compte', {duration: 10000});
        },
        onError: async (res) => {
            toast.error('Un problème est survenu. Merci de réessayer votre ajout/modification de Commentaire.', { duration: 10000 });
            // router.refresh();
        }

    });

    const handleLikeClick = async (e: React.FormEvent<HTMLFormElement>, movie: number) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (films?.data == undefined || films?.data?.length <= 0) {
            return;
        }
        else {

            //    likeToDB.mutate({movieId: movie, islike: ll }); 
            //    return likeToDB();

            // let radioLikeInput = e.currentTarget.parentNode?.children.item(0)?.children.item(0)?.children.item(0)?.children.item(2) ;
            // let radioDisLikeInput = e.currentTarget.parentNode?.children.item(0)?.children.item(1)?.children.item(0)?.children.item(2) ;

            // const islike = radioLikeInput?.getAttribute('checked') == 'true';
            // const isDislike = radioDisLikeInput?.getAttribute('checked') == 'true';

            // const noLikeValuePosted = islike == false && isDislike == false; 

            const rads = [...e.currentTarget?.parentNode?.children.item(0)?.querySelectorAll('input[type="radio"]')!]

            // console.log("like post event check 6: ", e.currentTarget?.parentNode?.children.item(0)?.querySelectorAll('input[type="radio"]:checked'));
            // console.log("like post event check 7: ", movie)
            // console.log("like post event check 8: ", rads)
            // console.log("like post event check 9: ", rads.at(0))
            // console.log("like post event check 10: ", rads.at(1)?.getAttribute('checked'))

            const likeChoiceIfExist = e.currentTarget?.parentNode?.children.item(0)?.querySelectorAll('input[type="radio"]:checked');
            const modalelmt = document.querySelector('dialog');
            switch (likeChoiceIfExist?.length) {
                case 0:
                    modalelmt?.close();
                    return likeToDB.mutate({ movieId: movie, islike: null })
                    break;
                case 1:
                    modalelmt?.close();
                    if (likeChoiceIfExist.item(0) == rads.at(0)) {
                        return likeToDB.mutate({ movieId: movie, islike: true })
                    } else {
                        return likeToDB.mutate({ movieId: movie, islike: false })
                    }
                default:
                    modalelmt?.close();
                    return
                    break;
            }

        }
    }

    const handleCommentClick = async (e: React.FormEvent<HTMLFormElement>, movie: number) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (films?.data == undefined || films?.data?.length <= 0) {
            return;
        }
        else {

            //    likeToDB.mutate({movieId: movie, islike: ll }); 
            //    return likeToDB();

            // let radioLikeInput = e.currentTarget.parentNode?.children.item(0)?.children.item(0)?.children.item(0)?.children.item(2) ;
            // let radioDisLikeInput = e.currentTarget.parentNode?.children.item(0)?.children.item(1)?.children.item(0)?.children.item(2) ;

            // const islike = radioLikeInput?.getAttribute('checked') == 'true';
            // const isDislike = radioDisLikeInput?.getAttribute('checked') == 'true';

            // const noLikeValuePosted = islike == false && isDislike == false; 

            // const rads = [...e.currentTarget?.parentNode?.children.item(0)?.querySelectorAll('input[type="radio"]')!]

            // console.log("like post event check 6: ", e.currentTarget?.parentNode?.children.item(0)?.querySelectorAll('input[type="radio"]:checked'));
            // console.log("like post event check 7: ", movie)
            // console.log("like post event check 8: ", rads)
            // console.log("like post event check 9: ", rads.at(0))
            // console.log("like post event check 10: ", rads.at(1)?.getAttribute('checked'))

            const commentTxt = e.currentTarget?.parentNode?.children.item(0)?.querySelector('textarea');

            const comment_modal_id = e.currentTarget?.parentNode?.parentNode?.parentNode?.parentNode?.parentElement?.querySelectorAll('dialog')?.item(1)/*.getAttribute('id')*/;

            if (commentTxt?.value?.length! <= 0) {
                return
            }
            console.log("Modal ??? : ", comment_modal_id);
            comment_modal_id?.close();


            console.log('Commentaire  +  movieId:', commentTxt?.value, movie);
            commentToDB.mutate({ name: `Commentaire du ${new Date(Date.now())}`, movieId: movie, userId: session?.user?.id, comment: commentTxt?.value.trim(), postId: 0 })
            if (comment_modal_id) {
                comment_modal_id.querySelector('textarea')!.value = '';
            }
        }
    }

    const getData = () => {
        const response = api.movie.getAll.useQuery(
            undefined, // no input
            {
                enabled: true,

                //   onSuccess: (data) => {
                //  setCurrentUser(currentUser ?? data[0] ?? null);
                //   },

            },
        );

        console.log("films data: ", response.data);

        return response;

    };

    const films = getData();

    if (status === "authenticated") {

        return (
            <>

                <section className=" body-font ">
                    <div className="container px-5 pb-24 pt-8 mx-auto ps-20 cl:ps-0">

                        <div className="flex flex-wrap -m-4">

                            {films?.data ? films?.data?.map(function (elt) {
                                return (

                                    <div className="xl:w-1/4 md:w-1/2 p-4" key={elt.id}>

                                        <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                                            <img className="h-60 rounded min-w-[13em] max-w-[36em] object-fill object-center mb-6" src={elt?.PosterUrl!} alt="content" />
                                            <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">FILM</h3>
                                            <h2 className="text-[0.6rem] text-white font-medium title-font mb-4">{`${elt?.title!} - (${elt?.productionYear!})`}</h2>
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {/* <button onClick={() => showLikeModal(elt.id)} className="backgrop-opacity-95 bg-fuchsia-600 min-h-12 min-w-20 rounded-md">Liker</button>
                                            <button className="backgrop-opacity-95 bg-sky-600 min-h-12 min-w-20 rounded-md">Commenter</button> */}
                                                 <Modalitor movie={elt.id} text={"Liker"} cssClass={"text-purple-300"} onClick={(event: React.FormEvent<HTMLFormElement>) => handleLikeClick(event, elt.id)} />
                                                 <Modalitor movie={elt.id} text={"Commenter"} cssClass={"text-orange-300"} onClick={(evt: React.FormEvent<HTMLFormElement>) => handleCommentClick(evt, elt.id)} />
                
                                            </div>
                                        </div>
                                    </div>


                                )

                            }) : <h1>Pas de données</h1>}



                        </div>
                    </div>
                </section>

            </>
        )
    }

    return <a href="/api/auth/signin" className="inline-flex items-center align-middle h-10 w-80 ms-10">
        <button className="btn btn-error h-full w-full font-bold text-lg">Se connecter</button>
    </a>
}



export default Movies
