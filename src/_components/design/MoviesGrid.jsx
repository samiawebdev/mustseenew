import { useEffect, useState } from "react"
import axios from 'axios'
import Movie from "./Movie"
import Youtube from 'react-youtube'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import MovieGenres from '../../../_lib/data/moviegenres/genres.js'

const MoviesGrid = () => {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const GENRES_lIST = "genre/movie/list"
    const SEARCH_API = MOVIE_API + "search/movie"
    const SEARCH_TV = MOVIE_API + "search/multi"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "13e0f0963c926de92754f576d61edcff"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const LANGUAGE_FR = "fr-FR"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    // const [genres, setGenres] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({ title: "Loading Movies" })

    // const genresData = [...MovieGenres];

    useEffect(() => {
        fetchMovies()
    }, [])

    const hideSearchFormOnPlay = () => {
        const poster = document.querySelector('.poster');

        poster.style.transform = "translateY(-14svh)";
    }

    const showBackSearchFormOnClosedPlayer = () => {
        const poster = document.querySelector('.poster');

        poster.style.transform = "unset";
    }

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
                language: `${LANGUAGE_FR}`

            }
        });


        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
                language: `${LANGUAGE_FR}`

            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }

    // const getGenresList = async (id) => {
        
    //     const { data } = await axios.get(`${MOVIE_API}${GENRES_lIST}`, {
    //         params: {
    //             api_key: API_KEY,
    //             language: `${LANGUAGE_FR}`
    //         }
    //     });

    //     if (data.genres) {
    //       setGenres(data.genres);  
    //       console.log("Gneres: ",data.genres);
    //     }

    // }

        const searchTvShow = async (event) => {
            if (event) {
                event.preventDefault()
            }
    
            const { data } = await axios.get(`${SEARCH_TV}`, {
                params: {
                    api_key: API_KEY,
                    query: searchKey,
                    language: `${LANGUAGE_FR}`
    
                }
            });
    
    
            console.log(data.results[0])
            setMovies(data.results)
            setMovie(data.results[0])
    
            if (data.results.length) {
                await fetchTvShow(data.results[0].id)
            }

    }

    const fetchTvShow = async (id) => {
        const { data } = await axios.get(`${MOVIE_API}tv/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
                language: `${LANGUAGE_FR}`

            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const selectTvShow = (tvshow) => {
        fetchMovie(tvshow.id)
        setPlaying(false)
        setMovie(tvshow)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="mx-auto py-2 flex flex-col max-w-screen">
            <header className="center-max-size header p-1 ms-4">
                <span className={"brand ms-6"}>Rechercher un film</span>
                <form className="form my-1 min-w-[20svw] ms-6" onSubmit={fetchMovies}>
                    <input className="search h-8 min-w-[15svw] bg-sky-950 px-4 py-2" type="text" id="search"
                        onInput={(event) => setSearchKey(event.target.value)} />
                    <button className="submit-search btn btn-error btn-xs text-white max-w-10 h-8 translate-y-1" type="submit">
                    <FontAwesomeIcon className='search-icon fa-xl' icon={faSearch} title='Rechercher un Film' />
                    </button>
                </form>

                {/* <span className={"brand ms-6"}>Rechercher une série</span>
                <form className="form my-1 min-w-[20svw] ms-6" onSubmit={searchTvShow} >
                   <input className="search h-8 min-w-[15svw] bg-sky-950 px-4 py-2" type="text" id="search"
                        onInput={(event) => setSearchKey(event.target.value)} />
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                    {/* <button onClick={searchCollection} className="submit-search backdrop-blur-md bg-blue-900 px-3 h-10 rounded-sm" type="button"><i className="fa fa-search text-current"></i><span className={"brand ms-6"}>Get Genres List</span></button> 
                </form> */}
                
            </header>
            {movies.length ?
                <main className="max-w-[94.75svw] -ms-12 px-8">
                    {movie ?
                        <div className="poster min-h-auto relative w-screen aspect-video py-6 text-clip overflow-y-scroll"
                            style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .66)), url(${BACKDROP_PATH}${movie.backdrop_path})`, backgroundSize:`100svw auto`, backgroundPosition:`50% 50%`, backgroundRepeat:`no-repeat`, transform:`` }}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        // className={"youtube amru w-full aspect-video container mx-auto "}
                                        className={"youtube amru w-full aspect-video container mx-auto ms-8 sm:ms-10 px-4 sm:px-1"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '92%', // was 100%
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => function(){showBackSearchFormOnClosedPlayer();  setPlaying(false);}()} className={"button close-video backdrop-blur-md bg-red-900 px-3 h-10 rounded-sm top-0 ms-10 absolute"}>Close
                                    </button>
                                </> :
                                <div className="center-max-size absolute top-2 left-5">
                                    <div className="poster-content backdrop-opacity-95 pt-0 xl:pt-20 ps-4">
                                        {trailer ?
                                            <button className={"button play-video backdrop-blur-md bg-red-900 px-3 h-10 rounded-sm top-0 ms-4"} onClick={() => function(){hideSearchFormOnPlay(); return setPlaying(true);}()}
                                                type="button">Play
                                                Trailer</button>
                                            : 'Sorry, no trailer available'}
                                        <h1 className="text-2xl lg:text-4xl font-bold my-4 ms-4 mix-blend-exclusion contrast-200 saturate-200 pt-0 xl:pt-20">{movie.title}</h1>
                                        <p className="py-6 max-w-[83%] ms-4 text-sm lg:text-3xl md:text-md leading-8 mix-blend-exclusion contrast-200 saturate-200 pt-0 xl:pt-20">{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={"center-max-size grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-8 w-screen justify-items-center justify-evenly container -ms-[6svw]  md:mx-auto mt-12"}>
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    )
}

export default MoviesGrid
