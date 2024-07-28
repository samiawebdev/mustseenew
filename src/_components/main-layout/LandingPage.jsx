import slide_image_1 from '../../../assets/django/f-t-1b2.png';
import slide_image_2 from '../../../assets/django/1.jpeg';
import slide_image_3 from '../../../assets/django/2.jpeg';
import slide_image_4 from '../../../assets/django/3.jpg';
import slide_image_5 from '../../../assets/django/4.jpg';
import slide_image_6 from '../../../assets/django/5.jpg';
import slide_image_7 from '../../../assets/django/6.jpg';
import slide_image_8 from '../../../assets/django/7.jpg';

import slide_image_9 from '../../../assets/django/8.jpg';
import slide_image_10 from '../../../assets/django/9.jpg';
import slide_image_11 from '../../../assets/django/10.jpg';
import slide_image_12 from '../../../assets/django/11.jpg';
import slide_image_13 from '../../../assets/django/12.jpg';
import slide_image_14 from '../../../assets/django/f-1.jpg';
import slide_image_15 from '../../../assets/django/2.jpeg';
import slide_image_16 from '../../../assets/django/15.jpg';
import slide_image_17 from '../../../assets/django/17.jpg';
import slide_image_18 from '../../../assets/django/18.jpg';
import slide_image_19 from '../../../assets/django/19.jpg';
import MainHeroTxt from '../design/MainHeroTxt';



const LandingPage = () => {


/* TODO : fixer le code de handleSliderArrowClick pour qu'il fonctionne  */

const handleSliderArrowClick = () => {

    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list");
    
    arrows.forEach((arrow, i) => {
        const itemNumber = movieLists[i].querySelectorAll("img").length;
        let clickCounter = 0;
        arrow.addEventListener("click", () => {
            const ratio = Math.floor(window.innerWidth / 270);
            clickCounter++;
            if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
                movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
                    }px)`;
            } else {
                movieLists[i].style.transform = "translateX(0)";
                clickCounter = 0;
            }
        });
    
        console.log(Math.floor(window.innerWidth / 270));
    });


};

    return (
        <div className="container-cust">

            <div className="content-container-cust">
                <div className="featured-content f-1">
                    <img className="featured-title bg-spec" src={slide_image_1} alt="" />
                    <div className="featured-desc">
                      <MainHeroTxt />
                    </div>
                    {/* <button className="featured-button">WATCH</button> */}
                </div>
                <div className="movie-list-container-cust">
                    <h1 className="movie-list-title">NEW RELEASES</h1>
                    <div className="movie-list-wrapper">
                        <div className="movie-list">
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_2} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <div className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</div>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_3} alt="" />
                                <span className="movie-list-item-title">Star Wars</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_4} alt="" />
                                <span className="movie-list-item-title">Storm</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_5} alt="" />
                                <span className="movie-list-item-title">1917</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_6} alt="" />
                                <span className="movie-list-item-title">Avengers</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_7} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_8} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right arrow" onClick={() => handleSliderArrowClick()}></i>
                    </div>
                </div>
                <div className="movie-list-container-cust">
                    <h1 className="movie-list-title">NEW RELEASES</h1>
                    <div className="movie-list-wrapper">
                        <div className="movie-list">
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_9} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_10} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_11} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_12} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_13} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_14} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_14} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right arrow" onClick={() => handleSliderArrowClick()}></i>
                    </div>
                </div>
                <div className="featured-content f-2">
                    <img className="featured-title" src="../../assets/django/f-t-2.png" alt="" />
                    <p className="featured-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor
                        deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis
                        minima voluptatibus incidunt. Accusamus, provident.</p>
                    <button className="featured-button">WATCH</button>
                </div>
                <div className="movie-list-container-cust">
                    <h1 className="movie-list-title">NEW RELEASES</h1>
                    <div className="movie-list-wrapper">
                        <div className="movie-list">
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_2} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_15} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_16} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_17} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_18} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src={slide_image_19} alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/1.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right arrow" onClick={() => handleSliderArrowClick()}></i>
                    </div>
                </div>
                <div className="movie-list-container-cust">
                    <h1 className="movie-list-title">NEW RELEASES</h1>
                    <div className="movie-list-wrapper">
                        <div className="movie-list">
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/17.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/18.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/19.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/7.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/1.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/1.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                            <div className="movie-list-item">
                                <img className="movie-list-item-img" src="../../assets/django/1.jpg" alt="" />
                                <span className="movie-list-item-title">Her</span>
                                <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                    hic fugit similique accusantium.</p>
                                <button className="movie-list-item-button">Watch</button>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right arrow" onClick={() => handleSliderArrowClick()}></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
