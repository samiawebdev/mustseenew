import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faFilm, faUser, faTv, faHeart, faTowerCell } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SideBar = () => {

  const router = useRouter();

  const { data: session, status } = useSession();

  return (
        <div className="sidebar">
        <a href="/movies/search"><FontAwesomeIcon className='left-menu-icon ' icon={faSearch}  title='Recherche' /></a>
        <a href="/"> <FontAwesomeIcon className='left-menu-icon ' icon={faHome}  title='Accueil' /></a>
        <a href="/movies"> <FontAwesomeIcon className='left-menu-icon ' icon={faFilm} title='Films' /></a>
       <a href="/tvshows"> <FontAwesomeIcon className='left-menu-icon ' icon={faTv} title='Séries' /></a>
       <a href="/user/account"> <FontAwesomeIcon className='left-menu-icon ' icon={faUser} size='lg' fixedWidth  title='Mon compte' /></a>
        
       {(() => {if (status === "authenticated") {
         return (
           <Link href="/user/likes-and-comments/likes"> <FontAwesomeIcon className='left-menu-icon ' icon={faHeart} title='Mes Favoris' /></Link>
         ); 
       }})()}


       {(() => {if (status === "authenticated" && session.user.name === "Admin") {
         return (
           <Link href="/admin"> <FontAwesomeIcon className='left-menu-icon ' icon={faTowerCell} title='Admin Area' /></Link>
         ); 
       }})()}

    </div>
  )
}

export default SideBar
