const goToTop = () =>{
    return window.scroll(0,0);
}

const Fab = () => {
    return (
        <>
        <div className='relative'>
         
            <div className="floating-container">
                <div className="floating-button flex items-center btn" onClick={() => goToTop()}>
                <span className='inline-block mx-auto'>
                <svg className='text-2xl font-bold' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#e8eaed"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
                </span>
                </div>
                {/* <div className="element-container">

                    <a href="google.com"> <span className="float-element tooltip-left">
                        <i className="material-icons">phone</i></span></a>

                    <span className="float-element">
                        <i className="material-icons">email</i>
                    </span>
                    <span className="float-element">
                        <i className="material-icons">chat</i>
                    </span>
                </div> */}
            </div>
        </div>

        </>
    )
}

export default Fab
