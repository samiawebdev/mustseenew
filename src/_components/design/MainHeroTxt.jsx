
// @ts-ignore
const MainHeroTxt = ({click}) => {
  return (
    <>
      <div className="hero-cust-wrapper w-screen ps-12 mx-auto pt-10 pb-[7.5rem] -mt-16">
  <div className="hero-cust-overlay"></div>
  <div className="hero-cust-content text-center text-neutral-content">
    <div className="max-w-screen brightness-110 mainhero-txt-content md:-ms-[4.5rem]">

      {/* <h1 className="mb-5 text-5xl font-bold text-slate-400 py-1 leading-snug saturate-150 contrast-125">Sélection <span className="bg-gradient-to-r from-orange-500 via-teal-700 to-fuchsia-500 brightness-125 inline-block text-transparent bg-clip-text"> Épique</span></h1> */}
      <h1 className="text-[4dvw] md:text-6xl font-semibold text-slate-300 leading-snug"><span className="text-4xl md:text-5xl font-light">Cinéma sensationnel </span></h1>
      <h1  className="mb-1 text-[4dvw] md:text-6xl font-extrabold text-slate-300 leading-snug"><p className="py-[.5em] text-4xl md:text-5xl bg-gradient-to-t from-zinc-950 via-orange-400 to-zinc-950  constrast-200 inline-block text-transparent bg-clip-text hero-title-2">Sélection Épique</p></h1>
      <h2 className="mb-5 text-sm md:text-xl text-white/100 max-w-[84svw] mx-auto"><p>Découvrez une collection de films et séries à ne pas manquer.<br/>
                                                                                              Plaisir et divertissement garantis !</p>
      </h2>
      <button onClick={() => click ? click() : true} className="bg-red-900 px-0 py-1 w-[30svw] lg:w-[12svw] text-lg rounded-full text-current min-h-11 inline-flex gap-3 items-center justify-center mt-3 -ms-4">Découvrir
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fffa"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A.998.998 0 0 0 5 3v18a1 1 0 0 0 .536.886zM7 4.909 17.243 12 7 19.091V4.909z"></path></svg>
      </button>
    </div>
  </div>
</div>
    </>
  )
}

export default MainHeroTxt
