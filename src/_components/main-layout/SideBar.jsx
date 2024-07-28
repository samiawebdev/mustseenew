import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faFilm, faUser, faTv, faMugHot } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
  return (
        <div className="sidebar">
        <a href="/movies/search"><FontAwesomeIcon className='left-menu-icon' icon={faSearch}  title='Recherche' /></a>
        <a href="/"> <FontAwesomeIcon className='left-menu-icon' icon={faHome}  title='Accueil' /></a>
        <a href="/movies"> <FontAwesomeIcon className='left-menu-icon' icon={faFilm} title='Films' /></a>
       <a href="/tvshows"> <FontAwesomeIcon className='left-menu-icon' icon={faTv} title='Séries' /></a>
       <a href="/user/account"> <FontAwesomeIcon className='left-menu-icon' icon={faUser} size='lg' fixedWidth  title='Mon compte' /></a>
        {/* <FontAwesomeIcon className='left-menu-icon' icon={faUsers} /> */}
        {/* <FontAwesomeIcon className='left-menu-icon' icon={faBookmark} /> */}
        {/* <FontAwesomeIcon className='left-menu-icon' icon={faHourglassStart} /> */}
        {/* <a href="/buymeacoffee"><FontAwesomeIcon className='left-menu-icon' icon={faMugHot} title='buy me a coffee' /></a> */}
    </div>
  )
}

export default SideBar
