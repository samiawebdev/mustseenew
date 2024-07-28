const Movie = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

    return (

        <div onClick={() => selectMovie(movie)} className={"movie"}>
            <div className="movie-title">
                {movie.poster_path &&
                    <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
                }
                {!movie.poster_path &&
                    // <img src="/assets/placeholders/slider.jpg" alt={movie.title} width={342} height={513} className="aspect-auto object-cover" />
                    <div className="skeleton h-[55svh] w-80"></div>
                }
                <div className={"flex between movie-infos"}>
                    <h5 className={"movie-title"}>{movie.title}</h5>
                    {movie.vote_average ? <span className={"movie-voting"}>{movie.vote_average}</span> : null}
                </div>
            </div>
        </div>
    )
}

export default Movie
