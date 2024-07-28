const Footer = () => {
    return (
        <div className="footer flex items-center gap-3 justify-center ring ring-sky-950 bg-footer">
            <h4>&#169; Must See 2024</h4>
            <footer className="flex items-center flex-col md:flex-row p-12 gap-6 justify-center">
                <a href="/" className="footer-link">Home</a> 
                <a href="/movies" className="footer-link">Movies</a>
                <a href="/tvshows" className="footer-link">TVShows</a>
                <a href="/cgu" className="footer-link">CGU</a>
            </footer>
        </div>
    )
}

export default Footer
