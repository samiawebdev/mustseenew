import { signIn, signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const { data: session, status } = useSession() ?? undefined;

const handleToggleBallClick = () => {
    const ball = document.querySelector(".toggle-ball");
    const items = document.querySelectorAll(".container-cust,.movie-list-title,.navbar-container-cust,.sidebar,.left-menu-icon,.toggle, .menu-list-item, .profile-container-cust, header");


    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball?.classList.toggle("active");
};



const handleNavbarLinksClickActiveState = (/** @type {{ currentTarget: { classList: { add: (arg0: string) => void; }; }; }} */ event) =>{
    const navbarLinks = document.querySelectorAll(".menu-list-item");

    

     navbarLinks.forEach((item) => {
         item.classList.remove('active');
     });

     event?.currentTarget.classList.add('active');


};

// const activeLinkState = () =>{

// }

// activeLinkState();

 

  return (
    

<div className="navbar">
        <div className="navbar-container-cust">
            <div className="logo-container-cust">
                <a href="/"><h1 className="logo font-poetsenone">Must See</h1></a>
            </div>
            <div className="menu-container-cust">
                <ul className="menu-list">
                    <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href="/">Home</a></li>
                    <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href='/movies'>Films</a></li>
                    <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href="/tvshows">Séries</a></li>
                    <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href="/movies/search">Rechercher</a></li>
                    {(() =>
                          {if (session != undefined && status === 'authenticated') {
                            return(
                               <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href="/user/likes-and-comments/likes">Likes</a></li>                    
                            )
                          }}
                  )()}

{(() =>
                          {if (session != undefined && status === 'authenticated' && session.user.name === 'Admin') {
                            return(
                               <li className="menu-list-item"  onClick={handleNavbarLinksClickActiveState}><a href="/admin">Admin</a></li>                    
                            )
                          }}
                  )()}

                </ul>
            </div>
            <div className="profile-container-cust fixed right-[5svw]">
              {/* <FontAwesomeIcon className='profile-picture' icon={faUser} size='xs' fixedWidth />
                {/* <img className="profile-picture" src={profile_image} alt="profile picture" /> }
                <div className="profile-text-container-cust flex gap-0 items-center">
                    <span className="profile-text">Profile</span>
                    {/* <i className="fas fa-caret-down"></i> }
                    <FontAwesomeIcon icon={faCaretDown} size='sm' fixedWidth/>
                </div>
                <div className="toggle flex gap-2 px-1">
                <FontAwesomeIcon className='toggle-icon' icon={faMoon} />
                <FontAwesomeIcon className='toggle-icon' icon={faSun} />
                    {/* <i className="fas fa-moon toggle-icon"></i>
                    <i className="fas fa-sun toggle-icon"></i> *
                    <div className="toggle-ball" onClick={() => handleToggleBallClick()}></div>
                </div> */}

                <Greetings />
                
            </div>
        </div>
    </div>


  )
}
function Greetings() {
    const { data: sessionData } = useSession();
  
    console.log("SessionData object: ", sessionData);
  
    return (
      <div className="grid grid-cols-2  gap-2 me-auto">
        <p className="flex items-center text-center text-current invisible sm:visible">
          {sessionData && <span className="inline-block mt-1">Bienvenue,&nbsp; <b>{sessionData.user?.name}</b></span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? " Se Déconnecter" : "Connexion"}
        </button>
      </div>
    );
  }

export default Navbar
