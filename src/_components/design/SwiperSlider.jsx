// @ts-nocheck
// core version + navigation, pagination modules:
import React, { useRef, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slide_image_1 from '../../../public/assets/django/1.jpeg';
import slide_image_2 from '../../../public/assets/django/2.jpeg';
import slide_image_3 from '../../../public/assets/django/3.jpg';
import slide_image_4 from '../../../public/assets/django/4.jpg';
import slide_image_5 from '../../../public/assets/django/5.jpg';



// @ts-ignore
const SwiperSlider = ({movietype}) => {

   let videoData;
   if (movietype == "movie") {
       "use server"
       videoData = api.slider.listAllMoviesPosterUrl.useQuery();  
   }
   if (movietype == "tvshow") {
       "use server"
       videoData = api.slider.listAllTvShowsPosterUrl.useQuery();  
   }
    console.log("Video data: ", videoData);

  if (videoData?.data != null &&  videoData?.data?.length > 0) {
    return (
      <>
      <Swiper
       rewind={true} 
       navigation={true}
       modules={[Navigation]}
       className="mySwiper"
       breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      
      
      >

      {/* { videoData.data.map((elt => {
          <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={elt?.PosterUrl} /></SwiperSlide>
      }))

      } */}

<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(0).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(1).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(2).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(3).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(4).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(5).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(0).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(1).PosterUrl} /></SwiperSlide>
<SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={videoData?.data?.at(2).PosterUrl} /></SwiperSlide>




      </Swiper>
      </>
    )
   }

   return (
<>
    <Swiper
    rewind={true} 
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
    breakpoints={{
       640: {
         slidesPerView: 2,
         spaceBetween: 20,
       },
       768: {
         slidesPerView: 4,
         spaceBetween: 40,
       },
       1024: {
         slidesPerView: 5,
         spaceBetween: 50,
       },
     }}
   
   
   >
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_2.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_3.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_4.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_5.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_3.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_1.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_2.src} /></SwiperSlide>
    <SwiperSlide className='movie-list-item'><img className='movie-list-item-img' src={slide_image_4.src} /></SwiperSlide>
    </Swiper>
    </>
   )

}

export default SwiperSlider
